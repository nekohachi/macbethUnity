//! Phase 0: 書き味検証プロトタイプ。
//!
//! 1 レイヤーのキャンバスに brush-core のパイプラインで低遅延描画する。
//! 目的は「書き味」の検証のみ。UI・レイヤー・保存は対象外。
//!
//! 操作:
//!   ドラッグ           描画(ペンタブレット/タッチは筆圧対応)
//!   -/=                ブラシサイズ
//!   [ / ]              ブラシ硬さ
//!   , / .              手ぶれ補正(スタビライザー)強度
//!   P                  マウス用の筆圧シミュレーション(速度→筆圧)の ON/OFF
//!   1 / 2 / 3          色(墨 / 紅 / 藍)
//!   C                  キャンバスクリア

mod gfx;

use brush_core::{BrushParams, InputPoint, StrokeEngine};
use std::sync::Arc;
use std::time::Instant;
use winit::{
    dpi::LogicalSize,
    event::{ElementState, Event, MouseButton, TouchPhase, WindowEvent},
    event_loop::{ControlFlow, EventLoop},
    keyboard::{KeyCode, PhysicalKey},
    window::WindowBuilder,
};

// sRGB 8bit → リニア(シェーダはリニア空間で合成するため)
fn srgb_to_linear(c: [u8; 3]) -> [f32; 3] {
    let f = |v: u8| {
        let x = v as f32 / 255.0;
        if x <= 0.04045 {
            x / 12.92
        } else {
            ((x + 0.055) / 1.055).powf(2.4)
        }
    };
    [f(c[0]), f(c[1]), f(c[2])]
}

const COLORS: [([u8; 3], &str); 3] = [
    ([26, 26, 36], "墨"),
    ([196, 42, 66], "紅"),
    ([38, 84, 168], "藍"),
];

struct App {
    params: BrushParams,
    stabilizer_radius: f32,
    color_index: usize,
    /// マウス入力時に速度から筆圧を合成する(ペンタブレットなしでも
    /// 入り抜きの挙動を確認するための機能)
    pressure_sim: bool,

    engine: Option<StrokeEngine>,
    mouse_down: bool,
    last_pos: Option<(f32, f32, f64)>,
    sim_pressure: f32,
    start: Instant,
}

impl App {
    fn new() -> Self {
        Self {
            params: BrushParams::default(),
            stabilizer_radius: 8.0,
            color_index: 0,
            pressure_sim: true,
            engine: None,
            mouse_down: false,
            last_pos: None,
            sim_pressure: 0.5,
            start: Instant::now(),
        }
    }

    fn now(&self) -> f64 {
        self.start.elapsed().as_secs_f64()
    }

    fn color_linear(&self) -> [f32; 3] {
        srgb_to_linear(COLORS[self.color_index].0)
    }

    /// マウス用の筆圧シミュレーション: ゆっくり動かすほど筆圧が高い。
    fn simulated_pressure(&mut self, x: f32, y: f32, t: f64) -> f32 {
        if !self.pressure_sim {
            return 1.0;
        }
        if let Some((lx, ly, lt)) = self.last_pos {
            let dt = (t - lt).max(1e-4) as f32;
            let speed = ((x - lx).powi(2) + (y - ly).powi(2)).sqrt() / dt; // px/s
            let target = (1.15 - speed / 1500.0).clamp(0.12, 1.0);
            // 急変を避けるため EMA で慣らす(筆圧のガタつき防止)
            self.sim_pressure += (target - self.sim_pressure) * 0.3;
        }
        self.sim_pressure
    }

    fn title(&self) -> String {
        format!(
            "Phase 0 書き味検証 — サイズ {:.0}px | 硬さ {:.1} | 補正 {:.0}px | 筆圧sim {} | 色 {}",
            self.params.radius,
            self.params.hardness,
            self.stabilizer_radius,
            if self.pressure_sim { "ON" } else { "OFF" },
            COLORS[self.color_index].1,
        )
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    env_logger::init();
    let event_loop = EventLoop::new()?;
    let window = Arc::new(
        WindowBuilder::new()
            .with_title("Phase 0 書き味検証")
            .with_inner_size(LogicalSize::new(1280.0, 850.0))
            .build(&event_loop)?,
    );
    let mut gfx = pollster::block_on(gfx::Gfx::new(window.clone()))?;
    let mut app = App::new();
    window.set_title(&app.title());
    println!("キャンバス: {:?}px", gfx.canvas_size());

    event_loop.run(move |event, elwt| {
        elwt.set_control_flow(ControlFlow::Wait);
        let Event::WindowEvent { event, .. } = event else {
            return;
        };
        match event {
            WindowEvent::CloseRequested => elwt.exit(),
            WindowEvent::Resized(size) => {
                gfx.resize(size.width, size.height);
                window.request_redraw();
            }
            WindowEvent::RedrawRequested => {
                gfx.set_brush(app.params.hardness, app.color_linear(), app.params.opacity);
                match gfx.render() {
                    Ok(()) => {}
                    Err(wgpu::SurfaceError::Lost | wgpu::SurfaceError::Outdated) => {
                        gfx.reconfigure()
                    }
                    Err(e) => log::error!("render: {e}"),
                }
            }

            // --- マウス入力 ---
            WindowEvent::MouseInput {
                state,
                button: MouseButton::Left,
                ..
            } => match state {
                ElementState::Pressed => {
                    app.mouse_down = true;
                    app.sim_pressure = 0.5;
                    app.engine = Some(StrokeEngine::begin(app.params, app.stabilizer_radius));
                }
                ElementState::Released => {
                    app.mouse_down = false;
                    app.last_pos = None;
                    if let Some(mut engine) = app.engine.take() {
                        gfx.queue_stamps(&engine.finish());
                        gfx.queue_composite(app.params.opacity);
                        window.request_redraw();
                    }
                }
            },
            WindowEvent::CursorMoved { position, .. } => {
                if !app.mouse_down {
                    return;
                }
                let (x, y) = (position.x as f32, position.y as f32);
                let t = app.now();
                let pressure = app.simulated_pressure(x, y, t);
                app.last_pos = Some((x, y, t));
                if let Some(engine) = app.engine.as_mut() {
                    let stamps = engine.add_point(InputPoint {
                        x,
                        y,
                        pressure,
                        time: t,
                    });
                    gfx.queue_stamps(&stamps);
                    window.request_redraw();
                }
            }

            // --- タッチ / ペン入力(筆圧付き) ---
            WindowEvent::Touch(touch) => {
                let (x, y) = (touch.location.x as f32, touch.location.y as f32);
                let t = app.now();
                let pressure = touch
                    .force
                    .map(|f| f.normalized() as f32)
                    .unwrap_or_else(|| app.simulated_pressure(x, y, t));
                app.last_pos = Some((x, y, t));
                match touch.phase {
                    TouchPhase::Started => {
                        let mut engine = StrokeEngine::begin(app.params, app.stabilizer_radius);
                        gfx.queue_stamps(&engine.add_point(InputPoint {
                            x,
                            y,
                            pressure,
                            time: t,
                        }));
                        app.engine = Some(engine);
                        window.request_redraw();
                    }
                    TouchPhase::Moved => {
                        if let Some(engine) = app.engine.as_mut() {
                            gfx.queue_stamps(&engine.add_point(InputPoint {
                                x,
                                y,
                                pressure,
                                time: t,
                            }));
                            window.request_redraw();
                        }
                    }
                    TouchPhase::Ended | TouchPhase::Cancelled => {
                        app.last_pos = None;
                        if let Some(mut engine) = app.engine.take() {
                            gfx.queue_stamps(&engine.finish());
                            gfx.queue_composite(app.params.opacity);
                            window.request_redraw();
                        }
                    }
                }
            }

            // --- キーボード ---
            WindowEvent::KeyboardInput { event, .. } => {
                if event.state != ElementState::Pressed {
                    return;
                }
                let PhysicalKey::Code(code) = event.physical_key else {
                    return;
                };
                match code {
                    KeyCode::Minus => {
                        app.params.radius = (app.params.radius * 0.8).max(1.0);
                    }
                    KeyCode::Equal => {
                        app.params.radius = (app.params.radius * 1.25).min(200.0);
                    }
                    KeyCode::BracketLeft => {
                        app.params.hardness = (app.params.hardness - 0.1).max(0.0);
                    }
                    KeyCode::BracketRight => {
                        app.params.hardness = (app.params.hardness + 0.1).min(1.0);
                    }
                    KeyCode::Comma => {
                        app.stabilizer_radius = (app.stabilizer_radius - 4.0).max(0.0);
                    }
                    KeyCode::Period => {
                        app.stabilizer_radius = (app.stabilizer_radius + 4.0).min(40.0);
                    }
                    KeyCode::KeyP => {
                        app.pressure_sim = !app.pressure_sim;
                    }
                    KeyCode::Digit1 => app.color_index = 0,
                    KeyCode::Digit2 => app.color_index = 1,
                    KeyCode::Digit3 => app.color_index = 2,
                    KeyCode::KeyC => {
                        gfx.queue_clear_canvas();
                        window.request_redraw();
                    }
                    _ => return,
                }
                window.set_title(&app.title());
            }
            _ => {}
        }
    })?;
    Ok(())
}
