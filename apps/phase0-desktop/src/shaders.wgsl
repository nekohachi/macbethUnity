// Phase 0 シェーダ。
// - stamp_*: ブラシチップ(ソフト円)をストロークバッファへインスタンス描画
// - blit_*:  テクスチャを矩形に貼るだけの汎用パス(合成・画面表示に使用)
//
// 色はすべて premultiplied alpha / リニア空間で扱う。

// ---------- スタンプ描画 ----------

struct StampUniform {
    canvas_size: vec2<f32>,
    hardness: f32,
    _pad: f32,
    color: vec4<f32>,
};
@group(0) @binding(0) var<uniform> su: StampUniform;

struct StampIn {
    @location(0) pos: vec2<f32>,
    @location(1) radius: f32,
    @location(2) opacity: f32,
};

struct StampOut {
    @builtin(position) clip: vec4<f32>,
    @location(0) local: vec2<f32>,
    @location(1) radius: f32,
    @location(2) opacity: f32,
};

@vertex
fn stamp_vs(@builtin(vertex_index) vi: u32, inst: StampIn) -> StampOut {
    var corners = array<vec2<f32>, 4>(
        vec2<f32>(-1.0, -1.0),
        vec2<f32>(1.0, -1.0),
        vec2<f32>(-1.0, 1.0),
        vec2<f32>(1.0, 1.0),
    );
    let c = corners[vi];
    // AA のフェード領域が切れないよう少し広めのクアッドにする
    let pad = 1.1;
    let world = inst.pos + c * inst.radius * pad;
    let ndc = vec2<f32>(
        world.x / su.canvas_size.x * 2.0 - 1.0,
        1.0 - world.y / su.canvas_size.y * 2.0,
    );
    var out: StampOut;
    out.clip = vec4<f32>(ndc, 0.0, 1.0);
    out.local = c * pad;
    out.radius = inst.radius;
    out.opacity = inst.opacity;
    return out;
}

@fragment
fn stamp_fs(in: StampOut) -> @location(0) vec4<f32> {
    // 距離場ベースのソフト円。hardness が高いほどエッジが立つが、
    // 半径に応じた最低限の AA 幅(約1.5px)は常に確保する。
    let d = length(in.local);
    let aa = 1.5 / max(in.radius, 0.75);
    let edge0 = min(su.hardness, 1.0 - aa);
    let a = (1.0 - smoothstep(edge0, 1.0, d)) * in.opacity;
    return vec4<f32>(su.color.rgb * a, a);
}

// ---------- ブリット(矩形貼り付け) ----------

struct BlitUniform {
    target_size: vec2<f32>,
    rect_min: vec2<f32>,
    rect_size: vec2<f32>,
    opacity: f32,
    _pad: f32,
};
@group(0) @binding(0) var<uniform> bu: BlitUniform;
@group(0) @binding(1) var blit_tex: texture_2d<f32>;
@group(0) @binding(2) var blit_samp: sampler;

struct BlitOut {
    @builtin(position) clip: vec4<f32>,
    @location(0) uv: vec2<f32>,
};

@vertex
fn blit_vs(@builtin(vertex_index) vi: u32) -> BlitOut {
    var corners = array<vec2<f32>, 4>(
        vec2<f32>(0.0, 0.0),
        vec2<f32>(1.0, 0.0),
        vec2<f32>(0.0, 1.0),
        vec2<f32>(1.0, 1.0),
    );
    let c = corners[vi];
    let px = bu.rect_min + c * bu.rect_size;
    let ndc = vec2<f32>(
        px.x / bu.target_size.x * 2.0 - 1.0,
        1.0 - px.y / bu.target_size.y * 2.0,
    );
    var out: BlitOut;
    out.clip = vec4<f32>(ndc, 0.0, 1.0);
    out.uv = c;
    return out;
}

@fragment
fn blit_fs(in: BlitOut) -> @location(0) vec4<f32> {
    // premultiplied なので不透明度は全成分に掛かる
    return textureSample(blit_tex, blit_samp, in.uv) * bu.opacity;
}
