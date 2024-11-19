class t {
  static EventType = {
    MetaLoaded: "MetaLoaded",
    IndexBinLoaded: "IndexBinLoaded",
    LCCObjectCreate: "LCCObjectCreate",
    LCCObjectDestroy: "LCCObjectDestroy",
    CameraDataChanged: "CameraDataChanged",
    OnViewDataCreated: "OnViewDataCreated",
  };
  static _callbacks = {};
  static addEventListener(e, s) {
    const n = t._callbacks;
    n[e] || (n[e] = []), n[e].indexOf(s) < 0 && n[e].push(s);
  }
  static removeEventListener(e, s) {
    const n = t._callbacks[e];
    if (n) {
      const t = n.indexOf(s);
      t >= 0 && n.splice(t, 1);
    }
  }
  static dispatchEvent(e, s) {
    const n = t._callbacks[e];
    if (void 0 !== n) {
      const t = n.slice(0);
      for (let e = 0, n = t.length; e < n; e++) t[e](s);
    }
  }
}
const e = 0,
  s = "env",
  n = {};
class i {
  constructor(t, e, s) {
    (this.x = 0),
      (this.y = 0),
      (this.z = 0),
      "number" == typeof t && (this.x = t),
      "number" == typeof e && (this.y = e),
      "number" == typeof s && (this.z = s);
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z;
  }
  set(t, e, s) {
    return (
      "number" == typeof t && (this.x = t),
      "number" == typeof e && (this.y = e),
      "number" == typeof s && (this.z = s),
      this
    );
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(t) {
    return (this.x = t.x), (this.y = t.y), (this.z = t.z), this;
  }
  add(t) {
    return (this.x += t.x), (this.y += t.y), (this.z += t.z), this;
  }
  addScalar(t) {
    return (this.x += t), (this.y += t), (this.z += t), this;
  }
  sub(t) {
    return (this.x -= t.x), (this.y -= t.y), (this.z -= t.z), this;
  }
  subScalar(t) {
    return (this.x -= t), (this.y -= t), (this.z -= t), this;
  }
  multiply(t) {
    return (this.x *= t.x), (this.y *= t.y), (this.z *= t.z), this;
  }
  multiplyScalar(t) {
    return (this.x *= t), (this.y *= t), (this.z *= t), this;
  }
  clamp(t, e) {
    return (
      (this.x = Math.max(t.x, Math.min(e.x, this.x))),
      (this.y = Math.max(t.y, Math.min(e.y, this.y))),
      (this.z = Math.max(t.z, Math.min(e.z, this.z))),
      this
    );
  }
  distanceToSquared(t) {
    const e = this.x - t.x,
      s = this.y - t.y,
      n = this.z - t.z;
    return e * e + s * s + n * n;
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  applyMatrix4(t) {
    const e = this.x,
      s = this.y,
      n = this.z,
      i = t.elements,
      a = 1 / (i[3] * e + i[7] * s + i[11] * n + i[15]);
    return (
      (this.x = (i[0] * e + i[4] * s + i[8] * n + i[12]) * a),
      (this.y = (i[1] * e + i[5] * s + i[9] * n + i[13]) * a),
      (this.z = (i[2] * e + i[6] * s + i[10] * n + i[14]) * a),
      this
    );
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  project(t) {
    if (t.matrixWorldInverse && t.projectionMatrix)
      return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(
        t.projectionMatrix
      );
    console.error("project matrix missing");
  }
  unproject(t) {
    if (t.matrixWorld && t.projectionMatrixInverse)
      return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(
        t.matrixWorld
      );
    console.error("unproject matrix missing");
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return (this.x = e[12]), (this.y = e[13]), (this.z = e[14]), this;
  }
}
class a {
  constructor(t = 0, e = 0, s = 0, n = 1) {
    (this.x = t), (this.y = e), (this.z = s), (this.w = n);
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
  }
  set(t, e, s, n) {
    return (this.x = t), (this.y = e), (this.z = s), (this.w = n), this;
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(t) {
    return (this.x = t.x), (this.y = t.y), (this.z = t.z), (this.w = t.w), this;
  }
  fromCesiumMatrix4(t) {
    let e,
      s,
      n,
      i,
      a,
      o = [1, 2, 0],
      h = new Array(3);
    const l = t[0],
      u = t[5],
      c = t[10],
      d = l + u + c;
    if (d > 0)
      (e = Math.sqrt(d + 1)),
        (a = 0.5 * e),
        (e = 0.5 / e),
        (s = (t[6] - t[9]) * e),
        (n = (t[8] - t[2]) * e),
        (i = (t[1] - t[4]) * e);
    else {
      const d = o;
      let m = 0;
      u > l && (m = 1), c > l && c > u && (m = 2);
      const p = d[m],
        f = d[p];
      e = Math.sqrt(t[r(m, m)] - t[r(p, p)] - t[r(f, f)] + 1);
      const x = h;
      (x[m] = 0.5 * e),
        (e = 0.5 / e),
        (a = (t[r(f, p)] - t[r(p, f)]) * e),
        (x[p] = (t[r(p, m)] + t[r(m, p)]) * e),
        (x[f] = (t[r(f, m)] + t[r(m, f)]) * e),
        (s = -x[0]),
        (n = -x[1]),
        (i = -x[2]);
    }
    return (this.x = s), (this.y = n), (this.z = i), (this.w = a), this;
  }
}
function r(t, e) {
  return 4 * t + e;
}
class o {
  constructor(
    t = new i(1 / 0, 1 / 0, 1 / 0),
    e = new i(-1 / 0, -1 / 0, -1 / 0)
  ) {
    (this.min = t), (this.max = e);
  }
  isEmpty() {
    return (
      this.max.x < this.min.x ||
      this.max.y < this.min.y ||
      this.max.z < this.min.z
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.min.copy(t.min), this.max.copy(t.max), this;
  }
  set(t, e) {
    return this.min.copy(t), this.max.copy(e), this;
  }
  getCenter(t) {
    return this.isEmpty()
      ? t.set(0, 0, 0)
      : t.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
  }
  containsPoint(t) {
    return !(
      t.x < this.min.x ||
      t.x > this.max.x ||
      t.y < this.min.y ||
      t.y > this.max.y ||
      t.z < this.min.z ||
      t.z > this.max.z
    );
  }
  clampPoint(t, e) {
    return e.copy(t).clamp(this.min, this.max);
  }
  distanceToPoint(t) {
    return this.clampPoint(t, new i()).distanceTo(t);
  }
}
class h {
  constructor(t, e, s, n, i, a, r, o, l, u, c, d, m, p, f, x) {
    (h.prototype.isMatrix4 = !0),
      (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
      void 0 !== t && this.set(t, e, s, n, i, a, r, o, l, u, c, d, m, p, f, x);
  }
  set(t, e, s, n, i, a, r, o, h, l, u, c, d, m, p, f) {
    const x = this.elements;
    return (
      (x[0] = t),
      (x[4] = e),
      (x[8] = s),
      (x[12] = n),
      (x[1] = i),
      (x[5] = a),
      (x[9] = r),
      (x[13] = o),
      (x[2] = h),
      (x[6] = l),
      (x[10] = u),
      (x[14] = c),
      (x[3] = d),
      (x[7] = m),
      (x[11] = p),
      (x[15] = f),
      this
    );
  }
  invert() {
    const t = this.elements,
      e = t[0],
      s = t[1],
      n = t[2],
      i = t[3],
      a = t[4],
      r = t[5],
      o = t[6],
      h = t[7],
      l = t[8],
      u = t[9],
      c = t[10],
      d = t[11],
      m = t[12],
      p = t[13],
      f = t[14],
      x = t[15],
      y = u * f * h - p * c * h + p * o * d - r * f * d - u * o * x + r * c * x,
      g = m * c * h - l * f * h - m * o * d + a * f * d + l * o * x - a * c * x,
      v = l * p * h - m * u * h + m * r * d - a * p * d - l * r * x + a * u * x,
      _ = m * u * o - l * p * o - m * r * c + a * p * c + l * r * f - a * u * f,
      w = e * y + s * g + n * v + i * _;
    if (0 === w)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const D = 1 / w;
    return (
      (t[0] = y * D),
      (t[1] =
        (p * c * i -
          u * f * i -
          p * n * d +
          s * f * d +
          u * n * x -
          s * c * x) *
        D),
      (t[2] =
        (r * f * i -
          p * o * i +
          p * n * h -
          s * f * h -
          r * n * x +
          s * o * x) *
        D),
      (t[3] =
        (u * o * i -
          r * c * i -
          u * n * h +
          s * c * h +
          r * n * d -
          s * o * d) *
        D),
      (t[4] = g * D),
      (t[5] =
        (l * f * i -
          m * c * i +
          m * n * d -
          e * f * d -
          l * n * x +
          e * c * x) *
        D),
      (t[6] =
        (m * o * i -
          a * f * i -
          m * n * h +
          e * f * h +
          a * n * x -
          e * o * x) *
        D),
      (t[7] =
        (a * c * i -
          l * o * i +
          l * n * h -
          e * c * h -
          a * n * d +
          e * o * d) *
        D),
      (t[8] = v * D),
      (t[9] =
        (m * u * i -
          l * p * i -
          m * s * d +
          e * p * d +
          l * s * x -
          e * u * x) *
        D),
      (t[10] =
        (a * p * i -
          m * r * i +
          m * s * h -
          e * p * h -
          a * s * x +
          e * r * x) *
        D),
      (t[11] =
        (l * r * i -
          a * u * i -
          l * s * h +
          e * u * h +
          a * s * d -
          e * r * d) *
        D),
      (t[12] = _ * D),
      (t[13] =
        (l * p * n -
          m * u * n +
          m * s * c -
          e * p * c -
          l * s * f +
          e * u * f) *
        D),
      (t[14] =
        (m * r * n -
          a * p * n -
          m * s * o +
          e * p * o +
          a * s * f -
          e * r * f) *
        D),
      (t[15] =
        (a * u * n -
          l * r * n +
          l * s * o -
          e * u * o -
          a * s * c +
          e * r * c) *
        D),
      this
    );
  }
  copy(t) {
    const e = this.elements,
      s = t.elements;
    return (
      (e[0] = s[0]),
      (e[1] = s[1]),
      (e[2] = s[2]),
      (e[3] = s[3]),
      (e[4] = s[4]),
      (e[5] = s[5]),
      (e[6] = s[6]),
      (e[7] = s[7]),
      (e[8] = s[8]),
      (e[9] = s[9]),
      (e[10] = s[10]),
      (e[11] = s[11]),
      (e[12] = s[12]),
      (e[13] = s[13]),
      (e[14] = s[14]),
      (e[15] = s[15]),
      this
    );
  }
  clone() {
    return new h().fromArray(this.elements);
  }
  fromArray(t, e = 0) {
    for (let s = 0; s < 16; s++) this.elements[s] = t[s + e];
    return this;
  }
  fromCesiumMatrix4(t) {
    return t && this.fromArray(t), this;
  }
}
class l {
  all = [];
  query = {};
  get length() {
    return this.all.length;
  }
  constructor() {}
  contains(t) {
    return !!this.query[t];
  }
  push(t) {
    void 0 !== t.id && "null" != typeof t.id
      ? this.query[t.id] || (this.all.push(t), (this.query[t.id] = t))
      : console.error("push data to queue error!!!id missing");
  }
  deQueue() {
    if (0 == this.all.length) return null;
    let t = this.all[0];
    return (this.all = this.all.slice(1)), (this.query[t.id] = void 0), t;
  }
  get(t) {
    return this.query[t] ? this.query[t] : null;
  }
  remove(t) {
    if (!this.query[t]) return;
    let e = [];
    this.query[t] = void 0;
    for (let s = 0; s < this.all.length; s++)
      this.all[s].id != t && e.push(this.all[s]);
    this.all = e;
  }
  clear() {
    (this.all = []), (this.query = {});
  }
  forEach(t) {
    this.all.forEach((e) => {
      t(e.id, e);
    });
  }
}
const u = {
  libType: 1,
  Cesium_Shader_Const: {
    modelMatrix: "czm_model",
    projectionMatrix: "czm_projection",
    modelViewMatrix: "czm_modelView",
    modelViewProjectionMatrix: "czm_modelViewProjection",
    position: "position",
    gl_FragColor: "out_FragColor",
  },
  Three_Shader_Const: {
    modelMatrix: "modelMatrix",
    projectionMatrix: "projectionMatrix",
    modelViewMatrix: "modelViewMatrix",
    modelViewProjectionMatrix: "modelViewProjectionMatrix",
    position: "position",
    gl_FragColor: "gl_FragColor",
  },
  returnLibShaderConst: function () {
    if (1 === u.libType) return u.Cesium_Shader_Const;
    if (0 === u.libType) return u.Three_Shader_Const;
  },
};
function c() {
  const { vertexShaderCommon: t } = {
      vertexShaderCommon:
        "\n    precision highp float;\n        \n    uniform vec2 dimensions;\n    uniform vec2 viewport;\n    uniform float focal;\n    uniform float splatCount;\n    uniform float envStartIdx;\n    uniform float envEndIdx;\n    \n    \n    uniform sampler2D colors;\n    uniform sampler2D scales;\n    uniform sampler2D transforms;\n    uniform sampler2D splatIndexes;\n    \n  \n\n    out vec4 vColor;\n    out vec2 vPosition;\n    out float vVisible;\n\n    #ifdef HAS_NOT_ATTRIBUTE_POSITION\n    in vec3 position;\n    #endif\n\n    #ifndef saturate\n    #define saturate( a ) clamp( a, 0.0, 1.0 )\n    #endif\n    \n    vec2 getStrideDataUV(in int stride, in int offset, in uint Index, vec2 dimension) {\n        vec2 samplerUV = vec2(0.0, 0.0);\n        float d = float(Index * uint(stride) + uint(offset)) / dimension.x;\n        samplerUV.y = float(floor(d)) / dimension.y;\n        samplerUV.x = fract(d);\n        return samplerUV;\n    }\n    \n    vec2 getUV(in float idx) {\n        return getStrideDataUV(1, 0, uint(idx), dimensions);\n        //return getStrideDataUV(1, 0, uint(gl_InstanceID), dimensions);\n    }\n    \n    vec4 decodeRotation(uint enc)\n    {\n    \n        vec4 rotation = vec4(\n            float(enc & 1023u) / 1023.0,\n            float((enc >> 10u) & 1023u) / 1023.0,\n            float((enc >> 20u) & 1023u) / 1023.0,\n            float((enc >> 30u) & 3u) / 3.0);\n    \n        uint idx = uint(rotation.w * 3.0);\n        vec4 q;\n        q.xyz = vec3(rotation.xyz) * sqrt(2.0) - (1.0 / sqrt(2.0));\n        q.w = sqrt(1.0 - saturate(dot(q.xyz, q.xyz)));\n        if (idx == 0u) q = q.wxyz;\n        if (idx == 1u) q = q.xwyz;\n        if (idx == 2u) q = q.xywz;\n    \n        return q;\n    }\n    \n    mat3 matrixFromRotationScale(vec4 rot, vec3 scale)\n    {\n        mat3 ms = mat3(\n            scale.x, 0, 0,\n            0, scale.y, 0,\n            0, 0, scale.z\n        );\n    \n        float x = rot.x;\n        float y = rot.y;\n        float z = rot.z;\n        float w = rot.w;\n    \n        mat3 mr = mat3(\n            1.0 - 2.0 * (y*y + z*z),   2.0*(x*y - w*z),   2.0*(x*z + w*y),\n                2.0*(x*y + w*z), 1.0-2.0*(x*x + z*z),   2.0*(y*z - w*x),\n                2.0*(x*z - w*y),   2.0*(y*z + w*x), 1.0-2.0*(x*x + y*y)\n        );\n        mat3 ret = ms * mr;\n    \n        ret = transpose(ret) * ret;\n    \n        return ret;\n    }\n    ",
    },
    { vertexShaderMain: e, vertexShaderPoints: s } = (function () {
      const { modelViewMatrix: t, projectionMatrix: e } =
        u.returnLibShaderConst();
      return {
        vertexShaderMain: `\n    vec2 splatUV = getUV(float(gl_InstanceID % int(splatCount)));\n    float idx = texture(splatIndexes, splatUV).r;\n\n    vec2 uv = getUV(idx);\n\n    vec4 sampledTransform = texture(transforms, uv);\n    vec3 sampledScale = texture(scales, uv).xyz;\n    vec4 rotation = decodeRotation(uint(sampledTransform.w));\n    vec3 splatCenter = sampledTransform.xyz;\n\n    mat3 cov = matrixFromRotationScale(rotation, sampledScale);\n\n    vec3 cov3D_M11_M12_M13 = vec3(cov[0][0], cov[0][1], cov[0][2]);\n    vec3 cov3D_M22_M23_M33 = vec3(cov[1][1], cov[1][2], cov[2][2]);\n\n    vec4 viewCenter =  ${t} * vec4(splatCenter, 1.0);\n    vec4 clipCenter = ${e} * viewCenter;\n    vec3 ndcCenter = clipCenter.xyz / clipCenter.w;\n\n\n    float bounds = 1.2 * clipCenter.w;\n    if (clipCenter.z < -bounds || clipCenter.z > bounds || clipCenter.x < -bounds || clipCenter.x > bounds\n        || clipCenter.y < -bounds || clipCenter.y > bounds) {\n        gl_Position = vec4(0.0, 0.0, ndcCenter.z, 1.0);\n        return;\n    }\n\n\n    vColor = vec4(texture(colors, uv));\n    \n    mat3 Vrk = mat3(\n        cov3D_M11_M12_M13.x, cov3D_M11_M12_M13.y, cov3D_M11_M12_M13.z,\n        cov3D_M11_M12_M13.y, cov3D_M22_M23_M33.x, cov3D_M22_M23_M33.y,\n        cov3D_M11_M12_M13.z, cov3D_M22_M23_M33.y, cov3D_M22_M23_M33.z\n    );\n    float s = 1.0 / (viewCenter.z * viewCenter.z);\n    mat3 J = mat3(\n        focal / viewCenter.z, 0., -(focal * viewCenter.x) * s,\n        0., focal / viewCenter.z, -(focal * viewCenter.y) * s,\n        0., 0., 0.\n    );\n    mat3 W = transpose(mat3( ${t}));\n    mat3 T = W * J;\n    mat3 cov2Dm = transpose(T) * Vrk * T;\n    cov2Dm[0][0] += 0.3;\n    cov2Dm[1][1] += 0.3;\n\n    vec3 cov2d = vec3(cov2Dm[0][0], cov2Dm[0][1], cov2Dm[1][1]);\n  \n    float a = cov2d.x;\n    float d = cov2d.z;\n    float b = cov2d.y;\n    float D = a * d - b * b;\n    float trace = a + d;\n    float traceOver2 = 0.5 * trace;\n    float term2 = sqrt(trace * trace / 4.0 - D);\n    float eigenValue1 = traceOver2 + term2;\n    float eigenValue2 = max(traceOver2 - term2, 0.00); // prevent negative eigen value\n\n    float transparentAdjust = step(1.0 / 255.0, vColor.a);\n    eigenValue2 = eigenValue2 * transparentAdjust;\n\n    const float maxSplatSize = 1024.0;\n    vec2 eigenVector1 = normalize(vec2(b, eigenValue1 - a));\n    vec2 eigenVector2 = vec2(eigenVector1.y, -eigenVector1.x);\n\n    vec2 basisVector1 = eigenVector1  * min(sqrt(2.0 * eigenValue1), maxSplatSize);\n    vec2 basisVector2 = eigenVector2  * min(sqrt(2.0 * eigenValue2), maxSplatSize);\n    vPosition = position.xy* 2.0;\n\n    vec2 ndcOffset = vec2(vPosition.x * basisVector1 + vPosition.y * basisVector2) / viewport * 2.0;\n    gl_Position = vec4(ndcCenter.xy + ndcOffset, ndcCenter.z, 1.0);\n`,
        vertexShaderPoints: `\n    float idx = float(gl_InstanceID);\n\n    vec2 uv = getUV(float(gl_InstanceID));\n\n    vec4 sampledTransform = texture(transforms, uv);\n    vec4 viewCenter = ${t} * vec4(sampledTransform.xyz, 1.0);\n\n    vec4 clipCenter = ${e} * viewCenter;\n     vec3 ndcCenter = clipCenter.xyz/ clipCenter.w;\n    // vColor = vec4(texture(colors, uv));\n    vColor = vec4(texture(colors, uv));\n\n    gl_Position = vec4(ndcCenter.xy + position.xy*0.001 , ndcCenter.z, 1.0);\n\n   \n`,
      };
    })(),
    { modelMatrix: n } = u.returnLibShaderConst();
  return {
    vertexShaderSH: `\n    ${t}\n    \n    const float SH_C0 = 0.28209479177387814;\n    const float SH_C1 = 0.4886025119029199;\n    const float SH_C2[5] = float[5]( 1.0925484305920792, -1.0925484305920792, 0.31539156525252005, -1.0925484305920792, 0.5462742152960396 );\n    const float SH_C3[7] = float[7](-0.5900435899266435, 2.890611442640554, -0.4570457994644658, 0.3731763325901154, -0.4570457994644658, 1.445305721320277, -0.5900435899266435 );\n    \n    struct  SH {\n        vec3 sh1;\n        vec3 sh2;\n        vec3 sh3;\n        vec3 sh4;\n        vec3 sh5;\n        vec3 sh6;\n        vec3 sh7;\n        vec3 sh8;\n        vec3 sh9;\n        vec3 sh10;\n        vec3 sh11;\n        vec3 sh12;\n        vec3 sh13;\n        vec3 sh14;\n        vec3 sh15;\n    };\n    \n    uniform float pointsOnly;\n    uniform float useSH;\n    uniform vec3 cmrPos;\n    uniform vec3 compressedSHMin;\n    uniform vec3 compressedSHMax;\n    uniform sampler2D shRawTexture;\n    SH sh;\n    \n\n    \n    vec3 DecodePacked_11_10_11(uint enc)\n    {\n        return vec3(\n        float(enc & 2047u) / 2047.0,\n        float((enc >> 11u) & 1023u) / 1023.0,\n        float((enc >> 21u) & 2047u) / 2047.0);\n    }\n    \n    \n    vec3 mixSH(vec3 min, vec3 max, vec3 xyz)\n    {\n        return vec3(\n            mix(min.x, max.x, xyz.x),\n            mix(min.y, max.y, xyz.y),\n            mix(min.z, max.z, xyz.z)\n        );\n    }\n    \n    void handleSHRawData(uvec4 raw0, uvec4 raw1, uvec4 raw2, uvec4 raw3)\n    {\n        uint sh1 = raw0.r;\n        uint sh2 = raw0.g;\n        uint sh3 = raw0.b;\n        uint sh4 = raw0.a;\n    \n    \n        uint sh5 = raw1.r;\n        uint sh6 = raw1.g;\n        uint sh7 = raw1.b;\n        uint sh8 = raw1.a;\n    \n        uint sh9 = raw2.r;\n        uint sh10 = raw2.g;\n        uint sh11 = raw2.b;\n        uint sh12 = raw2.a;\n    \n        uint sh13 = raw3.r;\n        uint sh14 = raw3.g;\n        uint sh15 = raw3.b;\n    \n        sh.sh1 = mixSH(compressedSHMin, compressedSHMax, DecodePacked_11_10_11(sh1));\n        sh.sh2 = mixSH(compressedSHMin, compressedSHMax, DecodePacked_11_10_11(sh2));\n        sh.sh3 = mixSH(compressedSHMin, compressedSHMax, DecodePacked_11_10_11(sh3));\n        sh.sh4 = mixSH(compressedSHMin, compressedSHMax, DecodePacked_11_10_11(sh4));\n        sh.sh5 = mixSH(compressedSHMin, compressedSHMax, DecodePacked_11_10_11(sh5));\n        sh.sh6 = mixSH(compressedSHMin, compressedSHMax, DecodePacked_11_10_11(sh6));\n        sh.sh7 = mixSH(compressedSHMin, compressedSHMax, DecodePacked_11_10_11(sh7));\n        sh.sh8 = mixSH(compressedSHMin, compressedSHMax, DecodePacked_11_10_11(sh8));\n        sh.sh9 = mixSH(compressedSHMin, compressedSHMax, DecodePacked_11_10_11(sh9));\n        sh.sh10 = mixSH(compressedSHMin, compressedSHMax, DecodePacked_11_10_11(sh10));\n        sh.sh11 = mixSH(compressedSHMin, compressedSHMax, DecodePacked_11_10_11(sh11));\n        sh.sh12 = mixSH(compressedSHMin, compressedSHMax, DecodePacked_11_10_11(sh12));\n        sh.sh13 = mixSH(compressedSHMin, compressedSHMax, DecodePacked_11_10_11(sh13));\n        sh.sh14 = mixSH(compressedSHMin, compressedSHMax, DecodePacked_11_10_11(sh14));\n        sh.sh15 = mixSH(compressedSHMin, compressedSHMax, DecodePacked_11_10_11(sh15));\n    }\n    \n    vec3 ShadeSH(vec3 dir)\n    {\n        float x = dir.x, y = dir.y, z = dir.z;\n    \n        vec3 result = vec3(0., 0., 0.);\n    \n        result += SH_C1 * (-sh.sh1 * y + sh.sh2 * z - sh.sh3 * x);\n    \n        float xx = x * x, yy = y * y, zz = z * z;\n        float xy = x * y, yz = y * z, xz = x * z;\n    \n        result +=\n            (SH_C2[0] * xy) * sh.sh4 +\n            (SH_C2[1] * yz) * sh.sh5 +\n            (SH_C2[2] * (2. * zz - xx - yy)) * sh.sh6 +\n            (SH_C2[3] * xz) * sh.sh7 +\n            (SH_C2[4] * (xx - yy)) * sh.sh8;\n    \n        result +=\n            (SH_C3[0] * y * (3. * xx - yy)) * sh.sh9 +\n            (SH_C3[1] * xy * z) * sh.sh10 +\n            (SH_C3[2] * y * (4. * zz - xx - yy)) * sh.sh11 +\n            (SH_C3[3] * z * (2. * zz - 3. * xx - 3. * yy)) * sh.sh12 +\n            (SH_C3[4] * x * (4. * zz - xx - yy)) * sh.sh13 +\n            (SH_C3[5] * z * (xx - yy)) * sh.sh14 +\n            (SH_C3[6] * x * (xx - 3. * yy)) * sh.sh15;\n    \n        return result;\n    }\n\n    uint composeShRaw(in vec4 shRaw) {\n        int r = int(shRaw.r * 255.0);\n        int g = int(shRaw.g * 255.0);\n        int b = int(shRaw.b * 255.0);\n        int a = int(shRaw.a * 255.0);\n        int uint32Value = (a << 24) | (b << 16) | (g << 8) | r;\n        return uint(uint32Value);\n    }\n\n    //使用Uint8Array存储Uint32Array数据, Cesium不支持Uint32Array\n    uvec4 getRawTexture( in sampler2D shRawTexture, in int u8Index, in uint shIndex, in vec2 shDimensions){\n\n          vec4 shRaw0 = texture(shRawTexture, getStrideDataUV(4 * 4, 0 + u8Index * 4, shIndex, shDimensions));\n          vec4 shRaw1 = texture(shRawTexture, getStrideDataUV(4 * 4, 1 + u8Index * 4, shIndex, shDimensions));\n          vec4 shRaw2 = texture(shRawTexture, getStrideDataUV(4 * 4, 2 + u8Index * 4, shIndex, shDimensions));\n          vec4 shRaw3 = texture(shRawTexture, getStrideDataUV(4 * 4, 3 + u8Index * 4, shIndex, shDimensions));\n\n    \n          return uvec4(composeShRaw(shRaw0), composeShRaw(shRaw1), composeShRaw(shRaw2), composeShRaw(shRaw3));\n\n    }\n\n    float computePointVisible(float startIdx, float endIdx, float idx) {\n        float visible = 1.0;\n        if (startIdx > 0.0 || endIdx > 0.0) {\n            if (idx > startIdx && idx < endIdx) {\n                visible = 0.0;\n            } \n        }\n        \n        return visible;\n    }\n\n\n    void main () {\n       \n        if(pointsOnly > 0.0)\n        {   \n            ${s}\n\n            vVisible = computePointVisible(envStartIdx, envEndIdx, idx);\n        }\n        else\n        {\n    \n            ${e}\n    \n            if(useSH > 0.0)\n            {\n                vec3 viewDir = sampledTransform.xyz - inverse(mat3(${n})) * cmrPos;\n    \n                // vec3 viewDir = sampledTransform.xyz -  cmrPos;\n\n                viewDir = normalize( viewDir).xyz;\n    \n                uint shIndex = uint(idx);\n                vec2 shDimensions = dimensions.xy * 2. * 2.0;\n                //  uvec4 shRaw0 = texture(shRawTexture, getStrideDataUV(4, 0, shIndex, shDimensions));\n                // uvec4 shRaw1 = texture(shRawTexture, getStrideDataUV(4, 1, shIndex, shDimensions));\n                // uvec4 shRaw2 = texture(shRawTexture, getStrideDataUV(4, 2, shIndex, shDimensions));\n                // uvec4 shRaw3 = texture(shRawTexture, getStrideDataUV(4, 3, shIndex, shDimensions));\n\n                uvec4 shRaw0 = getRawTexture(shRawTexture, 0, shIndex, shDimensions);\n                uvec4 shRaw1 = getRawTexture(shRawTexture, 1, shIndex, shDimensions);\n                uvec4 shRaw2 = getRawTexture(shRawTexture, 2, shIndex, shDimensions);\n                uvec4 shRaw3 = getRawTexture(shRawTexture, 3, shIndex, shDimensions);\n    \n                handleSHRawData(uvec4(shRaw0), uvec4(shRaw1), uvec4(shRaw2), uvec4(shRaw3));\n    \n                vec3 shColor = ShadeSH(viewDir);\n                //vec3 gray = vec3(dot(shColor, vec3(0.299, 0.587, 0.114))) + 1.;\n                \n                vColor.rgb += shColor;\n                // vColor.rgb = clamp(vColor.rgb, 0., 1.);\n            }\n                \n            vVisible = computePointVisible(envStartIdx, envEndIdx, idx);\n        }\n    }\n    `,
  };
}
let d,
  m,
  p,
  f,
  x,
  y,
  g,
  v,
  _,
  w,
  D,
  C,
  S,
  b,
  T,
  M,
  I,
  E,
  R,
  z,
  P,
  L,
  V = function (t) {
    const e = `onmessage=${String(t)}`,
      s = URL.createObjectURL(new Blob([e], { type: "text/javascript" }));
    return new Worker(s);
  };
function A(t, e) {
  (this.instanceCount = t.instanceCount || 10),
    (this._spCreated = !1),
    (this._sp = void 0),
    (this._rs = void 0),
    (this.geometry = null);
  let s = this;
  var n;
  (this._uniforms = {
    dimensions: function () {
      return { x: 2048, y: 2048 };
    },
    viewport: function () {
      return { x: 0, y: 0 };
    },
    focal: function () {
      return 0;
    },
    cmrPos: function () {
      return { x: 0, y: 0, z: 0 };
    },
    splatCount: function () {
      return t.instanceCount;
    },
    pointsOnly: function () {
      return 1;
    },
    useSH: function () {
      return 1;
    },
    compressedSHMin: function () {
      return { x: 0, y: 0, z: 0 };
    },
    compressedSHMax: function () {
      return { x: 0, y: 0, z: 0 };
    },
    transforms: function () {
      return s.uniformsTextures.transformTexture.owner;
    },
    colors: function () {
      return s.uniformsTextures.colorsTexture.owner;
    },
    scales: function () {
      return s.uniformsTextures.scalesTexture.owner;
    },
    splatIndexes: function () {
      return s.uniformsTextures.splatIndexesTexture.owner;
    },
    shRawTexture: function () {
      return s.uniformsTextures.shRawTexture.owner;
    },
    envStartIdx: function () {
      return 0;
    },
    envEndIdx: function () {
      return 0;
    },
  }),
    (this.attributes = []),
    (this.defines = []),
    (this._colorCommands = void 0),
    (this._createVertexArray = !0),
    (this._vs = void 0),
    (this._fs = void 0),
    (this.modelMatrix = null),
    (this.boundingVolume = null),
    (this.camera = t.camera),
    (this.useLogDepth = !1),
    (w = (n = e).ComponentDatatype),
    (D = n.WebGLConstants),
    (C = n.defined),
    (S = n.destroyObject),
    (b = n.BufferUsage),
    (T = n.DrawCommand),
    (M = n.Pass),
    (I = n.RenderState),
    (E = n.ShaderProgram),
    (R = n.ShaderSource),
    n.VertexArrayFacade,
    (z = n.BlendingState),
    (_ = n.Buffer),
    (f = n.Texture),
    (p = n.Sampler),
    (x = n.TextureWrap),
    (g = n.TextureMinificationFilter),
    (v = n.TextureMagnificationFilter),
    (y = n.PixelFormat),
    (m = n.PixelDatatype),
    n.Matrix4,
    n.PrimitiveType,
    n.BlendFunction,
    n.BlendEquation,
    (d = n.VertexArray),
    n.createUniform,
    n.UniformSampler,
    (P = n.Cartesian3),
    (L = n.BoundingSphere),
    (this.uniformsTextures = {
      transformTexture: {
        owner: null,
        unit: 4,
        pixelDatatype: m.FLOAT,
        pixelFormat: y.RGBA,
        skipColorSpaceConversion: !0,
        isDirty: !1,
        buffer: null,
      },
      colorsTexture: {
        owner: null,
        unit: 3,
        pixelDatatype: m.UNSIGNED_BYTE,
        pixelFormat: y.RGBA,
        skipColorSpaceConversion: !1,
        isDirty: !1,
        buffer: null,
      },
      scalesTexture: {
        owner: null,
        unit: 4,
        pixelDatatype: m.FLOAT,
        pixelFormat: y.RGBA,
        skipColorSpaceConversion: !1,
        isDirty: !1,
        buffer: null,
      },
      splatIndexesTexture: {
        owner: null,
        unit: 1,
        pixelDatatype: m.FLOAT,
        pixelFormat: y.RED,
        skipColorSpaceConversion: !0,
        isDirty: !1,
        buffer: null,
      },
      shRawTexture: {
        owner: null,
        unit: 4,
        pixelDatatype: m.UNSIGNED_BYTE,
        pixelFormat: D.RGBA,
        skipColorSpaceConversion: !0,
        isDirty: !1,
        buffer: null,
      },
    });
}
let B = null;
(A.prototype.createDefaultShader = function () {
  const t =
      "\n    #define mesh id:0\n    in vec3 position;\n    out vec4 v_color;\n    void main (){\n       \n        vec3 transforms = position.xyz;\n        transforms.z += float(gl_InstanceID);\n        vec4 clipCenter = czm_modelViewProjection * vec4(transforms.xyz, 1.0);\n        v_color = vec4(1.0, 1.0, .0, 0.5);\n        gl_Position  = vec4(clipCenter.xyz, clipCenter.w);\n\n    }\n    \n    ",
    e =
      "\n    in vec4 v_color;\n\n    void main(){\n\n        out_FragColor = czm_gammaCorrect(v_color);\n    }\n    ";
  return (this._vs = t), (this._fs = e), { vs: t, fs: e };
}),
  (A.prototype.createLccShader = function (t, e) {
    (this._vs = t), (this._fs = e);
  }),
  (A.prototype.setModelMatrix = function (t) {
    t && (this.modelMatrix = t);
  }),
  (A.prototype.setBoundingVolume = function (t, e) {
    if (e) {
      const s = new P(t.x, t.y, t.z),
        { max: n, min: i } = e,
        a = [
          i[0],
          i[1],
          i[2],
          i[0],
          i[1],
          n[2],
          i[0],
          n[1],
          n[2],
          i[0],
          n[1],
          i[2],
          n[0],
          n[1],
          i[2],
          n[0],
          n[1],
          n[2],
          n[0],
          i[1],
          n[2],
          n[0],
          i[1],
          i[2],
        ];
      this.boundingVolume = L.fromVertices(a, s, 8);
    }
  }),
  (A.prototype.createTransformsTexture = function (t, e, s, n, i, a) {
    const r = e.x,
      o = e.y;
    let h = null;
    n === m.FLOAT
      ? (h = new Float32Array(r * o * s))
      : n === m.UNSIGNED_BYTE
      ? (h = new Uint8Array(r * o * s))
      : n === m.UNSIGNED_INT && (h = new Uint32Array(r * o * s));
    return new f({
      context: t,
      width: r,
      height: o,
      flipY: !1,
      skipColorSpaceConversion: a,
      source: { arrayBufferView: h },
      pixelDatatype: n,
      pixelFormat: i,
      sampler: new p({
        wrapS: x.CLAMP_TO_EDGE,
        wrapT: x.CLAMP_TO_EDGE,
        minificationFilter: g.NEAREST,
        magnificationFilter: v.NEAREST,
      }),
    });
  }),
  (A.prototype.copyToTransformsTexture = function (t, e, s, n) {
    const i = this.uniformsTextures[t];
    i &&
      e &&
      i.copyFrom({
        skipColorSpaceConversion: n,
        source: { width: s.x, height: s.y, arrayBufferView: e },
      });
  }),
  (A.prototype.rebuildTransformsTexture = function (t, e, s) {
    const n = s.x,
      i = s.y,
      a = this.uniformsTextures[t];
    let r = a.owner,
      o = e;
    if (r && e && a) {
      const t = r._context;
      a.owner = new f({
        context: t,
        width: n,
        height: i,
        flipY: !1,
        skipColorSpaceConversion: a.skipColorSpaceConversion,
        source: { arrayBufferView: o },
        pixelDatatype: a.pixelDatatype,
        pixelFormat: a.pixelFormat,
        sampler: new p({
          wrapS: x.CLAMP_TO_EDGE,
          wrapT: x.CLAMP_TO_EDGE,
          minificationFilter: g.NEAREST,
          magnificationFilter: v.NEAREST,
        }),
      });
    }
    r.destroy(), (r = null);
  });
const j = { position: 0 };
function U(t) {
  let e = t.cache.lccMesh_vertexBufferInstanced;
  return (
    C(e) ||
      ((e = _.createVertexBuffer({
        context: t,
        typedArray: new Float32Array([
          1, 1, 0, -1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0,
        ]),
        usage: b.STATIC_DRAW,
      })),
      (e.vertexArrayDestroyable = !1),
      (t.cache.lccMesh_vertexBufferInstanced = e)),
    e
  );
}
(A.prototype.getVertexArray = function (t) {
  return [
    {
      index: 0,
      componentsPerAttribute: 3,
      componentDatatype: w.FLOAT,
      vertexBuffer: U(t),
      normalize: !1,
      offsetInBytes: 0,
      strideInBytes: 0,
      instanceDivisor: 0,
    },
  ];
}),
  (A.prototype.createVertex = function (t, e) {
    return (
      (this._va = new d({ context: t, attributes: e })),
      (this._createVertexArray = !1),
      this._va
    );
  }),
  (A.prototype.update = function (t) {
    if (
      ((this._instanced = t.context.instancedArrays),
      (B = j),
      this.sizeLenth,
      (this._vs && this._fs) || this.createDefaultShader(),
      this._createVertexArray &&
        ((this.attributes = this.getVertexArray(t.context)),
        this.createVertex(t.context, this.attributes)),
      this.uniformsTextures.transformTexture.owner)
    ) {
      let t = this.uniformsTextures.transformTexture;
      t &&
        !t.isDirty &&
        t.buffer &&
        (this.rebuildTransformsTexture(
          "transformTexture",
          t.buffer._pendingData,
          t.buffer.dimension,
          !0
        ),
        (t.isDirty = !0));
      let e = this.uniformsTextures.colorsTexture;
      e &&
        !e.isDirty &&
        e.buffer &&
        (this.rebuildTransformsTexture(
          "colorsTexture",
          e.buffer._pendingData,
          e.buffer.dimension,
          !1
        ),
        (e.isDirty = !0));
      let s = this.uniformsTextures.scalesTexture;
      s &&
        !s.isDirty &&
        s.buffer &&
        (this.rebuildTransformsTexture(
          "scalesTexture",
          s.buffer._pendingData,
          s.buffer.dimension,
          !1
        ),
        (s.isDirty = !0));
      let n = this.uniformsTextures.splatIndexesTexture;
      n &&
        !n.isDirty &&
        n.buffer &&
        (this.rebuildTransformsTexture(
          "splatIndexesTexture",
          n.buffer._pendingData,
          n.buffer.dimension,
          !0
        ),
        (n.isDirty = !0));
      let i = this.uniformsTextures.shRawTexture;
      i &&
        !i.isDirty &&
        i.buffer &&
        (this.rebuildTransformsTexture(
          "shRawTexture",
          i.buffer._pendingData,
          i.buffer.dimension,
          !0
        ),
        (i.isDirty = !0));
    } else
      (this.uniformsTextures.transformTexture.owner =
        this.createTransformsTexture(
          t.context,
          { x: 512, y: 512 },
          4,
          m.FLOAT,
          y.RGBA,
          !0
        )),
        (this.uniformsTextures.colorsTexture.owner =
          this.createTransformsTexture(
            t.context,
            { x: 512, y: 512 },
            4,
            m.UNSIGNED_BYTE,
            y.RGBA,
            !1
          )),
        (this.uniformsTextures.scalesTexture.owner =
          this.createTransformsTexture(
            t.context,
            { x: 512, y: 512 },
            4,
            m.FLOAT,
            y.RGBA,
            !0
          )),
        (this.uniformsTextures.splatIndexesTexture.owner =
          this.createTransformsTexture(
            t.context,
            { x: 512, y: 512 },
            1,
            m.FLOAT,
            y.RED,
            !0
          )),
        (this.uniformsTextures.shRawTexture.owner =
          this.createTransformsTexture(
            t.context,
            { x: 512, y: 512 },
            4,
            m.UNSIGNED_BYTE,
            y.RGBA,
            !0
          ));
    this._spCreated ||
      (function (t, e, s, n) {
        const i = e.context,
          a = t,
          r = new R({
            defines: [
              "INSTANCED",
              "HAS_NOT_ATTRIBUTE_POSITION",
              "LccShader",
              "LOG_DEPTH_READ_ONLY",
            ],
            sources: [s],
          }),
          o = new R({
            defines: ["LccShader", "LOG_DEPTH_READ_ONLY"],
            sources: [n],
          });
        (a._sp = E.replaceCache({
          context: i,
          shaderProgram: a._sp,
          vertexShaderSource: r,
          fragmentShaderSource: o,
          attributeLocations: B,
        })),
          (a._sp._uniforms = []),
          a._sp.numberOfVertexAttributes,
          (a._rs = I.fromCache({
            blending: z.ALPHA_BLEND,
            depthTest: { enabled: !1 },
            depthMask: !1,
            cull: { enabled: !1 },
          })),
          (a._spCreated = !0);
      })(this, t, this._vs, this._fs),
      (function (t, e) {
        const s = t,
          n = e.passes,
          i = s._uniforms,
          a = e.commandList;
        if (n.render) {
          let e = s._colorCommands;
          C(e) || (e = s._colorCommands = new T()),
            (e.pass = M.TRANSLUCENT),
            s.boundingVolume && (e.boundingVolume = s.boundingVolume),
            (e.owner = t),
            (e.uniformMap = i),
            (e.vertexArray = s._va),
            (e.shaderProgram = s._sp),
            (e.renderState = s._rs),
            (e.modelMatrix = s.modelMatrix),
            s._instanced &&
              ((e.count = 6), (e.instanceCount = s.instanceCount)),
            a.push(e);
        }
      })(this, t);
  }),
  (A.prototype.isDestroyed = function () {
    return !1;
  }),
  (A.prototype.destroy = function () {
    const t = Object.keys(this.uniformsTextures);
    for (let e = 0; e < t.length; e++) {
      let s = this.uniformsTextures[t[e]];
      s && s.owner && (s.owner = s.owner.destroy());
    }
    return (
      (this._sp = this._sp && this._sp.destroy()),
      (this._va = this._va && this._va.destroy()),
      S(this)
    );
  });
let H = { Three: 0, Cesium: 1, Invalid: 2 },
  O = H;
var F = void 0;
let k,
  N,
  q = {};
const G = [];
function W(t) {
  let e = t.data.seq,
    s = t.data.splatCount,
    n = t.data.positions,
    i = t.data.indexes,
    a = t.data.distances,
    r = t.data.cmrPos;
  for (let t = 0; t < s; t++) i[t] = t;
  let o = { x: 0, y: 0, z: 0 };
  for (let t = 0; t < s; t++) {
    let e = 4 * t;
    (o.x = n[e]), (o.y = n[e + 1]), (o.z = n[e + 2]);
    let s = o.x - r.x,
      i = o.y - r.y,
      h = o.z - r.z;
    a[t] = 1e3 * Math.sqrt(s * s + i * i + h * h);
  }
  i.sort((t, e) => a[e] - a[t]),
    self.postMessage(
      { seq: e, positions: n, indexes: i, distances: a, meshId: t.data.meshId },
      [n.buffer, i.buffer, a.buffer]
    );
}
function X(t, e, s, n) {
  let i = (function (t) {
    if (t) {
      if (t.BufferGeometry) return O.Three;
      if (t.Cartesian3) return O.Cesium;
    }
    return O.Invalid;
  })(t.renderLib);
  (u.libType = i),
    (function (t) {
      if (k) return;
      let e =
        t ||
        document.querySelector("canvas[data-engine]") ||
        document.querySelector("canvas");
      k = e.getContext("webgl2");
      const s = k.getParameter(k.MAX_TEXTURE_SIZE),
        n = k.getParameter(k.MAX_TEXTURE_IMAGE_UNITS);
      var i, a;
      console.log("获取webgl数据：", s, n),
        (k.linkProgram =
          ((i = k.linkProgram),
          function () {
            let t = arguments[0],
              e = q[t.lccMeshId];
            e && e.onProgramWillLink(),
              i.apply(this, arguments),
              (t.isLinked = !0),
              e &&
                requestAnimationFrame(() => {
                  e.onProgramLinked();
                });
          })),
        (k.attachShader =
          ((a = k.attachShader),
          function () {
            let t = null;
            if (
              k.getShaderParameter(arguments[1], k.SHADER_TYPE) ==
              k.VERTEX_SHADER
            ) {
              let e = k.getShaderSource(arguments[1]),
                s = /\#define mesh id:(\d+)/.exec(e);
              if (s && s.length > 1) {
                let e = parseInt(s[1]);
                if (!isNaN(e)) {
                  let s = arguments[0];
                  (t = q[e]),
                    (t.program = s),
                    void 0 !== s.lccMeshId &&
                      console.error("program reuse!!!!!!!!!"),
                    (s.lccMeshId = t.id),
                    (s.ignoreNames = G),
                    t.onShaderWillAttach();
                }
              }
            }
            return t && t.onShaderAttached(), a.apply(this, arguments);
          })),
        (k.useProgram = (function (t) {
          return function () {
            t.apply(this, arguments),
              1 == arguments.length && (N = arguments[0]);
          };
        })(k.useProgram));
    })(t.canvas);
  let a = null;
  return (
    i === O.Three
      ? (a = new K(t.scene, t.renderLib, i, e, s, n))
      : i === O.Cesium &&
        (a = new tt(t.scene, t.renderLib, i, e, s, n, t.modelMatrix)),
    a && (q[a.id] = a),
    a
  );
}
class Y {
  static #t;
  #e;
  #s = H.Invalid;
  #n = new i();
  #i = new a();
  #a;
  #r;
  #o;
  #h = { x: 0, y: 0 };
  #l;
  #u;
  get camera() {
    return this.#e;
  }
  get isCameraDataChanged() {
    return this.#l;
  }
  get #c() {
    return this.#s == H.Three
      ? this.camera.fov
      : this.#s == H.Cesium
      ? (180 * this.camera.frustum.fov) / Math.PI
      : void console.assert(this.#s != H.Invalid);
  }
  get matrixWorld() {
    return this.#s == H.Three
      ? this.#e.matrixWorld
      : this.#s == H.Cesium
      ? new h().fromCesiumMatrix4(this.#e.inverseViewMatrix)
      : void console.assert(this.#s != H.Invalid);
  }
  get matrixWorldInverse() {
    return this.#s == H.Three
      ? this.#e.matrixWorldInverse
      : this.#s == H.Cesium
      ? new h().fromCesiumMatrix4(this.#e.viewMatrix)
      : void console.assert(this.#s != H.Invalid);
  }
  get projectionMatrix() {
    return this.#s == H.Three
      ? this.#e.projectionMatrix
      : this.#s == H.Cesium
      ? new h().fromCesiumMatrix4(this.#e.frustum.projectionMatrix)
      : void console.assert(this.#s != H.Invalid);
  }
  get projectionMatrixInverse() {
    return this.#s == H.Three
      ? this.#e.projectionMatrixInverse
      : this.#s == H.Cesium
      ? new h().fromCesiumMatrix4(this.#e.frustum.projectionMatrix).invert()
      : void console.assert(this.#s != H.Invalid);
  }
  constructor(t) {
    const { camera: e, canvas: s } = t;
    Y.#t
      ? console.error("摄像机系统冲突")
      : ((Y.#t = this),
        e.frustum
          ? (this.#s = H.Cesium)
          : e.type.indexOf("Camera") > -1 && (this.#s = H.Three),
        console.assert(this.#s != H.Invalid),
        (this.#e = e),
        (this.#u = s),
        this.#d(),
        this.#m(),
        (this.#l = !0),
        (this.#a = this.#n.clone()),
        (this.#r = this.#i.clone()),
        (this.#o = this.#c),
        (this.#h = { x: this.#u.width, y: this.#u.height }));
  }
  #d() {
    (this.#n.x = this.#e.position.x),
      (this.#n.y = this.#e.position.y),
      (this.#n.z = this.#e.position.z);
  }
  #m() {
    this.#s === H.Three
      ? ((this.#i.x = this.#e.quaternion.x),
        (this.#i.y = this.#e.quaternion.y),
        (this.#i.z = this.#e.quaternion.z),
        (this.#i.w = this.#e.quaternion.w))
      : this.#s === H.Cesium &&
        this.#i.fromCesiumMatrix4(this.#e.inverseViewMatrix),
      console.assert(this.#s != H.Invalid);
  }
  #p() {
    let t = [],
      e = this.#e;
    if (this.#s == H.Three) {
      e.updateMatrixWorld();
      let s = Math.tan((this.#c * Math.PI) / 180 / 2) * e.far,
        n = s * e.aspect,
        a = e.far;
      (t = [
        new i(n, s, -a),
        new i(-n, s, -a),
        new i(n, -s, -a),
        new i(-n, -s, -a),
      ]),
        t.forEach((t) => {
          t.applyMatrix4(e.matrixWorld);
        });
    } else if (this.#s == H.Cesium) {
      const { near: s, far: n, fov: a, aspectRatio: r, fovy: o } = e.frustum;
      let l = Math.tan(o / 2) * n,
        u = l * r;
      const c = new h().fromCesiumMatrix4(e.inverseViewMatrix);
      (t = [
        new i(u, l, -n),
        new i(-u, l, -n),
        new i(u, -l, -n),
        new i(-u, -l, -n),
      ]),
        t.forEach((t) => {
          t.applyMatrix4(c);
        });
    }
    return console.assert(0 != t.length), t;
  }
  getCameraData() {
    let t = this.#p();
    return (
      t.push(this.#n.clone()),
      {
        position: this.#n.clone(),
        rotation: this.#i.clone(),
        vertexes: t,
        fov: this.#c,
        renderSize: { x: this.#u.width, y: this.#u.height },
      }
    );
  }
  static getCameraData() {
    return Y.#t.getCameraData();
  }
  update(t) {
    this.#d(), this.#m();
    let e = this.#n,
      s = this.#i;
    (this.#l = !1),
      (e.equals(this.#a) && s.equals(this.#r)) ||
        ((this.#l = !0),
        (this.#a = this.#n.clone()),
        (this.#r = this.#i.clone())),
      this.#o != this.#c && ((this.#l = !0), (this.#o = this.#c)),
      (this.#h.x == this.#u.width && this.#h.y == this.#u.height) ||
        ((this.#l = !0),
        (this.#h.x = this.#u.width),
        (this.#h.y = this.#u.height));
  }
  dispose() {
    Y.#t = void 0;
  }
}
class $ {
  _program;
  _key;
  _dirty = !1;
  _pendingData;
  get id() {
    return this._key;
  }
  get isDirty() {
    return this._dirty;
  }
  bindProgram(t) {
    this._program = t;
  }
  reset() {
    (this._dirty = !1), (this._pendingData = null);
  }
  constructor(t) {
    this._key = t;
  }
}
class Q extends $ {
  #f;
  #x;
  #y;
  #g;
  #v;
  #_;
  dimension;
  isUseLib;
  constructor(t, e, s, n, i, a, r = !1) {
    super(t),
      (this.#x = e),
      (this.#y = s),
      (this.#g = n),
      (this.#v = i),
      (this.#_ = a),
      (this.isUseLib = r),
      (this.isTexture = !0),
      this.isUseLib ||
        ((this.#f = k.createTexture()),
        k.activeTexture(e),
        k.bindTexture(k.TEXTURE_2D, this.#f),
        k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_S, k.CLAMP_TO_EDGE),
        k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_T, k.CLAMP_TO_EDGE),
        k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MIN_FILTER, k.NEAREST),
        k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MAG_FILTER, k.NEAREST),
        k.bindTexture(k.TEXTURE_2D, null));
  }
  setData(t, e) {
    (this.dimension = t), (this._pendingData = e), (this._dirty = !0);
  }
  updateData() {
    this._dirty = !1;
    let t = k.getUniformLocation(this._program, this._key);
    k.uniform1i(t, this.#y),
      k.activeTexture(this.#x),
      k.bindTexture(k.TEXTURE_2D, this.#f),
      k.texImage2D(
        k.TEXTURE_2D,
        0,
        this.#g,
        this.dimension.x,
        this.dimension.y,
        0,
        this.#v,
        this.#_,
        this._pendingData
      );
  }
  getTargetTexture() {
    return this.#f;
  }
  dispose() {
    this.#f && k.deleteTexture(this.#f), (this.#f = void 0);
  }
}
class Z extends $ {
  #w;
  #D;
  constructor(t) {
    super(t);
  }
  setVertexData(t) {
    (this._pendingData = t), (this.#w = t.length), (this._dirty = !0);
  }
  updateData() {
    (this.#D = k.getUniformLocation(this._program, this._key)),
      this.#D < 0
        ? console.error(this._key, "error!!", this._pendingData, this.#D)
        : (1 == this.#w
            ? k.uniform1f(this.#D, this._pendingData[0])
            : 2 == this.#w
            ? k.uniform2f(this.#D, this._pendingData[0], this._pendingData[1])
            : 3 == this.#w &&
              k.uniform3f(
                this.#D,
                this._pendingData[0],
                this._pendingData[1],
                this._pendingData[2]
              ),
          (this._dirty = !1));
  }
  dispose() {}
}
class J {
  _param;
  _lib;
  _libType;
  _useSH;
  _pointsOnly;
  _transformData;
  _scaleData;
  _colorData;
  _shRawData;
  _meshId;
  _splatDimension;
  _isDisposed = !1;
  #C;
  #S;
  #b;
  #T = !1;
  #M = !1;
  #I;
  #E = !1;
  #R;
  #z;
  #P;
  #L;
  #V;
  #A;
  #B = new h();
  #j = new h();
  program;
  splatCount;
  isSorting = !1;
  get id() {
    return this._meshId;
  }
  get isLoaded() {
    return this.#M && this.#E && this.program && this.program.isLinked;
  }
  get indexes() {
    return this.#C;
  }
  get modelMatrix() {
    return this.#B;
  }
  set modelMatrix(t) {
    this.#B.copy(t), this.#j.copy(this.#B).invert();
  }
  static nextMeshId = 0;
  constructor(t, e, s, n, i, a = !1) {
    (this._lib = t),
      (this._libType = e),
      (this._meshId = J.nextMeshId++),
      (this.#L = i),
      (this.#A = a),
      (this.#z = new l()),
      (this._groups = new Map()),
      (this.#b = V(W)),
      this.#b.addEventListener("message", (t) => {
        this._onSorted(t);
      }),
      (this._useSH = !1),
      (this._useEnv = !0),
      (this._pointsOnly = !1),
      (this.splatCount = n),
      (this._splatDimension = this.#U(this.splatCount)),
      (this.#C = new Float32Array(n)),
      (this.#S = new Float32Array(n)),
      (this.#R = new Float32Array(
        this._splatDimension.x * this._splatDimension.y
      )),
      this.#z.push(
        new Q("transforms", k.TEXTURE5, 5, k.RGBA32F, k.RGBA, k.FLOAT, this.#A)
      ),
      this.#z.push(
        new Q("colors", k.TEXTURE1, 1, k.RGBA, k.RGBA, k.UNSIGNED_BYTE, this.#A)
      ),
      this.#z.push(
        new Q("scales", k.TEXTURE2, 2, k.RGBA32F, k.RGBA, k.FLOAT, this.#A)
      ),
      this.#z.push(
        new Q("splatIndexes", k.TEXTURE3, 3, k.R32F, k.RED, k.FLOAT, this.#A)
      ),
      this.#z.push(
        new Q(
          "shRawTexture",
          k.TEXTURE6,
          6,
          k.RGBA,
          k.RGBA,
          k.UNSIGNED_BYTE,
          this.#A
        )
      ),
      this.#z.push(new Z("compressedSHMin")),
      this.#z.push(new Z("compressedSHMax")),
      this.#z.push(new Z("cmrPos")),
      this.#z.push(new Z("useSH")),
      this.#z.push(new Z("pointsOnly")),
      this.#z.push(new Z("dimensions")),
      this.#z.push(new Z("viewport")),
      this.#z.push(new Z("focal")),
      this.#z.push(new Z("splatCount")),
      this.#z.push(new Z("envStartIdx")),
      this.#z.push(new Z("envEndIdx")),
      requestAnimationFrame(() => this.combineSplats(s, n));
  }
  setPointsOnlyEnabled(t) {
    this._pointsOnly !== t &&
      ((this._pointsOnly = t),
      this._pointsOnly
        ? this.#z.get("pointsOnly").setVertexData([1])
        : this.#z.get("pointsOnly").setVertexData([0]));
  }
  setSHEnabled(t) {
    this._useSH !== t &&
      ((this._useSH = t),
      this._useSH
        ? this.#z.get("useSH").setVertexData([1])
        : this.#z.get("useSH").setVertexData([0]));
  }
  setEnvEnabled(t) {
    if (this._useEnv === t) return;
    if (((this._useEnv = t), this._useEnv))
      return (
        this.#z.get("envStartIdx").setVertexData([0]),
        void this.#z.get("envEndIdx").setVertexData([0])
      );
    const e = this._groups.get(s);
    this.#z.get("envStartIdx").setVertexData([e?.start || 0]),
      this.#z.get("envEndIdx").setVertexData([e?.end || 0]);
  }
  tryResetSplats(t, e) {
    return (
      !this._isDisposed &&
      !this.isSorting &&
      !(!this.program || !this.program.isLinked) &&
      !this.#P &&
      ((this.splatCount = e),
      (this._splatDimension = this.#U(this.splatCount)),
      this.#C.length != e &&
        ((this.oldIndexes = this.#C),
        (this.#C = new Float32Array(e)),
        this.oldIndexes &&
          (this.#C.length >= this.oldIndexes
            ? this.#C.set(this.oldIndexes)
            : this.#C.set(this.oldIndexes.slice(0, this.#C.length))),
        (this.#S = new Float32Array(e)),
        (this.#R = new Float32Array(
          this._splatDimension.x * this._splatDimension.y
        ))),
      this.combineSplats(t, e),
      (this.#P = !0),
      (this.#T = !0),
      !0)
    );
  }
  #U(t) {
    let e = { x: 512, y: 512 };
    for (; e.x * e.y < t; ) e.y > e.x ? (e.x *= 2) : (e.y *= 2);
    return e;
  }
  _getShaderMagic() {
    return "#define mesh id:" + this._meshId;
  }
  _getVertexShader() {
    let t = c().vertexShaderSH;
    return (t = this._getShaderMagic() + t), t;
  }
  _getFragmentShader() {
    return (
      this._getShaderMagic() +
      (function () {
        const { gl_FragColor: t } = u.returnLibShaderConst();
        return {
          fragmentShader: `\n    precision highp float;\n   in vec4 vColor;\n   in vec2 vPosition;\n   in float vVisible;\n    void main () {\n\n        if (vVisible < 1.0) {\n            discard;\n        }\n        // compute the negative squared distance from the center of the splat to the\n        // current fragment in the splat's local space.\n        \n        float A = -dot(vPosition, vPosition);\n        if (A < -4.0) discard; \n        vec3 color = vColor.rgb;\n        A = exp(A) * vColor.a;\n\n        ${t} = vec4(color.rgb, A);\n    }`,
        };
      })().fragmentShader
    );
  }
  #H(t) {
    let e = !1;
    return (
      this.program &&
        this.program.isLinked &&
        (k.useProgram(this.program, "custom"), (e = !0)),
      t(),
      N && e && k.useProgram(N, "custom"),
      N
    );
  }
  #O() {
    let t = this.#L.meta.compressInfo.compressedSHMin,
      e = this.#L.meta.compressInfo.compressedSHMax;
    this.#z.get("compressedSHMin").setVertexData([t.x, t.y, t.z]),
      this.#z.get("compressedSHMax").setVertexData([e.x, e.y, e.z]),
      this._useSH
        ? this.#z.get("useSH").setVertexData([1])
        : this.#z.get("useSH").setVertexData([0]),
      this.#z
        .get("shRawTexture")
        .setData(
          {
            x: 2 * this._splatDimension.x * 2,
            y: 2 * this._splatDimension.y * 2,
          },
          new Uint8Array(this._shRawData.buffer)
        ),
      this._pointsOnly
        ? this.#z.get("pointsOnly").setVertexData([1])
        : this.#z.get("pointsOnly").setVertexData([0]);
    const n = this._groups.get(s);
    this._useEnv
      ? (this.#z.get("envStartIdx").setVertexData([0]),
        this.#z.get("envEndIdx").setVertexData([0]))
      : (this.#z.get("envStartIdx").setVertexData([n?.start || 0]),
        this.#z.get("envEndIdx").setVertexData([n?.end] || 0)),
      this.#z.get("splatCount").setVertexData([this.splatCount]),
      this.#z
        .get("dimensions")
        .setVertexData([this._splatDimension.x, this._splatDimension.y]),
      this.#z
        .get("transforms")
        .setData(this._splatDimension, this._transformData),
      this.#z.get("colors").setData(this._splatDimension, this._colorData),
      this.#z.get("scales").setData(this._splatDimension, this._scaleData),
      (this._colorData = void 0),
      (this._scaleData = void 0),
      (this._transformData = void 0),
      (this.#M = !0);
  }
  combineSplats(t, e) {
    let n = 0,
      i = 0,
      a = 0,
      r = 0,
      o = 0,
      h = this._splatDimension.x * this._splatDimension.y;
    (this._transformData = new Float32Array(4 * h)),
      (this._colorData = new Uint8Array(4 * h)),
      (this._scaleData = new Float32Array(4 * h)),
      (this.#I = new Float32Array(4 * h)),
      (this._shRawData = new Uint32Array(16 * h));
    for (let e = 0; e < t.length; e++) {
      const h = t[e],
        l = { start: 0, end: 0, key: "" };
      (l.start = i),
        (i += h.transforms.length / 4),
        (l.end = i),
        h.property === s && ((l.key = s), this._groups.set(l.key, l)),
        this._transformData.set(h.transforms, n),
        (n += h.transforms.length),
        this._scaleData.set(h.scales, a),
        (a += h.scales.length),
        this._colorData.set(h.colors, r),
        (r += h.colors.length),
        h.shRaw && this._shRawData.set(h.shRaw, o),
        (o += 16 * h.splatCount);
    }
    this.#I.set(this._transformData),
      this.#O(),
      this.updateCameraData(),
      (this.#T = !0);
  }
  _onSorted(t) {
    (this.#C = t.data.indexes),
      (this.#I = t.data.positions),
      (this.#S = t.data.distances),
      this.updateIndexes(this.#C),
      (this.isSorting = !1),
      (this.#E = !0),
      (this.#P = !1);
  }
  updateIndexes(t) {
    k
      ? t.length > 0 &&
        t.length <= this.#R.length &&
        (this.#R.set(t),
        this.#z.get("splatIndexes").setData(this._splatDimension, this.#R))
      : console.error("gl not ready");
  }
  onShaderWillAttach() {
    this.#z.forEach((t, e) => {
      e.bindProgram(this.program);
    }),
      this.updateCameraData();
  }
  onShaderAttached() {}
  onProgramWillLink() {}
  onProgramLinked() {}
  updateCameraData() {
    if (this.program) {
      let t = Y.getCameraData(),
        e = t.fov,
        s = [t.renderSize.x, t.renderSize.y],
        n = s[1];
      this._libType === O.Cesium && (n = Math.max(s[0], s[1]));
      let i = n / 2 / Math.tan((e / 2 / 180) * Math.PI);
      this.#z.get("viewport").setVertexData(s),
        this.#z.get("focal").setVertexData([i]),
        this.#z
          .get("cmrPos")
          .setVertexData([t.position.x, t.position.y, t.position.z]),
        (this.#T = !0);
    }
  }
  getGlBuffer(t) {
    return this.#z.get(t);
  }
  updateBuffers() {
    this.#z.forEach((t, e) => {
      e.isDirty && (F && F(e), (e._dirty = !1));
    });
  }
  update(t) {
    if (
      ((this.#V = t),
      !this._isDisposed &&
        (this.program &&
          this.program.isLinked &&
          !this.#P &&
          this.updateBuffers(),
        this.#T && !this.isSorting))
    ) {
      (this.#T = !1), (this.isSorting = !0);
      let t = Y.getCameraData(),
        e = {
          splatCount: this.splatCount,
          indexes: this.#C,
          distances: this.#S,
          positions: this.#I,
          cmrPos: t.position.clone().applyMatrix4(this.#j),
          meshId: this._meshId,
        };
      this.#b.postMessage(e, [this.#C.buffer, this.#S.buffer, this.#I.buffer]);
    }
  }
  dispose() {
    (this._isDisposed = !0),
      (this._transformData = null),
      (this._scaleData = null),
      (this._colorData = null),
      (this._shRawData = null),
      (this.#I = null),
      this.#b && this.#b.terminate(),
      this.#z.forEach((t, e) => {
        e.dispose();
      }),
      this.#z.clear(),
      (q[this.id] = void 0);
  }
}
class K extends J {
  #F;
  #k;
  #N;
  scene;
  #q = new h();
  #G = new h();
  #W;
  get object() {
    return this.#N;
  }
  get instanceCount() {
    return this.#F.instanceCount;
  }
  get matrixWorld() {
    return (
      this.#q.copy(this.#N.matrixWorld), this.#G.copy(this.#q).invert(), this.#q
    );
  }
  get matrixWorldInverse() {
    return (
      this.#q.copy(this.#N.matrixWorld), this.#G.copy(this.#q).invert(), this.#G
    );
  }
  set visible(t) {
    this.#N.visible = t;
  }
  get visible() {
    this.#N.visible = enabled;
  }
  constructor(t, e, s, n, i, a) {
    super(e, s, n, i, a, !0),
      this.#X(this._lib),
      this.#Y(),
      this.#$(),
      (this.#N = new this._lib.Mesh(this.#F, this.#k)),
      (this.#N.name = "mesh" + this._meshId),
      (this.#N.frustumCulled = !1),
      (this.scene = t),
      this.scene.add(this.#N),
      (F = (t) => {
        this.#Q(t);
      });
  }
  #X(t) {
    this.#W = {
      transforms: {
        owner: null,
        unit: 4,
        dataType: t.FloatType,
        dataFormat: t.RGBAFormat,
        isDirty: !1,
        buffer: null,
        unpackAlignment: 4,
      },
      colors: {
        owner: null,
        unit: 4,
        dataType: t.UnsignedByteType,
        dataFormat: t.RGBAFormat,
        isDirty: !1,
        buffer: null,
        unpackAlignment: 4,
      },
      scales: {
        owner: null,
        unit: 4,
        dataType: t.FloatType,
        dataFormat: t.RGBAFormat,
        isDirty: !1,
        buffer: null,
        unpackAlignment: 4,
      },
      splatIndexes: {
        owner: null,
        unit: 1,
        dataType: t.FloatType,
        dataFormat: t.RedFormat,
        isDirty: !1,
        buffer: null,
        unpackAlignment: 4,
      },
      shRawTexture: {
        owner: null,
        unit: 4,
        dataType: t.UnsignedByteType,
        dataFormat: t.RGBAFormat,
        isDirty: !1,
        buffer: null,
        unpackAlignment: 4,
      },
    };
  }
  #Q(t) {
    if (this.#W) {
      let e = this.#W[t._key];
      if (e) {
        let s = e.owner;
        const n = t._pendingData,
          i = t.dimension;
        let a = new this._lib.DataTexture(
          n,
          i.x,
          i.y,
          e.dataFormat,
          e.dataType
        );
        (a.flipY = !1),
          (a.unpackAlignment = e.unpackAlignment),
          (a.needsUpdate = !0),
          (this.#k.uniforms[t._key].value = a),
          (e.owner = a),
          s && (s.dispose(), (s = null));
      } else this.#k.uniforms[t._key].value = this.#Z(t._pendingData);
      (this.#k.uniformsNeedUpdate = !0), (this.#k.needsUpdate = !0);
    }
  }
  #Z(t) {
    const e = t.length;
    return 1 === e
      ? t[0]
      : 2 === e
      ? new this._lib.Vector2(t[0], t[1])
      : 3 === e
      ? new this._lib.Vector3(t[0], t[1], t[2])
      : void 0;
  }
  update(t) {
    if ((super.update(t), this.#F.instanceCount != this.splatCount)) {
      let t = Math.abs(this.#F.instanceCount - this.splatCount),
        e = Math.floor(t / 20) || t;
      this.#F.instanceCount < this.splatCount
        ? (this.#F.instanceCount = Math.min(
            this.splatCount,
            this.#F.instanceCount + e
          ))
        : (this.#F.instanceCount = this.splatCount);
    }
  }
  dispose() {
    if (
      (super.dispose(),
      this.scene && this.#N && this.scene.remove(this.#N),
      this.#W)
    ) {
      const t = Object.keys(this.#W);
      for (let e = 0; e < t.length; e++) {
        let s = this.#W[t[e]];
        s &&
          s.owner &&
          (s.owner.dispose(),
          (s.owner = null),
          (this.#k.uniforms[t[e]].value = null));
      }
    }
    this.#k && (this.#k.dispose(), (this.#k = null)),
      this.#F && this.#F.dispose(),
      (this.#k = void 0),
      (this.#F = void 0);
  }
  #Y() {
    let t = new this._lib.BufferGeometry(),
      e = new Float32Array(18),
      s = new this._lib.BufferAttribute(e, 3);
    t.setAttribute("position", s),
      s.setXYZ(2, -1, 1, 0),
      s.setXYZ(1, -1, -1, 0),
      s.setXYZ(0, 1, 1, 0),
      s.setXYZ(5, -1, -1, 0),
      s.setXYZ(4, 1, -1, 0),
      s.setXYZ(3, 1, 1, 0),
      (s.needsUpdate = !0),
      (this.#F = new this._lib.InstancedBufferGeometry().copy(t)),
      (this.#F.instanceCount = this.splatCount);
  }
  #$() {
    this.#k = new this._lib.ShaderMaterial({
      uniforms: {
        transforms: { value: null },
        scales: { value: null },
        colors: { value: null },
        splatIndexes: { value: null },
        shRawTexture: { value: null },
        dimensions: { value: new this._lib.Vector2(0, 0) },
        viewport: { value: new this._lib.Vector2(0, 0) },
        focal: { value: 0 },
        cmrPos: { value: new this._lib.Vector3(0, 0, 0) },
        splatCount: { value: 0 },
        pointsOnly: { value: !1 },
        useSH: { value: !0 },
        envStartIdx: { value: 0 },
        envEndIdx: { value: 0 },
        compressedSHMin: { value: new this._lib.Vector3(0, 0, 0) },
        compressedSHMax: { value: new this._lib.Vector3(0, 0, 0) },
      },
      vertexShader: this._getVertexShader(),
      fragmentShader: this._getFragmentShader(),
      transparent: !0,
      alphaTest: 1,
      blending: this._lib.NormalBlending,
      depthTest: !0,
      depthWrite: !1,
      side: this._lib.DoubleSide,
    });
  }
}
class tt extends J {
  #J;
  scene;
  #q = new h();
  #G = new h();
  #K;
  get object() {
    return this.#J;
  }
  get instanceCount() {
    return this.#J.instanceCount;
  }
  get matrixWorld() {
    return (
      this.#q.fromCesiumMatrix4(this.#J.modelMatrix),
      this.#G.copy(this.#q).invert(),
      this.#q
    );
  }
  get matrixWorldInverse() {
    return (
      this.#q.fromCesiumMatrix4(this.#J.modelMatrix),
      this.#G.copy(this.#q).invert(),
      this.#G
    );
  }
  constructor(t, e, s, n, a, r, o) {
    super(e, s, n, a, r, !0),
      (this.scene = t),
      (this.#K = r.meta?.boundingBox),
      (this.#J = new A(
        { instanceCount: this.splatCount, camera: t.camera },
        this._lib
      )),
      this.#J.createLccShader(
        this._getVertexShader(),
        this._getFragmentShader()
      ),
      (this.#J.name = "mesh" + this._meshId),
      this.scene.primitives.add(this.#J),
      (this.modelMatrix = new h().fromCesiumMatrix4(o)),
      this.#J.setModelMatrix(o),
      this.#J.setBoundingVolume(
        new i().setFromMatrixPosition(this.modelMatrix),
        this.#K
      ),
      (F = (t) => {
        this.updateTextureDatas(t);
      });
  }
  dispose() {
    super.dispose(),
      this.scene && this.#J && this.scene.primitives.remove(this.#J);
  }
  updateTextureDatas(t) {
    this.#J.isDestroyed() ||
      ("transforms" === t._key &&
        ((this.#J.uniformsTextures.transformTexture.isDirty = !1),
        (this.#J.uniformsTextures.transformTexture.buffer = t)),
      "colors" === t._key &&
        ((this.#J.uniformsTextures.colorsTexture.isDirty = !1),
        (this.#J.uniformsTextures.colorsTexture.buffer = t)),
      "scales" === t._key &&
        ((this.#J.uniformsTextures.scalesTexture.isDirty = !1),
        (this.#J.uniformsTextures.scalesTexture.buffer = t)),
      "splatIndexes" === t._key &&
        ((this.#J.uniformsTextures.splatIndexesTexture.isDirty = !1),
        (this.#J.uniformsTextures.splatIndexesTexture.buffer = t)),
      "shRawTexture" === t._key &&
        ((this.#J.uniformsTextures.shRawTexture.isDirty = !1),
        (this.#J.uniformsTextures.shRawTexture.buffer = t)));
  }
  updateTransformsData() {
    let t = this.getGlBuffer("dimensions"),
      e = this.getGlBuffer("compressedSHMin"),
      s = this.getGlBuffer("compressedSHMax"),
      n = this.getGlBuffer("cmrPos"),
      i = this.getGlBuffer("useSH"),
      a = this.getGlBuffer("pointsOnly");
    const r = this.getGlBuffer("envStartIdx"),
      o = this.getGlBuffer("envEndIdx");
    let h = this.getGlBuffer("viewport"),
      l = this.getGlBuffer("focal"),
      u = this.getGlBuffer("splatCount");
    this.#J &&
      k &&
      (t._pendingData &&
        (this.#J._uniforms.dimensions = function () {
          return { x: t._pendingData[0], y: t._pendingData[1] };
        }),
      s._pendingData &&
        (this.#J._uniforms.compressedSHMax = function () {
          return {
            x: s._pendingData[0],
            y: s._pendingData[1],
            z: s._pendingData[2],
          };
        }),
      e._pendingData &&
        (this.#J._uniforms.compressedSHMin = function () {
          return {
            x: e._pendingData[0],
            y: e._pendingData[1],
            z: e._pendingData[2],
          };
        }),
      n._pendingData &&
        (this.#J._uniforms.cmrPos = function () {
          return {
            x: n._pendingData[0],
            y: n._pendingData[1],
            z: n._pendingData[2],
          };
        }),
      i._pendingData &&
        (this.#J._uniforms.useSH = function () {
          return i._pendingData[0];
        }),
      a._pendingData &&
        (this.#J._uniforms.pointsOnly = function () {
          return a._pendingData[0];
        }),
      r._pendingData &&
        (this.#J._uniforms.envStartIdx = () => r._pendingData[0]),
      o._pendingData && (this.#J._uniforms.envEndIdx = () => o._pendingData[0]),
      h._pendingData &&
        (this.#J._uniforms.viewport = function () {
          return { x: h._pendingData[0], y: h._pendingData[1] };
        }),
      l._pendingData &&
        (this.#J._uniforms.focal = function () {
          return l._pendingData[0];
        }),
      u._pendingData &&
        (this.#J._uniforms.splatCount = function () {
          return u._pendingData[0];
        }));
  }
  update(t) {
    if (
      !this.#J.isDestroyed() &&
      (super.update(t),
      this.updateTransformsData(),
      this.#J.instanceCount != this.splatCount)
    ) {
      let t = Math.abs(this.#J.instanceCount - this.splatCount),
        e = Math.floor(t / 20) || t;
      this.#J.instanceCount < this.splatCount
        ? (this.#J.instanceCount = Math.min(
            this.splatCount,
            this.#J.instanceCount + e
          ))
        : (this.#J.instanceCount = this.splatCount);
    }
  }
}
class et {
  units;
  lccObjectId;
  constructor(t, e) {
    (this.units = e), (this.lccObjectId = t);
  }
}
class st {
  static unitId = 0;
  #tt = 32;
  #et = 64;
  #st;
  id;
  lodIndex;
  get points() {
    return this.#st.points;
  }
  get offset() {
    return this.#st.offset;
  }
  get size() {
    return this.#st.size;
  }
  get shOffset() {
    return (Number(this.offset) / this.#tt) * this.#et;
  }
  get shSize() {
    return (this.size / this.#tt) * this.#et;
  }
  constructor(t, e) {
    (this.id = st.unitId++), (this.#st = t), (this.lodIndex = e);
  }
}
class nt extends o {
  #nt;
  lodUnits = [];
  get #it() {
    return this.#nt.x;
  }
  get #at() {
    return this.#nt.y;
  }
  get x() {
    return this.#it;
  }
  get y() {
    return this.#at;
  }
  constructor(t, e, s) {
    super(e, s), (this.#nt = t);
    for (let e = 0; e < t.lods.length; e++) {
      0 != t.lods[e].size && (this.lodUnits[e] = new st(t.lods[e], e));
    }
  }
}
class it {
  #rt;
  id;
  get #ot() {
    return this.#rt.totalLevel;
  }
  get #ht() {
    return this.#rt.cellLengthX;
  }
  get #lt() {
    return this.#rt.cellLengthY;
  }
  get #ut() {
    return this.#rt.min;
  }
  get #ct() {
    return this.#rt.max;
  }
  get #dt() {
    return this.#rt.splats ? this.#rt.splats[0] : -1;
  }
  #mt = { x: 0, y: 0 };
  #pt = [];
  constructor(t) {
    this.id = t;
  }
  loadMeta(t) {
    this.#rt = t;
  }
  #ft(t) {
    (t.x > this.#mt.x || t.y > this.#mt.y) &&
      ((this.#mt.x = Math.max(t.x, this.#mt.x)),
      (this.#mt.y = Math.max(t.y, this.#mt.y))),
      this.#pt[t.x] || (this.#pt[t.x] = []);
    let e = this.#ut.clone();
    (e.x += t.x * this.#ht), (e.y += t.y * this.#lt);
    let s = e.clone();
    (s.x += this.#ht),
      (s.y += this.#lt),
      (s.z = this.#ct.z),
      (this.#pt[t.x][t.y] = new nt(t, e, s));
  }
  #xt(t, e) {
    return this.#pt[t] && this.#pt[t][e] ? this.#pt[t][e] : null;
  }
  #yt(t) {
    return Math.floor((t.x - this.#ut.x) / this.#ht);
  }
  #gt(t) {
    return Math.floor((t.y - this.#ut.y) / this.#lt);
  }
  getNodeFromPosition(t) {
    let e = this.#yt(t),
      s = this.#gt(t);
    return this.#xt(e, s);
  }
  #vt(t) {
    if (0 == this.#pt.length) return null;
    let e = { x: this.#mt.x, y: this.#mt.y },
      s = { x: 0, y: 0 },
      n = [];
    t.forEach((t) => {
      let n = this.#yt(t),
        i = this.#gt(t);
      (n = Math.max(0, Math.min(n, this.#mt.x))),
        (i = Math.max(0, Math.min(i, this.#mt.y))),
        n < e.x && (e.x = n),
        i < e.y && (e.y = i),
        n > s.x && (s.x = n),
        i > s.y && (s.y = i);
    }),
      (e.x -= 1),
      (e.y -= 1),
      (s.x += 1),
      (s.y += 1);
    for (let t = e.x; t <= s.x; t++)
      for (let i = e.y; i <= s.y; i++) {
        let e = this.#xt(t, i);
        e && n.push(e);
      }
    return n;
  }
  loadIndexes(t) {
    let e = 0,
      s = new DataView(t);
    for (; !(e > s.byteLength - 1); ) {
      let t = {};
      (t.x = s.getInt16(e, !0)),
        (e += 2),
        (t.y = s.getInt16(e, !0)),
        (e += 2),
        (t.lods = []);
      for (let n = 0; n < this.#ot; n++) {
        let n = s.getInt32(e, !0);
        e += 4;
        let i = s.getBigInt64(e, !0);
        e += 8;
        let a = s.getInt32(e, !0);
        (e += 4), t.lods.push({ points: n, offset: i, size: a });
      }
      this.#ft(t);
    }
  }
  getRenderUnits(t, e, s, n) {
    let i = [];
    if (0 == this.#pt.length) return i;
    let a = e.position.clone();
    n && (e.vertexes.forEach((t) => t.applyMatrix4(n)), a.applyMatrix4(n));
    let r = this.#vt(e.vertexes),
      o = s || 1e6,
      h = Math.max(this.#ht, this.#lt),
      l = [];
    for (let t = 0; t < r.length; t++) {
      let e = r[t];
      if (e.lodUnits && 0 != e.lodUnits.length)
        if (this.#dt > 0 && this.#dt < o) i.push(e.lodUnits[0]);
        else {
          let t = e.distanceToPoint(a),
            s = Math.round(t / h);
          s > e.lodUnits.length - 1 && (s = e.lodUnits.length - 1),
            e.lodUnits[s] && l.push({ lod: s, node: e, distance: t });
        }
    }
    l.sort((t, e) => t.distance - e.distance);
    let u = 0,
      c = 0;
    for (let t = 0; t < l.length; t++) {
      const { lod: e, node: s } = l[t];
      c = Math.max(c, e);
      const n = s.lodUnits[c];
      if (n)
        if (n.points + u < o) (u += n.points), i.push(n);
        else {
          const t = s.lodUnits.filter((t) => t.points + u < o);
          t.length && ((u += t[0].points), i.push(t[0]), (c = t[0].lodIndex));
        }
    }
    return i;
  }
}
class at {
  #_t = {};
  #wt;
  constructor() {
    (this.#_t.all = []),
      t.addEventListener(t.EventType.LCCObjectCreate, (t) => {
        this.#Dt(t);
      }),
      t.addEventListener(t.EventType.LCCObjectDestroy, (t) => {
        this.#Ct(t);
      }),
      t.addEventListener(t.EventType.MetaLoaded, (t) => {
        this.#St(t);
      }),
      t.addEventListener(t.EventType.IndexBinLoaded, (t) => {
        this.#bt(t.obj, t.buff);
      }),
      t.addEventListener(t.EventType.CameraDataChanged, (t) => {
        this.#Tt(t);
      });
  }
  #Dt(t) {
    if (this.#_t[t.id]) return;
    let e = new it(t.id);
    (this.#_t[t.id] = e), this.#_t.all.push(e);
  }
  #Ct(t) {
    if (!this.#_t[t.id]) return;
    this.#_t[t.id] = void 0;
    let e = [];
    for (let s = 0; s < this.#_t.all.length; s++)
      this.#_t.all[s] != t && e.push(this.#_t.all[s]);
    this.#_t.all = e;
  }
  #St(t) {
    if (!this.#_t[t.id]) return;
    this.#_t[t.id].loadMeta(t.meta);
  }
  #Mt(s, n) {
    let i = Mt.getLccGameObject(s.id),
      a = null;
    i.getMeshAdapter() && (a = i.getMeshAdapter().matrixWorldInverse);
    let r = s.getRenderUnits(e, n, i.maxLoadSplatCount, a),
      o = new et(s.id, r);
    i.loadViewData(o), t.dispatchEvent(t.EventType.OnViewDataCreated, o);
  }
  #bt(t, e) {
    if (!this.#_t[t.id]) return;
    let s = this.#_t[t.id];
    s.loadIndexes(e);
    let n = Y.getCameraData();
    this.#Mt(s, n);
  }
  #Tt(t) {
    this.#_t.all.forEach((e) => {
      this.#Mt(e, t);
    });
  }
  getGridNode(t, e) {
    if (!this.#_t[t.id]) return null;
    return this.#_t[t.id].getNodeFromPosition(e);
  }
  update() {}
}
class rt {
  static nextId = Math.round(1e3 * Math.random());
  id;
  meta;
  successCallback;
  loadingCallback;
  errorCallback;
  #It = 0;
  #Et = !1;
  #Rt;
  #zt = {
    useSH: !0,
    useEnv: !0,
    pointsOnly: !1,
    maxLoadSplatCount: 3e6,
    copy: (t) => {
      "boolean" == typeof t?.useSH && (this.#zt.useSH = t.useSH),
        "boolean" == typeof t?.useEnv && (this.#zt.useEnv = t.useEnv),
        "number" == typeof t?.maxLoadSplatCount &&
          (this.#zt.maxLoadSplatCount = t.maxLoadSplatCount);
    },
    clone: () => {
      const t = this.#zt.useSH,
        e = this.#zt.useEnv;
      return {
        maxLoadSplatCount: this.#zt.maxLoadSplatCount,
        useSH: t,
        useEnv: e,
      };
    },
  };
  #Pt;
  #Lt;
  #Vt;
  #At;
  #Bt = !1;
  #jt;
  #Ut;
  #Ht;
  #Ot = !1;
  #u;
  get dataPath() {
    return this.#Rt.dataPath;
  }
  get maxLoadSplatCount() {
    return this.#zt.maxLoadSplatCount;
  }
  set maxLoadSplatCount(t) {
    this.#zt.maxLoadSplatCount = t;
  }
  constructor(t, e, s, n) {
    (this.id = rt.nextId++),
      (this.successCallback = e),
      (this.loadingCallback = s),
      (this.errorCallback = n),
      (this.#Rt = t),
      (this.#u = t.canvas),
      (this.#zt.useSH = !(void 0 !== t.useSH && !t.useSH)),
      (this.#zt.useEnv = !(void 0 !== t.useEnv && !t.useEnv)),
      this.update();
  }
  get useEnv() {
    return this.#zt.useEnv;
  }
  hasEnvSplat() {
    const t = this.#Lt?.filter((t) => t.property === s);
    return Array.isArray(t) && t.length > 0;
  }
  useEnvironment(t) {
    (this.#zt.useEnv = t), this.#At?.setEnvEnabled(this.#zt.useEnv);
  }
  useShcoef(t) {
    (this.#zt.useSH = t), this.#At?.setSHEnabled(this.#zt.useSH);
  }
  togglePointsDisplayMode() {
    this.#At &&
      ((this.#zt.pointsOnly = !this.#zt.pointsOnly),
      this.#At.setPointsOnlyEnabled(this.#zt.pointsOnly));
  }
  getCurrentConfig() {
    return this.#zt.clone();
  }
  updateCurrentConfig(t) {
    this.#zt.copy(t);
  }
  loadViewData(t) {
    this.#Pt = t;
  }
  loadRenderSplats(t) {
    (this.#Lt = t.splats),
      (this.#Vt = t.splatCount),
      t.splatsChanged && (this.#Bt = !0);
  }
  getViewData() {
    return this.#Pt;
  }
  onCameraUpdate(t) {
    this.#At && this.#At.updateCameraData();
  }
  #Ft(t, e) {
    !this.isReady &&
      this.#It >= 0 &&
      this.#kt(this.loadingCallback) &&
      this.loadingCallback(e / this.#It),
      !this.isReady &&
        e >= 0.99 * this.#It &&
        (this.#kt(this.successCallback) && this.successCallback(t),
        (this.isReady = !0));
  }
  #kt(t) {
    return "function" == typeof t && t instanceof Function;
  }
  #Nt(t) {
    if (!this.#Et && this.#Pt && this.#Pt.units && this.#It <= 0) {
      let t = this.#Pt.units.length;
      this.#It = 0;
      for (let e = 0; e < t; e++) this.#It += this.#Pt.units[e].points;
    }
    this.#Bt &&
      (this.#At
        ? t % 30 == 0 &&
          this.#At.tryResetSplats(this.#Lt, this.#Vt) &&
          (this.#Bt = !1)
        : ((this.#At = X(this.#Rt, this.#Lt, this.#Vt, this)),
          this.#At.setPointsOnlyEnabled(this.#zt.pointsOnly),
          this.#At.setSHEnabled(this.#zt.useSH),
          this.#At.setEnvEnabled(this.#zt.useEnv),
          (this.#Bt = !1))),
      this.#At &&
        (this.#At.update(t),
        this.#At.object &&
          !this.#Et &&
          this.#Ft(this.#At.object, this.#At.instanceCount));
  }
  update(t) {
    this.#Ot || this.#Nt(t);
  }
  getInstancedMesh() {
    return this.#At.object;
  }
  getMeshAdapter() {
    return this.#At;
  }
  raycast(t) {
    return isNaN(t.maxDistance) || isNaN(t.radius)
      ? null
      : this.#qt(t.evt, t.maxDistance, t.radius, t.clipPosition);
  }
  #qt(t, e = 100, s = 0.01, n) {
    if (!t && !n) return null;
    let a = Mt.CameraSystem;
    if ((e || (e = 100), s || (s = 0.1), !this.#At)) return null;
    let r = n;
    if (!n) {
      let e, s;
      const n = t.x,
        a = t.y;
      if (this.#u) {
        const t = this.#u.getBoundingClientRect(),
          i = t.left,
          r = t.top;
        (e = (n - i) / t.width), (s = (a - r) / t.height);
      } else
        (e = n / window.innerWidth),
          (s = a / window.innerHeight),
          console.warn("没有传入canvas, 计算依据window窗口大小!");
      r = new i(2 * e - 1, 2 * -s + 1, 0.5);
    }
    const o = this.#At.matrixWorldInverse,
      h = this.#At.matrixWorld;
    let l = new i(r.x, r.y, 0).unproject(a).applyMatrix4(o),
      u = new i(r.x, r.y, 1).unproject(a).applyMatrix4(o).sub(l).normalize(),
      c = s,
      d = e * (1 / c),
      m = l.clone();
    for (let t = 0; t < d; t++) {
      m.add(u.clone().multiplyScalar(c));
      let t = Mt.LodSystem.getGridNode(this, m);
      if (!t) break;
      for (let e = 0; e < t.lodUnits.length; e++) {
        let n = t.lodUnits[e],
          i = Mt.SplatSystem.getSplats(this.id, n.id);
        if (i && i.numberQuery && i.numberQuery.getNumber(m, s) > 0)
          return m.applyMatrix4(h);
      }
    }
  }
  dispose() {
    (this.#Ot = !0), this.#At && (this.#At.dispose(), (this.#At = void 0));
  }
}
const ot = 0,
  ht = 1,
  lt = 2,
  ut = { 1: "meta.splat", 2: "meta.lcc" };
class ct {
  id;
  lccObject;
  unit;
  type;
  path;
  offset;
  size;
  data;
  static getId(t, e) {
    return (t << 1) | e;
  }
  constructor(t, e, s, n) {
    (this.id = ct.getId(s.id, n)),
      (this.lccObject = t),
      (this.unit = s),
      (this.type = n),
      this.type === ot
        ? ((this.path = e + "/data.bin"),
          (this.offset = s.offset),
          (this.size = s.size))
        : this.type === ht
        ? ((this.path = e + "/shcoef.bin"),
          (this.offset = s.shOffset),
          (this.size = s.shSize))
        : this.type === lt &&
          ((this.path = e + "/environment.bin"),
          (this.offset = void 0),
          (this.size = void 0));
  }
  requestData() {
    return new Promise((t, e) => {
      var s, n, i;
      ((s = this.path),
      (n = this.offset),
      (i = this.size),
      new Promise((t, e) => {
        let a = new Request(s + "?" + Math.random());
        if (
          ("bigint" == typeof n && (n = Number(n)),
          ("number" == typeof n || "bigint" == typeof n) &&
            "number" == typeof i)
        ) {
          let t = `bytes=${n}-${n + i - 1}`;
          a.headers.set("Range", t);
        }
        try {
          fetch(a)
            .then((s) => {
              try {
                s.arrayBuffer().then((e) => {
                  t(e);
                });
              } catch (t) {
                e(t);
              }
            })
            .catch(() => {
              e();
            });
        } catch (t) {
          e();
        }
      }))
        .then((e) => {
          (this.data = e), t();
        })
        .catch(() => {
          e();
        });
    });
  }
}
async function dt(t) {
  const e = (t, e, s) =>
      new Promise((n, i) => {
        (function (t, e, s) {
          return new Promise((n, i) => {
            let a = new Request(t + "?" + Math.random());
            if (
              ("bigint" == typeof e && (e = Number(e)),
              ("number" == typeof e || "bigint" == typeof e) &&
                "number" == typeof s)
            ) {
              let t = `bytes=${e}-${e + s - 1}`;
              a.headers.set("Range", t);
            }
            try {
              fetch(a)
                .then((t) => {
                  try {
                    t.arrayBuffer().then((t) => {
                      n(t);
                    });
                  } catch (t) {
                    i(t);
                  }
                })
                .catch(() => {
                  i();
                });
            } catch (t) {
              i();
            }
          });
        })(t, e, s)
          .then((t) => {
            n(t);
          })
          .catch(() => {
            i();
          });
      }),
    s = t.data,
    n = [];
  for (let t = 0; t < s.length; t++) {
    const { path: i, offset: a, size: r } = s[t],
      o = e(i, a, r);
    n.push(o);
  }
  const i = await (async (t) => await Promise.all(t))(n);
  i ? postMessage({ payloads: s, data: i }, i) : postMessage({ data: null });
}
class mt {
  #Gt = new l();
  #Wt = new l();
  #Xt = !1;
  #Yt = !1;
  constructor() {
    (this.URL = void 0),
      (this.dataPath = ""),
      t.addEventListener(t.EventType.LCCObjectCreate, (t) => {
        this.URL = new URL(t.dataPath);
        const e = [];
        this.URL.pathname.split("/").forEach((t) => {
          t.includes(".lcc") || t.includes(".splat") || e.push(t);
        }),
          (this.dataPath = `${this.URL.origin}${e.join("/")}`),
          this.#Dt(t);
      }),
      t.addEventListener(t.EventType.OnViewDataCreated, (t) => {
        this.#$t(t);
      }),
      (this.metaLoaded = !1);
  }
  #Dt(e) {
    const s = new URLSearchParams(this.URL.search).toString(),
      n = s
        ? `${this.URL.origin}${this.URL.pathname}?${s}`
        : `${this.URL.origin}${this.URL.pathname}`,
      i = (s) => {
        (e.meta = s),
          t.dispatchEvent(t.EventType.MetaLoaded, e),
          (this.metaLoaded = !0),
          this.#Qt(e).then((s) => {
            t.dispatchEvent(t.EventType.IndexBinLoaded, { obj: e, buff: s });
          }),
          this.#Zt(e);
      };
    this.#Jt(n)
      .then((t) => {
        i(t);
      })
      .catch((t) => {
        console.error(t),
          (this.metaLoaded = !1),
          this.#Jt(n, 1)
            .then((t) => {
              i(t);
            })
            .catch((t) => {
              throw ((this.metaLoaded = !1), new Error(t));
            });
      });
  }
  #Zt(t) {
    if (!Mt.SplatSystem.envSplatsCached(t.id, s, lt)) {
      const e = new ct(t, this.dataPath, {}, lt);
      e.requestData()
        .then(() => {
          Mt.SplatSystem.pushPayloadData(e);
        })
        .catch((t) => {
          console.error(`Fetch environment data error: ${t}`);
        });
    }
  }
  #$t(t) {
    if (!this.metaLoaded) return;
    let e = Mt.getLccGameObject(t.lccObjectId);
    for (let s = 0; s < t.units.length; s++) {
      let n = t.units[s],
        i = ct.getId(n.id, ot);
      if (
        !this.#Gt.contains(i) &&
        !Mt.SplatSystem.unitSplatsCached(e.id, n.id, ot)
      ) {
        const t = new ct(e, this.dataPath, n, ot);
        this.#Gt.push(t);
      }
      if (
        !Mt.SplatSystem.unitSplatsCached(e.id, n.id, ht) &&
        ((i = ct.getId(n.id, ht)), !this.#Wt.contains(i))
      ) {
        const t = new ct(e, this.dataPath, n, ht);
        this.#Wt.push(t);
      }
    }
    this.#Gt.length > 0 &&
      !this.#Yt &&
      (this.#Kt(this.#Gt, 400), this.#Kt(this.#Wt, 400));
  }
  #te() {
    this.#Xt = !0;
    let t = () => {
        this.#Gt.length > 0
          ? requestAnimationFrame(() => {
              this.#te();
            })
          : (this.#Xt = !1);
      },
      e = this.#Gt.deQueue();
    e.requestData()
      .then(() => {
        Mt.SplatSystem.pushPayloadData(e), t();
      })
      .catch(() => {
        this.#Gt.push(e), t();
      });
  }
  async #ee(t, e) {
    this.#Xt = !0;
    let s = () => {
      t.length > 0
        ? requestAnimationFrame(() => {
            this.#ee(t, e);
          })
        : (this.#Xt = !1);
    };
    const n = [],
      i = [];
    for (let s = 0; s < e; s++) {
      if (0 === t.length) continue;
      const e = this.#Gt.deQueue();
      e && (n.push(e), i.push(e.requestData()));
    }
    try {
      (await Promise.all(i)) &&
        (n.forEach((t) => {
          Mt.SplatSystem.pushPayloadData(t);
        }),
        s());
    } catch (t) {
      console.error(t), s();
    }
  }
  #Kt(t, e) {
    this.#Yt = !0;
    const s = () => {
        t.length > 0
          ? requestAnimationFrame(() => {
              this.#Kt(t, e);
            })
          : (this.#Yt = !1);
      },
      n = [];
    for (let s = 0; s < e; s++) {
      if (0 === t.length) continue;
      const e = t.all[s];
      e && n.push({ path: e.path, offset: e.offset, size: e.size, id: e.id });
    }
    if (0 === n.length) return;
    const i = V(dt);
    i.addEventListener("message", (e) => {
      const n = e.data.payloads,
        a = e.data.data;
      if (a) {
        if (n.length > 0) {
          for (let e = 0; e < n.length; e++) {
            const s = n[e].id,
              i = t.get(s);
            i &&
              ((i.data = a[e]), Mt.SplatSystem.pushPayloadData(i), t.remove(s));
          }
          s();
        }
        i.terminate();
      }
    }),
      i.postMessage(n);
  }
  #Qt(t) {
    if (this.metaLoaded)
      return new Promise((t) => {
        let e = this.dataPath + "/index.bin";
        fetch(new Request(e)).then(async (e) => {
          try {
            e.arrayBuffer().then((e) => {
              t(e);
            });
          } catch (t) {
            console.error(t);
          }
        });
      });
  }
  #Jt(t, e = 2) {
    return (
      t.includes(".lcc") || t.includes(".splat") || (t = `${t}/${ut[e]}`),
      new Promise((e, s) => {
        fetch(t).then(async (t) => {
          if (t.ok)
            try {
              const s = await t.text(),
                n = this.createNewMeta(s);
              e(n);
            } catch (t) {
              console.error(t);
            }
          else
            s(
              "Meta file fetch error, please ensure the path of meta file can access normally!"
            );
        });
      })
    );
  }
  createNewMeta(t) {
    t = t.replace(/,[\s\t\r\n]*}/g, "}");
    console.log("t++++",t)
    let e = JSON.parse(t);
    (e.min = new i(
      e.boundingBox.min[0],
      e.boundingBox.min[1],
      e.boundingBox.min[2]
    )),
      (e.max = new i(
        e.boundingBox.max[0],
        e.boundingBox.max[1],
        e.boundingBox.max[2]
      ));
    let s = {};
    e.attributes.forEach((t) => {
      s[t.name] = t;
    });
    let n = s.scale.min,
      a = s.scale.max,
      r = s.opacity.min,
      o = s.opacity.max,
      h = s.shcoef.min,
      l = s.shcoef.max;
    return (
      (e.compressInfo = {
        compressedScaleMin: new i(n[0], n[1], n[2]),
        compressedScaleMax: new i(a[0], a[1], a[2]),
        compressedSHMin: new i(h[0], h[1], h[2]),
        compressedSHMax: new i(l[0], l[1], l[2]),
        compressedOpacityMin: r[0],
        compressedOpacityMax: o[0],
      }),
      e
    );
  }
  update() {}
}
function pt(t) {
  const e = 0,
    s = 1,
    n = 2,
    i = (t, e, s) => (1 - s) * t + s * e,
    a = (t, e, s, n) => {
      let i = Math.round(t * n.precision),
        a = Math.round(e * n.precision),
        r = Math.round(s * n.precision);
      n[i] || (n[i] = {}),
        n[i][a] || (n[i][a] = {}),
        isNaN(n[i][a][r]) && (n[i][a][r] = 0),
        (n[i][a][r] += 1);
    },
    r = (e, s, n = !1) => {
      const r = e.byteLength / s,
        o = new Float32Array(4 * r),
        h = new Uint8Array(4 * r),
        l = new Float32Array(4 * r),
        u = new Uint32Array(16 * r),
        c = { precision: 10 },
        d = t.data.compressInfo.compressedScaleMin,
        m = t.data.compressInfo.compressedScaleMax;
      for (let t = 0; t < r; t++) {
        const r = t * s + 12,
          p = e.getUint8(r, !0),
          f = e.getUint8(r + 1, !0),
          x = e.getUint8(r + 2, !0),
          y = e.getUint8(r + 3, !0),
          g = e.getFloat32(t * s, !0),
          v = e.getFloat32(t * s + 4, !0),
          _ = e.getFloat32(t * s + 8, !0),
          w = e.getUint32(t * s + 22, !0),
          D = t * s + 16;
        let C = e.getUint16(D, !0),
          S = e.getUint16(D + 2, !0),
          b = e.getUint16(D + 4, !0);
        if (
          ((C = i(d.x, m.x, C / 65535)),
          (S = i(d.y, m.y, S / 65535)),
          (b = i(d.z, m.z, b / 65535)),
          a(g, v, _, c),
          o.set([g, v, _, w], 4 * t),
          h.set([p, f, x, y], 4 * t),
          l.set([C, S, b, 0], 4 * t),
          n)
        ) {
          const n = [],
            i = t * s + 32;
          for (let t = 0; t < 15; t++) n[t] = e.getUint32(i + 4 * t, !0);
          (n[15] = 0), u.set(n, 16 * t);
        }
      }
      return n
        ? {
            transforms: o,
            colors: h,
            scales: l,
            shRaw: u,
            splatCount: r,
            splatNumberQuery: c,
          }
        : {
            transforms: o,
            colors: h,
            scales: l,
            splatCount: r,
            splatNumberQuery: c,
          };
    };
  if (t.data.type == e) {
    const e = new DataView(t.data.data),
      s = 32,
      {
        transforms: n,
        colors: i,
        scales: a,
        splatCount: o,
        splatNumberQuery: h,
      } = r(e, s);
    postMessage(
      {
        id: t.data.id,
        type: t.data.type,
        transforms: n,
        colors: i,
        scales: a,
        splatCount: o,
        splatNumberQuery: h,
      },
      [n.buffer, i.buffer, a.buffer]
    );
  }
  if (t.data.type == s) {
    let e = new DataView(t.data.data),
      s = 64,
      n = e.byteLength / s,
      i = new Uint32Array(16 * n),
      a = [];
    for (let t = 0; t < n; t++) {
      let n = t * s;
      for (let t = 0; t < 15; t++) a[t] = e.getUint32(n + 4 * t, !0);
      (a[15] = 0), i.set(a, 16 * t);
    }
    postMessage({ id: t.data.id, type: t.data.type, shRaw: i, splatCount: n }, [
      i.buffer,
    ]);
  }
  if (t.data.type == n) {
    const e = new DataView(t.data.data),
      s = 96,
      {
        transforms: n,
        scales: i,
        colors: a,
        splatCount: o,
        splatNumberQuery: h,
        shRaw: l,
      } = r(e, s, !0);
    postMessage(
      {
        id: t.data.id,
        type: t.data.type,
        transforms: n,
        colors: a,
        scales: i,
        shRaw: l,
        splatCount: o,
        splatNumberQuery: h,
        property: "env",
      },
      [n.buffer, a.buffer, i.buffer, l.buffer]
    );
  }
}
class ft {
  #se = 10;
  constructor(t) {
    this.query = t;
  }
  getNumber(t, e = 0.1) {
    let s = Math.round(t.x * this.#se),
      n = Math.round(t.y * this.#se),
      i = Math.round(t.z * this.#se),
      a = Math.round(e * this.#se),
      r = 0;
    for (let t = s - a; t <= s + a; t++)
      if (this.query[t])
        for (let e = n - a; e <= n + a; e++)
          if (this.query[t][e])
            for (let s = i - a; s <= i + a; s++) {
              let n = this.query[t][e][s];
              isNaN(n) || (r += n);
            }
    return r;
  }
  clear() {
    this.query = {};
  }
}
class xt {
  transforms = null;
  colors = null;
  scales = null;
  shRaw = null;
  splatCount = 0;
  numberQuery;
  constructor() {}
  link(t) {
    (this.transforms = t.transforms),
      (this.colors = t.colors),
      (this.scales = t.scales),
      (this.shRaw = t.shRaw),
      (this.splatCount = t.splatCount),
      (this.numberQuery = t.numberQuery);
  }
}
class yt {
  #ne = {};
  #ie = {};
  #ae = new l();
  constructor() {
    t.addEventListener(t.EventType.LCCObjectDestroy, (t) => {
      this.#Ct(t);
    }),
      t.addEventListener(t.EventType.OnViewDataCreated, (t) => {
        this.#$t(t);
      });
  }
  pushPayloadData(t) {
    this.#re(t);
  }
  getSplats(t, e) {
    return this.#ne[t] && this.#ne[t][e]
      ? this.#ne[t][e]
      : n[t] && n[t][e]
      ? n[t][e]
      : null;
  }
  unitSplatsCached(t, e, s) {
    if (!this.#ne[t] || !this.#ne[t][e]) return !1;
    let n = this.#ne[t][e];
    return s === ot || !(s !== ht || !n.shRaw);
  }
  envSplatsCached(t, e, s) {
    if (!n[t] || !n[t][e]) return !1;
    const i = n[t][e];
    return !(s !== lt || !i.transforms || !i.shRaw);
  }
  update(t) {}
  #oe(t, e) {
    if (!this.#ie[t]) return !0;
    let s = this.#ie[t];
    if (s.length != e.length) return !0;
    for (let t = 0; t < s.length; t++) if (s[t] != e[t]) return !0;
    return !1;
  }
  #he() {
    this.#ae.forEach((t) => {
      let e = Mt.getLccGameObject(t),
        i = e.getViewData();
      if (!i) return;
      if (!this.#ne[e.id]) return;
      let a = i.units,
        r = [],
        o = e.getCurrentConfig(),
        h = 0;
      for (let t = 0; t < a.length; t++) {
        let s = a[t];
        if (!this.#ne[e.id][s.id]) continue;
        let n = this.#ne[e.id][s.id];
        null == n ||
          null == n.transforms ||
          (o.useSH && null == n.shRaw) ||
          (r.push(n), (h += n.splatCount));
      }
      const l = n[e.id] ? n[e.id][s] : null;
      if ((l && (r.push(l), (h += l.splatCount)), r.length > 0)) {
        let t = this.#oe(e.id, r);
        (this.#ie[e.id] = r),
          e.loadRenderSplats({ splats: r, splatsChanged: t, splatCount: h });
      }
    }),
      this.#ae.clear();
  }
  #le(t) {
    0 == this.#ae.length &&
      requestAnimationFrame(() => {
        this.#he();
      }),
      this.#ae.push({ id: t });
  }
  #$t(t) {
    this.#le(t.lccObjectId);
  }
  #Ct(t) {
    (this.#ne[t.id] = void 0), (n[t.id] = void 0), (this.#ie[t.id] = void 0);
  }
  #re(t) {
    const e = V(pt);
    e.addEventListener("message", (i) => {
      const a = new xt(),
        r = t.lccObject.id,
        o = i.data.type === lt ? n : this.#ne,
        h = i.data.type === lt ? s : t.unit.id;
      if (o[r] && o[r][h]) {
        const t = o[r][h];
        a.link(t);
      }
      switch ((o[r] || (o[r] = {}), (o[r][h] = a), i.data.type)) {
        case lt:
          (a.transforms = i.data.transforms),
            (a.transforms = i.data.transforms),
            (a.colors = i.data.colors),
            (a.scales = i.data.scales),
            (a.shRaw = i.data.shRaw),
            (a.numberQuery = new ft(i.data.splatNumberQuery)),
            (a.property = i.data.property);
          break;
        case ot:
          (a.transforms = i.data.transforms),
            (a.colors = i.data.colors),
            (a.scales = i.data.scales),
            (a.numberQuery = new ft(i.data.splatNumberQuery));
          break;
        case ht:
          a.shRaw = i.data.shRaw;
          break;
        default:
          console.error(`Error data type: ${i.data.type}`);
      }
      (a.splatCount = i.data.splatCount),
        e.terminate(),
        (window.cachedSplats = { main: this.#ne, env: n }),
        this.#le(t.lccObject.id);
    }),
      e.postMessage(
        {
          id: t.id,
          type: t.type,
          data: t.data,
          compressInfo: t.lccObject.meta.compressInfo,
        },
        [t.data]
      );
  }
}
let gt,
  vt = new l(),
  _t = !1,
  wt = 0,
  Dt = null,
  Ct = null,
  St = null,
  bt = null;
let Tt = function (e) {
    if (
      ((_t = !0),
      (function (t) {
        Dt || (Dt = new at()),
          Ct || (Ct = new mt()),
          !St && t.camera && (St = new Y(t)),
          bt || (bt = new yt());
      })(e),
      Dt.update(wt),
      Ct.update(wt),
      St.update(wt),
      bt.update(wt),
      St.isCameraDataChanged)
    ) {
      let e = St.getCameraData();
      vt.forEach((t, s) => {
        s.onCameraUpdate(e);
      }),
        t.dispatchEvent(t.EventType.CameraDataChanged, e);
    }
    vt.forEach((t, e) => {
      e.update(wt);
    }),
      wt++,
      (gt = requestAnimationFrame(() => {
        Tt();
      }));
  },
  Mt = {
    load: function (e, s, n, i) {
      if (!e || !e.dataPath) return null;
      if (!e.scene) return console.error("加载参数里面，必须传入场景!"), null;
      if (!e.camera)
        return console.error("加载参数里面，必须传入摄像机!"), null;
      if (!e.canvas) return console.error("加载参数里面，必须传入画布!"), null;
      if (!e.renderLib)
        return console.error("加载参数里面，必须传入引擎库!"), null;
      _t || Tt(e);
      let a = new rt(e, s, n, i);
      return vt.push(a), t.dispatchEvent(t.EventType.LCCObjectCreate, a), a;
    },
    unLoad: function (e) {
      gt && cancelAnimationFrame(gt),
        t.dispatchEvent(t.EventType.LCCObjectDestroy, e),
        (vt[e.id] = void 0),
        e.dispose(),
        (_t = !1),
        (wt = 0),
        (Dt = null),
        (Ct = null),
        St.dispose(),
        (St = null),
        (bt = null);
    },
    getLccGameObject: function (t) {
      return vt.get(t);
    },
    get SplatSystem() {
      return bt;
    },
    get CameraSystem() {
      return St;
    },
    get LodSystem() {
      return Dt;
    },
  };
export { Mt as LCCRender };
