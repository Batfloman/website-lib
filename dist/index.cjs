"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ts/index.ts
var index_exports = {};
__export(index_exports, {
  Camera: () => Camera,
  Canvas: () => Canvas,
  CanvasCamera: () => CanvasCamera,
  CanvasRenderer: () => CanvasRenderer,
  Circle: () => Circle,
  Collision: () => Collision,
  Color: () => Color,
  ControllableObject: () => ControllableObject,
  GameLoop: () => GameLoop,
  GameManager: () => GameManager,
  GameObject: () => GameObject,
  HitBox: () => HitBox,
  Input: () => Input,
  Matrix2: () => Matrix2,
  Polygon2: () => Polygon2,
  RealTimeManager: () => RealTimeManager,
  Rectangle: () => Rectangle,
  Renderer: () => Renderer,
  SAT: () => SAT,
  Scene: () => Scene,
  SceneObject: () => SceneObject,
  Thread: () => Thread,
  Triangle: () => Triangle,
  Triangulation: () => Triangulation,
  TurnBasedManager: () => TurnBasedManager,
  TwoKeyMap: () => TwoKeyMap,
  Util: () => Util10,
  Vector2: () => Vector2,
  Zoom: () => Zoom,
  math: () => math,
  vector: () => vector
});
module.exports = __toCommonJS(index_exports);

// ts/dataStructs/TwoKeyMap.ts
var TwoKeyMap = class {
  map;
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  get(key, key2) {
    const firstMapContent = this.map.get(key);
    const nestedMapContent = firstMapContent?.get(key2);
    if (!firstMapContent || !nestedMapContent) return;
    return nestedMapContent;
  }
  set(key, key2, value) {
    const nestedMap = this.map.get(key);
    if (!nestedMap) this.map.set(key, /* @__PURE__ */ new Map([[key2, value]]));
    else nestedMap.set(key2, value);
  }
  clear() {
    this.map.clear();
  }
  delete(key, key2) {
    const nestedMap = this.map.get(key);
    if (!nestedMap) return;
    else nestedMap.delete(key2);
  }
};

// ts/engine/core/GameLoop.ts
var GameLoop = class {
  constructor(game) {
    this.game = game;
  }
  lastTickTime = Date.now();
  isStopped = false;
  start() {
    this.isStopped = false;
    this.loop();
  }
  stop() {
    this.isStopped = true;
  }
  loop = () => {
    const now = Date.now();
    const deltaTime = (now - this.lastTickTime) / 1e3;
    this.lastTickTime = now;
    this.game.update(deltaTime);
    if (!this.isStopped) {
      window.requestAnimationFrame(this.loop);
    }
  };
};

// ts/engine/managers/Scene.ts
var Scene = class {
  objects = /* @__PURE__ */ new Set();
  // public readonly cameras: 
  // public readonly camera: Camera;
  addObject(obj) {
    this.objects.add(obj);
  }
  update(dt) {
    for (const obj of this.objects) obj.update(dt);
  }
  render(renderer) {
    for (const obj of this.objects) obj.render(renderer);
  }
};

// ts/engine/core/GameManager.ts
var GameManager = class {
  gameLoop;
  scene;
  constructor() {
    this.gameLoop = new GameLoop(this);
    this.scene = new Scene();
  }
};

// ts/engine/core/RealTimeManager.ts
var RealTimeManager = class extends GameManager {
  update(deltaTime) {
    console.log(deltaTime);
  }
};

// ts/engine/core/TurnBasedManager.ts
var TurnBasedManager = class extends GameManager {
  update(deltaTime) {
    console.log(deltaTime);
  }
};

// ts/engine/display/Color.ts
var import_util = require("util");
var Color = class _Color {
  static none = new _Color(0, 0, 0, 0);
  r = 0;
  g = 0;
  b = 0;
  a = 100;
  constructor(r, g, b, a = 100) {
    this.r = r - 1 % 255 + 1;
    this.g = g - 1 % 255 + 1;
    this.b = b - 1 % 255 + 1;
    this.a = a - 1 % 100 + 1;
  }
  /**
   * @returns {String} - a String "rgb(r, g, bm a)" with r/g/b/a values for rendering
   */
  getRGBString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a / 100})`;
  }
  setR(r) {
    this.r = (r - 1) % 255 + 1;
  }
  setG(g) {
    this.g = (g - 1) % 255 + 1;
  }
  setB(b) {
    this.b = (b - 1) % 255 + 1;
  }
  setA(a) {
    this.a = (a - 1) % 100 + 1;
  }
  // ==========================================================================================
  // #region static
  static getRandom() {
    return new _Color(
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256)
    );
  }
  static getRandomNamedColor() {
    return import_util.Util.array.getRandomItem(Array.from(colors.values()));
  }
  static get(color) {
    if (!colors.has(color)) {
      console.warn(`${color} is not declared!`);
      return _Color.none;
    }
    let c = colors.get(color);
    if (c == void 0) return _Color.none;
    return c;
  }
  //#endregion
};
var colors = /* @__PURE__ */ new Map([
  ["aliceblue", new Color(240, 248, 255)],
  ["antiquewhite", new Color(250, 235, 215)],
  ["aqua", new Color(0, 255, 255)],
  ["aquamarine", new Color(127, 255, 212)],
  ["azure", new Color(240, 255, 255)],
  ["beige", new Color(245, 245, 220)],
  ["bisque", new Color(255, 228, 196)],
  ["black", new Color(0, 0, 0)],
  ["blanchedalmond", new Color(255, 235, 205)],
  ["blue", new Color(0, 0, 255)],
  ["blueviolet", new Color(138, 43, 226)],
  ["brown", new Color(165, 42, 42)],
  ["burlywood", new Color(222, 184, 135)],
  ["cadetblue", new Color(95, 158, 160)],
  ["chartreuse", new Color(127, 255, 0)],
  ["chocolate", new Color(210, 105, 30)],
  ["coral", new Color(255, 127, 80)],
  ["cornflowerblue", new Color(100, 149, 237)],
  ["cornsilk", new Color(255, 248, 220)],
  ["crimson", new Color(220, 20, 60)],
  ["cyan", new Color(0, 255, 255)],
  ["darkblue", new Color(0, 0, 139)],
  ["darkcyan", new Color(0, 139, 139)],
  ["darkgoldenrod", new Color(184, 134, 11)],
  ["darkgray", new Color(169, 169, 169)],
  ["darkgreen", new Color(0, 100, 0)],
  ["darkkhaki", new Color(189, 183, 107)],
  ["darkmagenta", new Color(139, 0, 139)],
  ["darkolivegreen", new Color(85, 107, 47)],
  ["darkorange", new Color(255, 140, 0)],
  ["darkorchid", new Color(153, 50, 204)],
  ["darkred", new Color(139, 0, 0)],
  ["darksalmon", new Color(233, 150, 122)],
  ["darkseagreen", new Color(143, 188, 143)],
  ["darkslateblue", new Color(72, 61, 139)],
  ["darkslategray", new Color(47, 79, 79)],
  ["darkturquoise", new Color(0, 206, 209)],
  ["darkviolet", new Color(148, 0, 211)],
  ["deeppink", new Color(255, 20, 14)],
  ["deepskyblue", new Color(0, 191, 255)],
  ["dimgray", new Color(105, 105, 105)],
  ["dodgerblue", new Color(30, 144, 255)],
  ["firebrick", new Color(178, 34, 34)],
  ["floralwhite", new Color(255, 250, 240)],
  ["forestgreen", new Color(34, 139, 34)],
  ["fuchsia", new Color(255, 0, 255)],
  ["gainsboro", new Color(220, 220, 220)],
  ["ghostwhite", new Color(248, 248, 255)],
  ["gold", new Color(255, 215, 0)],
  ["goldenrod", new Color(218, 165, 32)],
  ["gray", new Color(128, 128, 128)],
  ["green", new Color(0, 128, 0)],
  ["greenyellow", new Color(173, 255, 47)],
  ["honeydew", new Color(240, 255, 240)],
  ["hotpink", new Color(255, 105, 180)],
  ["indianred", new Color(205, 92, 92)],
  ["indigo", new Color(75, 0, 130)],
  ["ivory", new Color(255, 255, 240)],
  ["khaki", new Color(240, 230, 140)],
  ["lavender", new Color(230, 230, 250)],
  ["lavenderblush", new Color(255, 240, 245)],
  ["lawngreen", new Color(124, 252, 0)],
  ["lemonchiffon", new Color(255, 250, 205)],
  ["lightblue", new Color(173, 216, 230)],
  ["lightcoral", new Color(240, 128, 128)],
  ["lightcyan", new Color(224, 255, 255)],
  ["lightgoldenrodyellow", new Color(250, 250, 210)],
  ["lightgray", new Color(211, 211, 211)],
  ["lightgreen", new Color(144, 238, 144)],
  ["lightpink", new Color(255, 182, 193)],
  ["lightsalmon", new Color(255, 160, 122)],
  ["lightseagreen", new Color(32, 178, 170)],
  ["lightskyblue", new Color(135, 206, 250)],
  ["lightslategray", new Color(119, 136, 153)],
  ["lightsteelblue", new Color(176, 196, 222)],
  ["lightyellow", new Color(255, 255, 224)],
  ["lime", new Color(0, 255, 0)],
  ["limegreen", new Color(50, 205, 50)],
  ["linen", new Color(250, 240, 230)],
  ["magenta", new Color(255, 0, 255)],
  ["maroon", new Color(128, 0, 0)],
  ["mediumaquamarine", new Color(102, 205, 170)],
  ["mediumblue", new Color(0, 0, 205)],
  ["mediumorchid", new Color(186, 85, 211)],
  ["mediumpurple", new Color(147, 112, 219)],
  ["mediumseagreen", new Color(60, 179, 113)],
  ["mediumslateblue", new Color(123, 104, 238)],
  ["mediumspringgreen", new Color(0, 250, 154)],
  ["mediumturquoise", new Color(72, 209, 204)],
  ["mediumvioletred", new Color(199, 21, 133)],
  ["midnightblue", new Color(25, 25, 112)],
  ["mintcream", new Color(245, 255, 250)],
  ["mistyrose", new Color(255, 228, 225)],
  ["moccasin", new Color(255, 228, 181)],
  ["navajowhite", new Color(255, 222, 173)],
  ["navy", new Color(0, 0, 128)],
  ["oldlace", new Color(253, 245, 230)],
  ["olive", new Color(128, 128, 0)],
  ["olivedrab", new Color(107, 142, 35)],
  ["orange", new Color(255, 165, 0)],
  ["orangered", new Color(255, 69, 0)],
  ["orchid", new Color(218, 112, 214)],
  ["palegoldenrod", new Color(238, 232, 170)],
  ["palegreen", new Color(152, 251, 152)],
  ["paleturquoise", new Color(175, 238, 238)],
  ["palevioletred", new Color(219, 112, 147)],
  ["papayawhip", new Color(255, 239, 213)],
  ["peachpuff", new Color(255, 218, 185)],
  ["peru", new Color(205, 133, 63)],
  ["pink", new Color(255, 192, 203)],
  ["plum", new Color(221, 160, 221)],
  ["powderblue", new Color(176, 224, 230)],
  ["purple", new Color(128, 0, 128)],
  ["red", new Color(255, 0, 0)],
  ["rosybrown", new Color(188, 143, 143)],
  ["royalblue", new Color(65, 105, 225)],
  ["saddlebrown", new Color(139, 69, 19)],
  ["salmon", new Color(250, 128, 114)],
  ["sandybrown", new Color(244, 164, 96)],
  ["seagreen", new Color(46, 139, 87)],
  ["seashell", new Color(255, 245, 238)],
  ["sienna", new Color(160, 82, 45)],
  ["silver", new Color(192, 192, 192)],
  ["skyblue", new Color(135, 206, 235)],
  ["slateblue", new Color(106, 90, 205)],
  ["slategray", new Color(112, 128, 144)],
  ["snow", new Color(255, 250, 250)],
  ["springgreen", new Color(0, 255, 127)],
  ["steelblue", new Color(70, 130, 180)],
  ["tan", new Color(210, 180, 140)],
  ["teal", new Color(0, 128, 128)],
  ["thistle", new Color(216, 191, 216)],
  ["tomato", new Color(255, 99, 71)],
  ["turquoise", new Color(64, 224, 208)],
  ["violet", new Color(238, 130, 238)],
  ["wheat", new Color(245, 222, 179)],
  ["white", new Color(255, 255, 255)],
  ["whitesmoke", new Color(245, 245, 245)],
  ["yellow", new Color(255, 255, 0)],
  ["yellowgreen", new Color(154, 205, 50)]
]);

// ts/engine/display/Renderer.ts
var Renderer = class {
  static defaultArgs = {
    color: Color.get("black"),
    rotation: 0
  };
};

// ts/math/Matrix.ts
var import_util2 = require("util");
var Matrix2 = class {
  cells;
  xSize;
  ySize;
  constructor(x, y) {
    this.cells = [];
    this.xSize = x;
    this.ySize = y;
    for (let i = 0; i < y; i++) {
      let arr = [];
      for (let j = 0; j < x; j++) {
        arr.push("[]");
      }
      this.cells.push(arr);
    }
  }
  isCellEmpty(x, y) {
    return this.get(x, y) === "[]";
  }
  clearCell(x, y) {
    this.set(x, y, "[]");
  }
  get(x, y) {
    const yIndex = this.ySize - y - 1;
    const xarr = import_util2.Util.array.getItemCyclic(this.cells, yIndex);
    return import_util2.Util.array.getItemCyclic(xarr, x);
  }
  set(x, y, content) {
    if (x < 0 || x >= this.getSizeX()) {
      console.warn(`${x} is out of Bounds!`);
      return;
    }
    if (y < 0 || y >= this.getSizeY()) {
      console.warn(`${y} is out of Bounds!`);
      return;
    }
    const yIndex = this.ySize - y - 1;
    this.cells[yIndex][x] = content;
  }
  getSizeX() {
    return this.xSize;
  }
  getSizeY() {
    return this.ySize;
  }
};

// ts/math/Vector2.ts
var import_util3 = require("util");
var Vector2 = class _Vector2 {
  x;
  y;
  constructor(x, y) {
    this.x = !x ? 0 : x;
    this.y = !y ? 0 : y;
  }
  add(vec2) {
    return new _Vector2(this.x + vec2.x, this.y + vec2.y);
  }
  subtract(vec2) {
    return new _Vector2(this.x - vec2.x, this.y - vec2.y);
  }
  scale(scalar) {
    return new _Vector2(this.x * scalar, this.y * scalar);
  }
  dotProduct(vec2) {
    return this.x * vec2.x + this.y * vec2.y;
  }
  crossProduct(vec2) {
    return this.x * vec2.y - vec2.x * this.y;
  }
  vectorTo(point) {
    return new _Vector2(Math.round(point.x - this.x), Math.round(point.y - this.y));
  }
  getNormal() {
    return new _Vector2(-this.y, this.x);
  }
  getMagnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  angle(vec2) {
    const angleBetween = import_util3.Util.math.trigonometry.arccos(
      this.dotProduct(vec2) / (this.getMagnitude() * vec2.getMagnitude())
    );
    if (isNaN(angleBetween)) return 0;
    return vec2.crossProduct(this) >= 0 ? angleBetween : -angleBetween;
  }
  // ==================================================
  // static 
  static add(vec1, vec2) {
    return new _Vector2(vec1.x + vec2.x, vec1.y + vec2.y);
  }
  static moveInDirectionFromPoint(start, direction, distance) {
    direction = import_util3.Util.math.convert.DegToRad(direction);
    const dx = Math.cos(direction) * distance;
    const dy = Math.sin(direction) * distance;
    return new _Vector2(start.x + dx, start.y + dy);
  }
  /** 
   * takes the relative vector between `center` and `vec` and rotates it by angle [radians]
   * */
  static rotateAroundCenter(center, vec, angle) {
    let rel = vec.subtract(center);
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    let rotated = new _Vector2(
      rel.x * cos - rel.y * sin,
      rel.x * sin + rel.y * cos
    );
    return rotated.add(center);
  }
  /** 
   * takes the relative vector between `center` and `vec` and sets the rotation to angle [radians]
   * */
  static setAngleAroundCenter(center, vec, angle) {
    let rel = vec.subtract(center);
    let magnitude = rel.getMagnitude();
    let newRel = new _Vector2(
      Math.cos(angle) * magnitude,
      Math.sin(angle) * magnitude
    );
    return newRel.add(center);
  }
};

// ts/math/math_util.ts
var math_util_exports = {};
__export(math_util_exports, {
  math: () => math
});
var math;
((math2) => {
  function round(x, num_decimals = 0) {
    const factor = Math.pow(10, num_decimals);
    return Math.round(x * factor) / factor;
  }
  math2.round = round;
  function floor(x, num_decimals = 0) {
    const factor = Math.pow(10, num_decimals);
    return Math.floor(x * factor) / factor;
  }
  math2.floor = floor;
  function ceil(x, num_decimals = 0) {
    const factor = Math.pow(10, num_decimals);
    return Math.ceil(x * factor) / factor;
  }
  math2.ceil = ceil;
  let random;
  ((random2) => {
    function between(start, end, num_decimals = 0) {
      return round(Math.random() * (end - start) + start, num_decimals);
    }
    random2.between = between;
    function sign() {
      return Math.random() > 0.5 ? 1 : -1;
    }
    random2.sign = sign;
  })(random = math2.random || (math2.random = {}));
  let trigonometry;
  ((trigonometry2) => {
    function cos(degree) {
      return Math.cos(convert.DegToRad(degree));
    }
    trigonometry2.cos = cos;
    function arccos(num) {
      return convert.RadToDeg(Math.acos(num));
    }
    trigonometry2.arccos = arccos;
  })(trigonometry = math2.trigonometry || (math2.trigonometry = {}));
  let convert;
  ((convert2) => {
    function DegToRad(degree) {
      return degree * Math.PI / 180;
    }
    convert2.DegToRad = DegToRad;
    function RadToDeg(rad) {
      return 180 * rad / Math.PI;
    }
    convert2.RadToDeg = RadToDeg;
    function percent(percent2, value = 1) {
      if (typeof percent2 === "string") {
        percent2 = parseFloat(percent2);
        if (isNaN(percent2)) throw new Error(`${percent2} contains no number`);
      }
      return percent2 / 100 * value;
    }
    convert2.percent = percent;
  })(convert = math2.convert || (math2.convert = {}));
})(math || (math = {}));

// ts/math/vector_util.ts
var vector_util_exports = {};
__export(vector_util_exports, {
  vector: () => vector
});
var vector;
((vector2) => {
  function distance(vec1, vec2) {
    return vec1.subtract(vec2).getMagnitude();
  }
  vector2.distance = distance;
})(vector || (vector = {}));

// ts/engine/physic/algorithms/Collision.ts
var import_util6 = require("util");

// ts/engine/physic/boundingBox/HitBox.ts
var HitBox = class {
  // quick access vars (need to set at initialization)
  boundingRadius;
  isConvex;
  current_scale = 1;
  // scale the hitbox
  scale(scalar) {
    this.current_scale *= scalar;
  }
  setScale(scale) {
    this.current_scale = scale;
  }
};

// ts/engine/physic/boundingBox/Circle.ts
var Circle = class extends HitBox {
  radius;
  // quick access vars (need to set at initialization)
  boundingRadius;
  isConvex;
  constructor(radius = 1) {
    super();
    this.radius = radius;
    this.isConvex = true;
    this.boundingRadius = radius;
  }
  // ==================================================
  // super class
  translatePoints(pos, orientation) {
    return [
      Vector2.moveInDirectionFromPoint(pos, orientation, this.radius),
      Vector2.moveInDirectionFromPoint(pos, 360 - orientation, this.radius)
    ];
  }
  scale(scalar) {
    super.scale(scalar);
    this.radius *= scalar;
  }
  setScale(scale) {
    this.radius /= this.current_scale;
    super.setScale(scale);
  }
  isPointInside(point) {
    return point.getMagnitude() <= this.radius;
  }
};

// ts/engine/physic/algorithms/SAT.ts
var SAT = class {
  static testCollision(obj1, obj2) {
    if (obj1.hitBox instanceof Circle || obj2.hitBox instanceof Circle) return true;
    return this.areColliding(obj1, obj2) && this.areColliding(obj2, obj1);
  }
  /**
   * Tests all Sides of polygon 1 with SAT agaings polygon 2
   * Returns false if a gap is found - else true
   */
  static areColliding(polygon1, polygon2) {
    const points1 = polygon1.translatePoints();
    const points2 = polygon2.translatePoints();
    let lastPoint = points1[points1.length - 1];
    for (let i = 0; i < points1.length; i++) {
      const point = points1[i];
      const normal = lastPoint.vectorTo(point).getNormal();
      let min1 = Infinity;
      let max1 = -Infinity;
      points1.forEach((point2) => {
        const dot = point2.dotProduct(normal) / normal.getMagnitude();
        min1 = Math.min(min1, dot);
        max1 = Math.max(max1, dot);
      });
      let min2 = Infinity;
      let max2 = -Infinity;
      points2.forEach((point2) => {
        const dot = point2.dotProduct(normal) / normal.getMagnitude();
        min2 = Math.min(min2, dot);
        max2 = Math.max(max2, dot);
      });
      if (!(max2 >= min1 && max1 >= min2)) return false;
      lastPoint = point;
    }
    return true;
  }
};

// ts/engine/physic/algorithms/Triangulation.ts
var import_util5 = require("util");

// ts/engine/physic/boundingBox/Polygon2.ts
var import_util4 = require("util");
var Polygon2 = class _Polygon2 extends HitBox {
  // points relative to a (0|0) center with 0° rotation
  model = new Array();
  // quick access vars (need to set at initialization)
  boundingRadius;
  isConvex;
  constructor(model) {
    super();
    this.model = model;
    this.boundingRadius = this.updateBoundingRadius();
    this.isConvex = _Polygon2.testConvex(this);
  }
  updateBoundingRadius() {
    let point_distances = this.model.map((p) => p.getMagnitude());
    this.boundingRadius = Math.max(...point_distances);
    return this.boundingRadius;
  }
  findCenter() {
    let center = new Vector2();
    for (let point of this.model) {
      center = center.add(point);
    }
    return center.scale(1 / this.model.length);
  }
  /**
   * offsets all Points to match the focus point
   */
  centerModel() {
    const realCenter = this.findCenter();
    this.model.forEach((point) => {
      point.x -= realCenter.x;
      point.y -= realCenter.y;
    });
    this.updateBoundingRadius();
  }
  // ==========================================================================================
  // from Super classes
  scale(scalar) {
    super.scale(scalar);
    this.model = this.model.map((p) => p.scale(scalar));
  }
  setScale(scale) {
    this.model = this.model.map((p) => p.scale(1 / this.current_scale));
    super.setScale(scale);
  }
  translatePoints(pos, orientation) {
    return this.model.map((p) => Vector2.setAngleAroundCenter(pos, p.add(pos), orientation));
  }
  isPointInside(point) {
    return _Polygon2.isPointIndside(this, point);
  }
  // ==================================================
  // static
  static findArea(polygon) {
    let area = 0;
    for (let i = 0; i < polygon.model.length; i++) {
      const a = polygon.model[i];
      const b = import_util4.Util.array.getItemCyclic(polygon.model, i + 1);
      area += a.x * b.y;
      area -= a.y * b.x;
    }
    return area / 2;
  }
  static findWinding(polygon) {
    return _Polygon2.findArea(polygon) < 0 ? "clockwise" : "counterclockwise";
  }
  static testConvex(polygon) {
    if (polygon.model.length <= 3) return true;
    const winding = _Polygon2.findWinding(polygon);
    for (let i = 0; i < polygon.model.length; i++) {
      const a = import_util4.Util.array.getItemCyclic(polygon.model, i - 1);
      const b = polygon.model[i];
      const c = import_util4.Util.array.getItemCyclic(polygon.model, i + 1);
      const ba = a.subtract(b);
      const bc = c.subtract(b);
      if (!_Polygon2.isConvex(winding, ba.crossProduct(bc))) return false;
    }
    return true;
  }
  static isConvex(windung, crossProduct) {
    if (windung == "clockwise" && crossProduct >= 0) return true;
    if (windung == "counterclockwise" && crossProduct <= 0) return true;
    return false;
  }
  /**
  *  Uses local koords to check if a point is "inside"
  */
  static isPointIndside(polygon, point) {
    const winding = _Polygon2.findWinding(polygon);
    for (let i = 0; i < polygon.model.length; i++) {
      const a = polygon.model[i];
      const b = import_util4.Util.array.getItemCyclic(polygon.model, i - 1);
      const a_to_b = b.subtract(a);
      const a_to_p = point.subtract(a);
      const cross = a_to_b.crossProduct(a_to_p);
      if (!_Polygon2.isConvex(winding, cross))
        return false;
    }
    return true;
  }
};

// ts/engine/physic/boundingBox/Triangle.ts
var Triangle = class extends Polygon2 {
  constructor(p1, p2, p3) {
    let model = [
      p1,
      p2,
      p3
    ];
    super(model);
    this.centerModel();
  }
};

// ts/engine/physic/algorithms/Triangulation.ts
var Triangulation = class _Triangulation {
  static triangulate(obj) {
    if (!(obj.hitBox instanceof Polygon2))
      throw new Error("other than polygon not implemented yet!");
    const vertices = obj.hitBox.model;
    const windung = Polygon2.findWinding(obj.hitBox);
    const ears = [];
    const indexList = [];
    for (let i = 0; i < vertices.length; i++) {
      indexList.push(i);
    }
    while (indexList.length > 3) {
      for (let i = 0; i < indexList.length; i++) {
        const i1 = import_util5.Util.array.getItemCyclic(indexList, i - 1);
        const i2 = indexList[i];
        const i3 = import_util5.Util.array.getItemCyclic(indexList, i + 1);
        const va = vertices[i1];
        const vb = vertices[i2];
        const vc = vertices[i3];
        const vb_to_va = va.subtract(vb);
        const vb_to_vc = vc.subtract(vb);
        if (!Polygon2.isConvex(windung, vb_to_va.crossProduct(vb_to_vc))) continue;
        let isEar = true;
        for (let j = 0; j < vertices.length; j++) {
          if (j == i1 || j == i2 || j == i3) continue;
          let p = vertices[j];
          if (_Triangulation.isPointInTriangle(p, vb, va, vc)) {
            isEar = false;
            break;
          }
        }
        if (!isEar) continue;
        const ear = new Ear(obj.pos, new Triangle(va, vb, vc), obj.orientation);
        ears.push(ear);
        import_util5.Util.array.removeItemAtIndex(indexList, i);
        break;
      }
    }
    const last_triangle = new Triangle(vertices[indexList[0]], vertices[indexList[1]], vertices[indexList[2]]);
    const last_ear = new Ear(obj.pos, last_triangle, obj.orientation);
    ears.push(last_ear);
    return ears;
  }
  static isPointInTriangle(p, a, b, c) {
    const ab = b.subtract(a);
    const bc = c.subtract(b);
    const ca = a.subtract(c);
    const ap = p.subtract(a);
    const bp = p.subtract(b);
    const cp = p.subtract(c);
    const cross1 = ab.crossProduct(ap);
    const cross2 = bc.crossProduct(bp);
    const cross3 = ca.crossProduct(cp);
    if (cross1 < 0 || cross2 < 0 || cross3 < 0) return false;
    return true;
  }
};
var Ear = class {
  pos;
  hitBox;
  orientation;
  constructor(pos, hitBox, orientation = 0) {
    this.pos = pos;
    this.hitBox = hitBox;
    this.orientation = orientation;
  }
  translatedPoints = [];
  alreadyTranslated = false;
  translatePoints() {
    if (this.alreadyTranslated) return this.translatedPoints;
    this.translatedPoints = this.hitBox.translatePoints(this.pos, this.orientation);
    this.alreadyTranslated = true;
    return this.translatedPoints;
  }
  move(translation_vec) {
    this.pos.x += translation_vec.x;
    this.pos.y += translation_vec.y;
    this.alreadyTranslated = false;
  }
  moveDirection(degrees, distance) {
    const rad = import_util5.Util.math.convert.DegToRad(degrees);
    const dx = Math.cos(rad) * distance;
    const dy = Math.sin(rad) * distance;
    this.pos.x += dx;
    this.pos.y += dy;
    this.alreadyTranslated = false;
  }
};

// ts/engine/physic/algorithms/Collision.ts
var Collision;
((Collision2) => {
  function testCollision(obj1, obj2) {
    [obj1, obj2].forEach((obj) => obj.translatePoints());
    if (obj1.hitBox instanceof Circle || obj2.hitBox instanceof Circle) {
      return potentialCollision(obj1, obj2);
    }
    if (!potentialCollision(obj1, obj2)) return false;
    if (!obj1.hitBox.isConvex) {
      const parts = Triangulation.triangulate(obj1);
      for (let part of parts) {
        if (Collision2.testCollision(part, obj2)) return true;
      }
      return false;
    }
    if (!obj2.hitBox.isConvex) {
      const parts = Triangulation.triangulate(obj2);
      for (let part of parts) {
        if (Collision2.testCollision(obj1, part)) return true;
      }
      return false;
    }
    return SAT.testCollision(obj1, obj2);
  }
  Collision2.testCollision = testCollision;
  function isPointInside(obj, worldPoint) {
    const localPoint = Vector2.setAngleAroundCenter(obj.pos, worldPoint, -obj.orientation);
    return obj.hitBox.isPointInside(localPoint);
  }
  Collision2.isPointInside = isPointInside;
  function potentialCollision(obj1, obj2) {
    return circleCollision(
      obj1.pos,
      obj1.hitBox.boundingRadius,
      obj2.pos,
      obj2.hitBox.boundingRadius
    );
  }
  Collision2.potentialCollision = potentialCollision;
  function circleCollision(c1, r1, c2, r2) {
    return import_util6.Util.vector.distance(c1, c2) < r1 + r2;
  }
  Collision2.circleCollision = circleCollision;
})(Collision || (Collision = {}));

// ts/engine/physic/boundingBox/Rectangle.ts
var Rectangle = class extends Polygon2 {
  width;
  height;
  constructor(width, height) {
    super([
      // model
      new Vector2(0, 0),
      new Vector2(0, height),
      new Vector2(width, height),
      new Vector2(width, 0)
    ]);
    this.centerModel();
    this.width = width;
    this.height = height;
  }
};

// ts/engine/display/camera/Camera.ts
var import_util7 = require("util");

// ts/engine/display/camera/Zoom.ts
var Zoom = class {
  activated = true;
  faktor;
  minZoom;
  maxZoom;
  currentZoom;
  constructor(faktor = 1.15, minZoom = 0.5, maxZoom = 3) {
    this.faktor = faktor;
    this.minZoom = minZoom;
    this.maxZoom = maxZoom;
    this.currentZoom = 1;
  }
  zoomIn() {
    if (!this.activated) return null;
    const nextZoom = this.currentZoom / this.faktor;
    if (nextZoom < this.minZoom) return null;
    this.currentZoom = nextZoom;
    return this.currentZoom;
  }
  zoomOut() {
    if (!this.activated) return null;
    const nextZoom = this.currentZoom * this.faktor;
    if (nextZoom > this.maxZoom) return null;
    this.currentZoom = nextZoom;
    return this.currentZoom;
  }
  setZoom(zoom = 1) {
    this.currentZoom = zoom;
  }
  setActivated(value) {
    this.activated = value;
  }
  enable() {
    this.activated = true;
  }
  disable() {
    this.activated = false;
  }
};

// ts/engine/display/camera/Camera.ts
var Camera = class {
  pos = new Vector2();
  lockMovement = false;
  orientation = 0;
  hitBox;
  zoom = new Zoom();
  constructor(width, height) {
    this.hitBox = new Rectangle(width, height);
  }
  move(translation_vec) {
    this.pos.x += translation_vec.x;
    this.pos.y += translation_vec.y;
    this.alreadyTranslated = false;
  }
  moveDirection(degrees, distance) {
    const rad = import_util7.Util.math.convert.DegToRad(degrees);
    const dx = Math.cos(rad) * distance;
    const dy = Math.sin(rad) * distance;
    this.pos.x += dx;
    this.pos.y += dy;
    this.alreadyTranslated = false;
  }
  rotate(degrees) {
    this.orientation += degrees;
    this.orientation %= 360;
    this.alreadyTranslated = false;
  }
  translatedPoints = [];
  alreadyTranslated = false;
  translatePoints() {
    if (this.alreadyTranslated) return this.translatedPoints;
    this.hitBox.setScale(1 / this.zoom.currentZoom);
    this.translatedPoints = this.hitBox.translatePoints(this.pos, this.orientation);
    this.alreadyTranslated = true;
    return this.translatedPoints;
  }
  isCollidingWith(other) {
    return Collision.testCollision(this, other);
  }
};

// ts/input/Input.ts
var import_util8 = require("util");
var keys = /* @__PURE__ */ new Map([
  ["a", "a"],
  ["b", "b"],
  ["c", "c"],
  ["d", "d"],
  ["e", "e"],
  ["f", "f"],
  ["g", "g"],
  ["h", "h"],
  ["i", "i"],
  ["j", "j"],
  ["k", "k"],
  ["l", "l"],
  ["m", "m"],
  ["n", "n"],
  ["o", "o"],
  ["p", "p"],
  ["q", "q"],
  ["r", "r"],
  ["s", "s"],
  ["t", "t"],
  ["u", "u"],
  ["v", "v"],
  ["w", "w"],
  ["x", "x"],
  ["y", "y"],
  ["z", "z"],
  ["0", "0"],
  ["1", "1"],
  ["2", "2"],
  ["3", "3"],
  ["4", "4"],
  ["5", "5"],
  ["6", "6"],
  ["7", "7"],
  ["8", "8"],
  ["9", "9"],
  ["mouse0", "leftclick"],
  ["mouse2", "rightclick"],
  ["mouse1", "middleclick"],
  ["tab", "tab"],
  ["shift", "shift"],
  [" ", "space"],
  ["control", "strg"],
  ["altgraph", "altRight"],
  ["alt", "alt"],
  ["arrowleft", "left"],
  ["arrowright", "right"],
  ["arrowup", "up"],
  ["arrowdown", "down"]
]);
var Input = class _Input {
  static eventListener = /* @__PURE__ */ new Map();
  static pressedKeys = new Array();
  static mPos = new Vector2();
  /** updates the most important changes for easier access */
  static staticConstructor() {
    window.addEventListener("mousedown", (event) => {
      _Input.keyDown(_Input.getInputKey("mouse" + event.button));
      _Input.mPos.x = event.offsetX;
      _Input.mPos.y = event.offsetY;
    });
    window.addEventListener("mouseup", (event) => {
      _Input.keyUp(_Input.getInputKey("mouse" + event.button));
    });
    window.addEventListener("mousemove", (event) => {
      _Input.mPos.x = event.offsetX;
      _Input.mPos.y = event.offsetY;
    });
    window.addEventListener("keydown", (event) => {
      _Input.keyDown(_Input.getInputKey(event.key));
    });
    window.addEventListener("keyup", (event) => {
      _Input.keyUp(_Input.getInputKey(event.key));
    });
    window.addEventListener("blur", () => {
      this.pressedKeys = new Array();
    });
  }
  static newEventListener(event, obj, func) {
    if (!_Input.eventListener.has(event)) window.addEventListener(event, _Input.notifyOfEvent);
    let listener = _Input.eventListener.get(event);
    if (!listener) listener = new Array();
    listener.push(new Listener(obj, func));
    _Input.eventListener.set(event, listener);
  }
  static removeEventListener(event, obj) {
    const listener = _Input.eventListener.get(event);
    if (!listener) return;
    for (let lis of listener) {
      if (lis.obj == obj) import_util8.Util.array.removeItem(listener, lis);
    }
  }
  static notifyOfEvent(event) {
    let listener = _Input.eventListener.get(event.type);
    if (!listener) return;
    if (event instanceof MouseEvent) _Input.mPos = new Vector2(event.offsetX, event.offsetY);
    listener.forEach((listener2) => {
      listener2.func.call(listener2.obj, event);
    });
  }
  static keyDown(key) {
    if (!key) return;
    if (!this.pressedKeys.includes(key)) {
      this.pressedKeys.push(key);
    }
  }
  static keyUp(key) {
    if (!key) return;
    if (this.pressedKeys.includes(key)) {
      import_util8.Util.array.removeItem(this.pressedKeys, key);
    }
  }
  static getInputKey(key) {
    key = key.toLowerCase();
    if (!keys.has(key)) console.warn(key + " has no InputKey!");
    return keys.get(key);
  }
  static isLeftClick() {
    return _Input.pressedKeys.includes("leftclick");
  }
  static isPressed(key) {
    return _Input.pressedKeys.includes(key);
  }
};
var Listener = class {
  obj;
  func;
  constructor(obj, func) {
    this.obj = obj;
    this.func = func;
  }
};
Input.staticConstructor();
var input = {
  listener: /* @__PURE__ */ new Map(),
  pressedKey: [],
  mPos: new Vector2()
};

// ts/engine/display/htmlCanvas/Canvas.ts
var Canvas = class {
  htmlCanvas;
  width = 0;
  height = 0;
  constructor(htmlCanvas) {
    this.htmlCanvas = htmlCanvas ?? document.createElement("canvas");
    Input.newEventListener("resize", this, this.updateSize);
    this.updateSize();
  }
  updateSize() {
    this.htmlCanvas.width = this.htmlCanvas.getBoundingClientRect().width;
    this.htmlCanvas.height = this.htmlCanvas.getBoundingClientRect().height;
    this.width = this.htmlCanvas.getBoundingClientRect().width;
    this.height = this.htmlCanvas.getBoundingClientRect().height;
  }
};

// ts/engine/display/htmlCanvas/CanvasCamera.ts
var CanvasCamera = class extends Camera {
  constructor(canvas) {
    super(canvas.width, canvas.height);
    Input.newEventListener("wheel", this, this.mouseWheel);
    Input.newEventListener("mousemove", this, this.mouseMove);
    Input.newEventListener("touchmove", this, this.touchMove);
    Input.newEventListener("touchend", this, () => this.previousTouchPos = void 0);
    Input.newEventListener("touchcancel", this, () => this.previousTouchPos = void 0);
    Input.newEventListener("resize", this, () => {
      canvas.updateSize();
      this.hitBox = new Rectangle(canvas.width, canvas.height);
      this.alreadyTranslated = false;
    });
  }
  // ==================================================
  // eventhandlers
  mouseWheel(event) {
    if (!this.zoom.activated) return;
    if (event.deltaY < 0) {
      this.zoom.zoomIn();
    } else if (event.deltaY > 0) {
      this.zoom.zoomOut();
    }
    this.alreadyTranslated = false;
  }
  mouseMove(event) {
    if (this.lockMovement) return;
    if (!Input.isLeftClick()) return;
    this.pos.x -= event.movementX / this.zoom.currentZoom;
    this.pos.y += event.movementY / this.zoom.currentZoom;
    this.alreadyTranslated = false;
  }
  previousTouchPos;
  touchMove(event) {
    if (this.lockMovement) return;
    const touch = event.touches[0] || event.changedTouches[0];
    const touchPos = new Vector2(touch.clientX, touch.clientY);
    if (!this.previousTouchPos) {
      this.previousTouchPos = touchPos;
      return;
    }
    const move = touchPos.subtract(this.previousTouchPos);
    this.previousTouchPos = touchPos;
    this.pos.x -= move.x / this.zoom.currentZoom;
    this.pos.y += move.y / this.zoom.currentZoom;
    this.alreadyTranslated = false;
  }
};

// ts/engine/display/htmlCanvas/CanvasRenderer.ts
var CanvasRenderer = class extends Renderer {
  canvas;
  constructor(canvas) {
    super();
    this.canvas = canvas;
  }
  renderLine(pos1, pos2, args) {
  }
  renderCircle(pos, radius, args) {
  }
  renderRectangle(pos, pos2, args) {
  }
};

// ts/engine/entities/SceneObject.ts
var SceneObject = class {
};

// ts/engine/entities/GameObject.ts
var import_util9 = require("util");
var GameObject = class extends SceneObject {
  pos = new Vector2();
  shouldUpdate() {
    return true;
  }
  shouldRender() {
    return true;
  }
  moveDirection(degrees, distance) {
    const rad = import_util9.Util.math.convert.DegToRad(degrees);
    const dx = Math.cos(rad) * distance;
    const dy = Math.sin(rad) * distance;
    this.pos.x += dx;
    this.pos.y += dy;
  }
  move(translation_vec) {
    this.pos.x += translation_vec.x;
    this.pos.y += translation_vec.y;
  }
};

// ts/engine/entities/ControllableObject.ts
var ControllableObject = class extends GameObject {
  controls = /* @__PURE__ */ new Map();
  preUpdate(deltaTime) {
    this.controls.forEach((controls, key) => {
      if (!Input.isPressed(key)) return;
      for (const control of controls) {
        control.time_since_last_activation += deltaTime;
        if (control.time_since_last_activation >= control.max_activation_Interval) {
          control.func.call(this, deltaTime);
          control.time_since_last_activation -= control.max_activation_Interval;
        }
      }
    });
  }
  addControl(key, func, max_activation_Interval = 0) {
    let control = {
      func,
      max_activation_Interval,
      time_since_last_activation: 0
    };
    const prev = this.controls.get(key) ?? [];
    prev.push(control);
    this.controls.set(key, prev);
  }
};

// ts/multiThreading/Thread.ts
var Thread = class {
  blobURL;
  worker;
  constructor(workerFunc, receiveFunc) {
    var blob = new Blob([`onmessage = ${workerFunc.toString()}`], { type: "text/javascript" });
    this.blobURL = window.URL.createObjectURL(blob);
    this.worker = new Worker(this.blobURL, { type: "module" });
    this.worker.onmessage = (e) => receiveFunc(e);
  }
  postMessage(message) {
    this.worker.postMessage(message);
  }
  terminate() {
    this.worker.terminate();
    window.URL.revokeObjectURL(this.blobURL);
  }
};

// ts/util/object_util.ts
var object_util_exports = {};
__export(object_util_exports, {
  array: () => array,
  map: () => map,
  object: () => object
});
var array;
((array2) => {
  function getItemCyclic(arr, index) {
    const wrappedIndex = (index % arr.length + arr.length) % arr.length;
    return arr[wrappedIndex];
  }
  array2.getItemCyclic = getItemCyclic;
  function getLastItem(arr) {
    return arr[-1];
  }
  array2.getLastItem = getLastItem;
  function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
  array2.getRandomItem = getRandomItem;
  function removeItemAtIndex(arr, index) {
    if (index < 0 || index >= arr.length) throw new Error(`${index} is not Valid!`);
    return arr.splice(index, 1)[0];
  }
  array2.removeItemAtIndex = removeItemAtIndex;
  function removeItem(arr, item) {
    if (!arr.includes(item)) return void 0;
    return arr.splice(arr.indexOf(item), 1)[0];
  }
  array2.removeItem = removeItem;
  function sum(arr) {
    return arr.reduce((a, b) => a += isNaN(b) ? 0 : b);
  }
  array2.sum = sum;
  function isEmpty(arr) {
    return !arr || arr.length === 0;
  }
  array2.isEmpty = isEmpty;
  function copyOf(arr) {
    return [...arr];
  }
  array2.copyOf = copyOf;
  function connectArrays(arrays) {
    let connected = [];
    for (let arr of arrays) {
      connected = connected.concat(arr);
    }
    return connected;
  }
  array2.connectArrays = connectArrays;
})(array || (array = {}));
var map;
((map2) => {
  function copyOf(map3) {
    var newMap = /* @__PURE__ */ new Map();
    for (let [key, value] of map3.entries()) {
      newMap.set(key, value);
    }
    return newMap;
  }
  map2.copyOf = copyOf;
})(map || (map = {}));
var object;
((object2) => {
  function findClassName(clas) {
    return clas instanceof Function ? clas.name : clas.constructor.name;
  }
  object2.findClassName = findClassName;
  function findSuperClassName(clas) {
    return clas instanceof Function ? Object.getPrototypeOf(clas).name : Object.getPrototypeOf(Object.getPrototypeOf(clas)).constructor.name;
  }
  object2.findSuperClassName = findSuperClassName;
  function findClass(clas) {
    return clas instanceof Function ? clas : Object.getPrototypeOf(clas).constructor;
  }
  object2.findClass = findClass;
  function findSuperClass(clas) {
    return clas instanceof Function ? Object.getPrototypeOf(clas) : Object.getPrototypeOf(Object.getPrototypeOf(clas)).constructor;
  }
  object2.findSuperClass = findSuperClass;
  function findAllClassNames(clas) {
    const superClasses = [];
    let currentClass = object2.findClass(clas);
    while (currentClass.name != "") {
      superClasses.push(currentClass.name);
      currentClass = object2.findSuperClass(currentClass);
    }
    return superClasses;
  }
  object2.findAllClassNames = findAllClassNames;
  function findAllClasses(clas) {
    const superClasses = [];
    let currentClass = object2.findClass(clas);
    while (currentClass.name != "") {
      superClasses.push(currentClass);
      currentClass = object2.findSuperClass(currentClass);
    }
    return superClasses;
  }
  object2.findAllClasses = findAllClasses;
  function findAllSuperClassNames(clas) {
    const superClasses = [];
    let currentClass = object2.findSuperClass(clas);
    while (currentClass.name != "") {
      superClasses.push(currentClass.name);
      currentClass = object2.findSuperClass(currentClass);
    }
    return superClasses;
  }
  object2.findAllSuperClassNames = findAllSuperClassNames;
  function findAllSuperClasses(clas) {
    const superClasses = [];
    let currentClass = object2.findSuperClass(clas);
    while (currentClass.name != "") {
      superClasses.push(currentClass);
      currentClass = object2.findSuperClass(currentClass);
    }
    return superClasses;
  }
  object2.findAllSuperClasses = findAllSuperClasses;
})(object || (object = {}));

// ts/util/index.ts
var Util10 = {
  ...object_util_exports,
  ...math_util_exports,
  ...vector_util_exports
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Camera,
  Canvas,
  CanvasCamera,
  CanvasRenderer,
  Circle,
  Collision,
  Color,
  ControllableObject,
  GameLoop,
  GameManager,
  GameObject,
  HitBox,
  Input,
  Matrix2,
  Polygon2,
  RealTimeManager,
  Rectangle,
  Renderer,
  SAT,
  Scene,
  SceneObject,
  Thread,
  Triangle,
  Triangulation,
  TurnBasedManager,
  TwoKeyMap,
  Util,
  Vector2,
  Zoom,
  math,
  vector
});
//# sourceMappingURL=index.cjs.map