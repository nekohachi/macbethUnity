//! wgpu レンダラ。設計ドキュメント 3.2 の「ストロークバッファ方式」を実装する。
//!
//! - canvas: 確定した絵。リニア RGBA16Float(premultiplied)
//! - stroke_buffer: 描画中ストロークの一時バッファ。ストローク確定時に
//!   ストローク全体の不透明度を掛けて canvas へ合成 → クリア
//! - 画面には canvas と stroke_buffer(ライブプレビュー)を重ねて表示

use brush_core::Stamp;
use std::sync::Arc;
use wgpu::util::DeviceExt;
use winit::window::Window;

const CANVAS_FORMAT: wgpu::TextureFormat = wgpu::TextureFormat::Rgba16Float;

#[repr(C)]
#[derive(Clone, Copy, bytemuck::Pod, bytemuck::Zeroable)]
struct StampInstance {
    pos: [f32; 2],
    radius: f32,
    opacity: f32,
}

#[repr(C)]
#[derive(Clone, Copy, bytemuck::Pod, bytemuck::Zeroable)]
struct StampUniform {
    canvas_size: [f32; 2],
    hardness: f32,
    _pad: f32,
    color: [f32; 4],
}

#[repr(C)]
#[derive(Clone, Copy, bytemuck::Pod, bytemuck::Zeroable)]
struct BlitUniform {
    target_size: [f32; 2],
    rect_min: [f32; 2],
    rect_size: [f32; 2],
    opacity: f32,
    _pad: f32,
}

/// 描画コマンド。イベント発生順を保ったまま次の RedrawRequested で実行する。
enum Cmd {
    Stamps(Vec<StampInstance>),
    /// ストロークバッファを canvas へ焼き込む(値はストローク不透明度)
    Composite(f32),
    ClearCanvas,
}

pub struct Gfx {
    surface: wgpu::Surface<'static>,
    device: wgpu::Device,
    queue: wgpu::Queue,
    config: wgpu::SurfaceConfiguration,

    canvas_size: (u32, u32),
    canvas_view: wgpu::TextureView,
    stroke_view: wgpu::TextureView,

    stamp_pipeline: wgpu::RenderPipeline,
    composite_pipeline: wgpu::RenderPipeline,
    present_pipeline: wgpu::RenderPipeline,

    stamp_uniform: wgpu::Buffer,
    stamp_bind: wgpu::BindGroup,
    composite_uniform: wgpu::Buffer,
    composite_bind: wgpu::BindGroup,
    present_canvas_uniform: wgpu::Buffer,
    present_canvas_bind: wgpu::BindGroup,
    present_stroke_uniform: wgpu::Buffer,
    present_stroke_bind: wgpu::BindGroup,

    cmds: Vec<Cmd>,
    /// ライブプレビューに掛けるストローク不透明度
    preview_opacity: f32,
}

impl Gfx {
    pub async fn new(window: Arc<Window>) -> Result<Self, Box<dyn std::error::Error>> {
        let size = window.inner_size();
        let instance = wgpu::Instance::new(wgpu::InstanceDescriptor::default());
        let surface = instance.create_surface(window)?;
        let adapter = instance
            .request_adapter(&wgpu::RequestAdapterOptions {
                power_preference: wgpu::PowerPreference::HighPerformance,
                compatible_surface: Some(&surface),
                force_fallback_adapter: false,
            })
            .await
            .ok_or("GPU アダプタが見つかりません")?;
        let (device, queue) = adapter
            .request_device(
                &wgpu::DeviceDescriptor {
                    label: None,
                    required_features: wgpu::Features::empty(),
                    required_limits: wgpu::Limits::default(),
                },
                None,
            )
            .await?;

        let mut config = surface
            .get_default_config(&adapter, size.width.max(1), size.height.max(1))
            .ok_or("サーフェスが未対応です")?;
        // ペン遅延を最小化するためフレームレイテンシは 1 に絞る
        config.desired_maximum_frame_latency = 1;
        surface.configure(&device, &config);

        // キャンバスは起動時のウィンドウサイズで固定(Phase 0 ではリサイズ非追従)
        let canvas_size = (size.width.max(1), size.height.max(1));
        let make_target = |label: &str| {
            let tex = device.create_texture(&wgpu::TextureDescriptor {
                label: Some(label),
                size: wgpu::Extent3d {
                    width: canvas_size.0,
                    height: canvas_size.1,
                    depth_or_array_layers: 1,
                },
                mip_level_count: 1,
                sample_count: 1,
                dimension: wgpu::TextureDimension::D2,
                format: CANVAS_FORMAT,
                usage: wgpu::TextureUsages::RENDER_ATTACHMENT | wgpu::TextureUsages::TEXTURE_BINDING,
                view_formats: &[],
            });
            tex.create_view(&wgpu::TextureViewDescriptor::default())
        };
        let canvas_view = make_target("canvas");
        let stroke_view = make_target("stroke-buffer");

        let shader = device.create_shader_module(wgpu::ShaderModuleDescriptor {
            label: Some("shaders"),
            source: wgpu::ShaderSource::Wgsl(include_str!("shaders.wgsl").into()),
        });

        let premultiplied = wgpu::BlendState {
            color: wgpu::BlendComponent {
                src_factor: wgpu::BlendFactor::One,
                dst_factor: wgpu::BlendFactor::OneMinusSrcAlpha,
                operation: wgpu::BlendOperation::Add,
            },
            alpha: wgpu::BlendComponent {
                src_factor: wgpu::BlendFactor::One,
                dst_factor: wgpu::BlendFactor::OneMinusSrcAlpha,
                operation: wgpu::BlendOperation::Add,
            },
        };

        // --- スタンプパイプライン(→ ストロークバッファ) ---
        let stamp_bgl = device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
            label: Some("stamp-bgl"),
            entries: &[wgpu::BindGroupLayoutEntry {
                binding: 0,
                visibility: wgpu::ShaderStages::VERTEX_FRAGMENT,
                ty: wgpu::BindingType::Buffer {
                    ty: wgpu::BufferBindingType::Uniform,
                    has_dynamic_offset: false,
                    min_binding_size: None,
                },
                count: None,
            }],
        });
        let stamp_layout = device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
            label: Some("stamp-layout"),
            bind_group_layouts: &[&stamp_bgl],
            push_constant_ranges: &[],
        });
        const STAMP_ATTRS: [wgpu::VertexAttribute; 3] =
            wgpu::vertex_attr_array![0 => Float32x2, 1 => Float32, 2 => Float32];
        let stamp_pipeline = device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
            label: Some("stamp"),
            layout: Some(&stamp_layout),
            vertex: wgpu::VertexState {
                module: &shader,
                entry_point: "stamp_vs",
                buffers: &[wgpu::VertexBufferLayout {
                    array_stride: std::mem::size_of::<StampInstance>() as u64,
                    step_mode: wgpu::VertexStepMode::Instance,
                    attributes: &STAMP_ATTRS,
                }],
            },
            primitive: wgpu::PrimitiveState {
                topology: wgpu::PrimitiveTopology::TriangleStrip,
                ..Default::default()
            },
            depth_stencil: None,
            multisample: wgpu::MultisampleState::default(),
            fragment: Some(wgpu::FragmentState {
                module: &shader,
                entry_point: "stamp_fs",
                targets: &[Some(wgpu::ColorTargetState {
                    format: CANVAS_FORMAT,
                    blend: Some(premultiplied),
                    write_mask: wgpu::ColorWrites::ALL,
                })],
            }),
            multiview: None,
        });

        // --- ブリットパイプライン(合成用と画面表示用でターゲット形式が違う) ---
        let blit_bgl = device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
            label: Some("blit-bgl"),
            entries: &[
                wgpu::BindGroupLayoutEntry {
                    binding: 0,
                    visibility: wgpu::ShaderStages::VERTEX_FRAGMENT,
                    ty: wgpu::BindingType::Buffer {
                        ty: wgpu::BufferBindingType::Uniform,
                        has_dynamic_offset: false,
                        min_binding_size: None,
                    },
                    count: None,
                },
                wgpu::BindGroupLayoutEntry {
                    binding: 1,
                    visibility: wgpu::ShaderStages::FRAGMENT,
                    ty: wgpu::BindingType::Texture {
                        sample_type: wgpu::TextureSampleType::Float { filterable: true },
                        view_dimension: wgpu::TextureViewDimension::D2,
                        multisampled: false,
                    },
                    count: None,
                },
                wgpu::BindGroupLayoutEntry {
                    binding: 2,
                    visibility: wgpu::ShaderStages::FRAGMENT,
                    ty: wgpu::BindingType::Sampler(wgpu::SamplerBindingType::Filtering),
                    count: None,
                },
            ],
        });
        let blit_layout = device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
            label: Some("blit-layout"),
            bind_group_layouts: &[&blit_bgl],
            push_constant_ranges: &[],
        });
        let make_blit_pipeline = |label: &str, format: wgpu::TextureFormat| {
            device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
                label: Some(label),
                layout: Some(&blit_layout),
                vertex: wgpu::VertexState {
                    module: &shader,
                    entry_point: "blit_vs",
                    buffers: &[],
                },
                primitive: wgpu::PrimitiveState {
                    topology: wgpu::PrimitiveTopology::TriangleStrip,
                    ..Default::default()
                },
                depth_stencil: None,
                multisample: wgpu::MultisampleState::default(),
                fragment: Some(wgpu::FragmentState {
                    module: &shader,
                    entry_point: "blit_fs",
                    targets: &[Some(wgpu::ColorTargetState {
                        format,
                        blend: Some(premultiplied),
                        write_mask: wgpu::ColorWrites::ALL,
                    })],
                }),
                multiview: None,
            })
        };
        let composite_pipeline = make_blit_pipeline("composite", CANVAS_FORMAT);
        let present_pipeline = make_blit_pipeline("present", config.format);

        let sampler = device.create_sampler(&wgpu::SamplerDescriptor {
            label: Some("linear"),
            mag_filter: wgpu::FilterMode::Linear,
            min_filter: wgpu::FilterMode::Linear,
            ..Default::default()
        });

        let make_uniform = |label: &str, size: u64| {
            device.create_buffer(&wgpu::BufferDescriptor {
                label: Some(label),
                size,
                usage: wgpu::BufferUsages::UNIFORM | wgpu::BufferUsages::COPY_DST,
                mapped_at_creation: false,
            })
        };
        let stamp_uniform = make_uniform("stamp-uniform", std::mem::size_of::<StampUniform>() as u64);
        let composite_uniform =
            make_uniform("composite-uniform", std::mem::size_of::<BlitUniform>() as u64);
        let present_canvas_uniform =
            make_uniform("present-canvas-uniform", std::mem::size_of::<BlitUniform>() as u64);
        let present_stroke_uniform =
            make_uniform("present-stroke-uniform", std::mem::size_of::<BlitUniform>() as u64);

        let stamp_bind = device.create_bind_group(&wgpu::BindGroupDescriptor {
            label: Some("stamp-bind"),
            layout: &stamp_bgl,
            entries: &[wgpu::BindGroupEntry {
                binding: 0,
                resource: stamp_uniform.as_entire_binding(),
            }],
        });
        let make_blit_bind = |label: &str, uniform: &wgpu::Buffer, view: &wgpu::TextureView| {
            device.create_bind_group(&wgpu::BindGroupDescriptor {
                label: Some(label),
                layout: &blit_bgl,
                entries: &[
                    wgpu::BindGroupEntry {
                        binding: 0,
                        resource: uniform.as_entire_binding(),
                    },
                    wgpu::BindGroupEntry {
                        binding: 1,
                        resource: wgpu::BindingResource::TextureView(view),
                    },
                    wgpu::BindGroupEntry {
                        binding: 2,
                        resource: wgpu::BindingResource::Sampler(&sampler),
                    },
                ],
            })
        };
        let composite_bind = make_blit_bind("composite-bind", &composite_uniform, &stroke_view);
        let present_canvas_bind =
            make_blit_bind("present-canvas-bind", &present_canvas_uniform, &canvas_view);
        let present_stroke_bind =
            make_blit_bind("present-stroke-bind", &present_stroke_uniform, &stroke_view);

        Ok(Self {
            surface,
            device,
            queue,
            config,
            canvas_size,
            canvas_view,
            stroke_view,
            stamp_pipeline,
            composite_pipeline,
            present_pipeline,
            stamp_uniform,
            stamp_bind,
            composite_uniform,
            composite_bind,
            present_canvas_uniform,
            present_canvas_bind,
            present_stroke_uniform,
            present_stroke_bind,
            cmds: vec![Cmd::ClearCanvas],
            preview_opacity: 1.0,
        })
    }

    pub fn canvas_size(&self) -> (u32, u32) {
        self.canvas_size
    }

    pub fn resize(&mut self, width: u32, height: u32) {
        if width == 0 || height == 0 {
            return;
        }
        self.config.width = width;
        self.config.height = height;
        self.surface.configure(&self.device, &self.config);
    }

    pub fn reconfigure(&mut self) {
        self.surface.configure(&self.device, &self.config);
    }

    /// ブラシ設定をシェーダユニフォームへ反映する(毎フレーム呼んで構わない)。
    pub fn set_brush(&mut self, hardness: f32, color: [f32; 3], stroke_opacity: f32) {
        self.queue.write_buffer(
            &self.stamp_uniform,
            0,
            bytemuck::bytes_of(&StampUniform {
                canvas_size: [self.canvas_size.0 as f32, self.canvas_size.1 as f32],
                hardness,
                _pad: 0.0,
                color: [color[0], color[1], color[2], 1.0],
            }),
        );
        self.preview_opacity = stroke_opacity;
    }

    pub fn queue_stamps(&mut self, stamps: &[Stamp]) {
        if stamps.is_empty() {
            return;
        }
        let instances: Vec<StampInstance> = stamps
            .iter()
            .map(|s| StampInstance {
                pos: [s.x, s.y],
                radius: s.radius,
                opacity: s.opacity,
            })
            .collect();
        // 直前のコマンドもスタンプなら結合して 1 パスで描く
        if let Some(Cmd::Stamps(prev)) = self.cmds.last_mut() {
            prev.extend(instances);
        } else {
            self.cmds.push(Cmd::Stamps(instances));
        }
    }

    /// ストローク確定。ストロークバッファを canvas へ焼き込み、バッファをクリアする。
    pub fn queue_composite(&mut self, stroke_opacity: f32) {
        self.cmds.push(Cmd::Composite(stroke_opacity));
    }

    pub fn queue_clear_canvas(&mut self) {
        self.cmds.push(Cmd::ClearCanvas);
    }

    pub fn render(&mut self) -> Result<(), wgpu::SurfaceError> {
        let cw = self.canvas_size.0 as f32;
        let ch = self.canvas_size.1 as f32;
        let full_canvas_rect = |opacity: f32| BlitUniform {
            target_size: [cw, ch],
            rect_min: [0.0, 0.0],
            rect_size: [cw, ch],
            opacity,
            _pad: 0.0,
        };

        // 合成不透明度(同一フレームに複数あれば最後の値。実運用上は同一ブラシ)
        for cmd in &self.cmds {
            if let Cmd::Composite(op) = cmd {
                self.queue
                    .write_buffer(&self.composite_uniform, 0, bytemuck::bytes_of(&full_canvas_rect(*op)));
            }
        }
        let sw = self.config.width as f32;
        let sh = self.config.height as f32;
        let present_rect = |opacity: f32| BlitUniform {
            target_size: [sw, sh],
            rect_min: [0.0, 0.0],
            rect_size: [cw, ch],
            opacity,
            _pad: 0.0,
        };
        self.queue.write_buffer(
            &self.present_canvas_uniform,
            0,
            bytemuck::bytes_of(&present_rect(1.0)),
        );
        self.queue.write_buffer(
            &self.present_stroke_uniform,
            0,
            bytemuck::bytes_of(&present_rect(self.preview_opacity)),
        );

        // スタンプ用インスタンスバッファを先に全部作る(パスの借用と分離するため)
        let cmds = std::mem::take(&mut self.cmds);
        let instance_buffers: Vec<Option<(wgpu::Buffer, u32)>> = cmds
            .iter()
            .map(|cmd| match cmd {
                Cmd::Stamps(list) => Some((
                    self.device
                        .create_buffer_init(&wgpu::util::BufferInitDescriptor {
                            label: Some("stamp-instances"),
                            contents: bytemuck::cast_slice(list),
                            usage: wgpu::BufferUsages::VERTEX,
                        }),
                    list.len() as u32,
                )),
                _ => None,
            })
            .collect();

        let frame = self.surface.get_current_texture()?;
        let frame_view = frame
            .texture
            .create_view(&wgpu::TextureViewDescriptor::default());
        let mut encoder = self
            .device
            .create_command_encoder(&wgpu::CommandEncoderDescriptor { label: Some("frame") });

        for (cmd, inst) in cmds.iter().zip(instance_buffers.iter()) {
            match cmd {
                Cmd::Stamps(_) => {
                    let (buffer, count) = inst.as_ref().unwrap();
                    let mut pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                        label: Some("stamps"),
                        color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                            view: &self.stroke_view,
                            resolve_target: None,
                            ops: wgpu::Operations {
                                load: wgpu::LoadOp::Load,
                                store: wgpu::StoreOp::Store,
                            },
                        })],
                        depth_stencil_attachment: None,
                        timestamp_writes: None,
                        occlusion_query_set: None,
                    });
                    pass.set_pipeline(&self.stamp_pipeline);
                    pass.set_bind_group(0, &self.stamp_bind, &[]);
                    pass.set_vertex_buffer(0, buffer.slice(..));
                    pass.draw(0..4, 0..*count);
                }
                Cmd::Composite(_) => {
                    // ストロークバッファ → canvas
                    {
                        let mut pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                            label: Some("composite"),
                            color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                                view: &self.canvas_view,
                                resolve_target: None,
                                ops: wgpu::Operations {
                                    load: wgpu::LoadOp::Load,
                                    store: wgpu::StoreOp::Store,
                                },
                            })],
                            depth_stencil_attachment: None,
                            timestamp_writes: None,
                            occlusion_query_set: None,
                        });
                        pass.set_pipeline(&self.composite_pipeline);
                        pass.set_bind_group(0, &self.composite_bind, &[]);
                        pass.draw(0..4, 0..1);
                    }
                    // ストロークバッファをクリア
                    encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                        label: Some("clear-stroke"),
                        color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                            view: &self.stroke_view,
                            resolve_target: None,
                            ops: wgpu::Operations {
                                load: wgpu::LoadOp::Clear(wgpu::Color::TRANSPARENT),
                                store: wgpu::StoreOp::Store,
                            },
                        })],
                        depth_stencil_attachment: None,
                        timestamp_writes: None,
                        occlusion_query_set: None,
                    });
                }
                Cmd::ClearCanvas => {
                    // 紙は白(リニア空間の白 = 1.0)
                    encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                        label: Some("clear-canvas"),
                        color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                            view: &self.canvas_view,
                            resolve_target: None,
                            ops: wgpu::Operations {
                                load: wgpu::LoadOp::Clear(wgpu::Color::WHITE),
                                store: wgpu::StoreOp::Store,
                            },
                        })],
                        depth_stencil_attachment: None,
                        timestamp_writes: None,
                        occlusion_query_set: None,
                    });
                }
            }
        }

        // 画面へ表示: 背景 → canvas → 描画中ストロークのプレビュー
        {
            let mut pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                label: Some("present"),
                color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                    view: &frame_view,
                    resolve_target: None,
                    ops: wgpu::Operations {
                        load: wgpu::LoadOp::Clear(wgpu::Color {
                            r: 0.28,
                            g: 0.28,
                            b: 0.30,
                            a: 1.0,
                        }),
                        store: wgpu::StoreOp::Store,
                    },
                })],
                depth_stencil_attachment: None,
                timestamp_writes: None,
                occlusion_query_set: None,
            });
            pass.set_pipeline(&self.present_pipeline);
            pass.set_bind_group(0, &self.present_canvas_bind, &[]);
            pass.draw(0..4, 0..1);
            pass.set_bind_group(0, &self.present_stroke_bind, &[]);
            pass.draw(0..4, 0..1);
        }

        self.queue.submit(std::iter::once(encoder.finish()));
        frame.present();
        Ok(())
    }
}
