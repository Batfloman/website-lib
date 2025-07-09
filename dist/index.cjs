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
  Matrix2: () => Matrix2,
  Vector2: () => Vector2
});
module.exports = __toCommonJS(index_exports);

// ts/physic/algorithms/Polygon2Helper.ts
var Polygon2Helper = class _Polygon2Helper {
  /**
   * Test a polygon for convexity
   */
  static testConvex(polygon) {
    if (polygon.model.length <= 3) return true;
    const winding = _Polygon2Helper.findWinding(polygon);
    for (let i = 0; i < polygon.model.length; i++) {
      const a = Util.array.getItem(polygon.model, i - 1);
      const b = Util.array.getItem(polygon.model, i);
      const c = Util.array.getItem(polygon.model, i + 1);
      const ba = a.subtract(b);
      const bc = c.subtract(b);
      if (!_Polygon2Helper.isConvex(winding, ba.crossProduct(bc))) return false;
    }
    return true;
  }
  /**
   * test a vertex for Convexity
   */
  static isConvex(windung, crossProduct) {
    if (windung == "clockwise" && crossProduct >= 0) return true;
    if (windung == "counterclockwise" && crossProduct <= 0) return true;
    return false;
  }
  /**
   * Returns the winding of an Polygon
   */
  static findWinding(polygon) {
    return this.findArea(polygon) < 0 ? "clockwise" : "counterclockwise";
  }
  static findArea(polygon) {
    let area = 0;
    for (let i = 0; i < polygon.model.length; i++) {
      const a = Util.array.getItem(polygon.model, i);
      const b = Util.array.getItem(polygon.model, i + 1);
      area += a.x * b.y;
      area -= a.y * b.x;
    }
    return area / 2;
  }
  /**
   * Translates a point and returns the new Position
   */
  static translatePoint(point, center, angle = 0) {
    return Util.rotateAroundCenter(center, point.add(center), angle);
  }
  static translatePoints(points, center, angle = 0) {
    const translated = [];
    points.forEach((point) => {
      translated.push(Util.rotateAroundCenter(center, point.add(center), angle));
    });
    return translated;
  }
};

// ts/math/Vector2.ts
var Vector2 = class _Vector2 {
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
    const angleBetween = Util.math.trigonomitry.arccos(
      this.dotProduct(vec2) / (this.getMagnitude() * vec2.getMagnitude())
    );
    if (isNaN(angleBetween)) return 0;
    return vec2.crossProduct(this) >= 0 ? angleBetween : -angleBetween;
  }
};

// ts/util/Util.ts
var Util = {
  array: {
    getItem(arr, index) {
      if (index < 0) index = arr.length - 1;
      return arr[index % arr.length];
    },
    getLastItem(arr) {
      return arr[-1];
    },
    getRandomItem(arr) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    },
    removeItemAtIndex(arr, index) {
      if (index < 0 || index >= arr.length) throw new Error(`${index} is not Valid!`);
      return arr.splice(index, 1)[0];
    },
    removeItem(arr, item) {
      if (!arr.includes(item)) return void 0;
      return arr.splice(arr.indexOf(item), 1)[0];
    },
    sum(arr) {
      return arr.reduce((a, b) => a += isNaN(b) ? 0 : b);
    },
    isEmpty(arr) {
      return !arr || arr.length === 0;
    },
    copyOf(arr) {
      return [...arr];
    },
    connectArrays(arrays) {
      let connected = [];
      for (let arr of arrays) {
        connected = connected.concat(arr);
      }
      return connected;
    }
  },
  map: {
    copyOf(map) {
      var newMap = /* @__PURE__ */ new Map();
      for (let [key, value] of map.entries()) {
        newMap.set(key, value);
      }
      return newMap;
    }
  },
  math: {
    random: {
      between(start, end, num_decimals = 0) {
        return Util.math.round(Math.random() * (end - start) + start, num_decimals);
      },
      // Vorzeichen
      mathSign() {
        return Math.random() > 0.5 ? 1 : -1;
      }
    },
    convert: {
      DegToRad(degree) {
        return degree * Math.PI / 180;
      },
      RadToDeg(rad) {
        return 180 * rad / Math.PI;
      },
      percent(percent, value = 1) {
        if (typeof percent === "string") {
          percent = parseFloat(percent);
          if (isNaN(percent)) throw new Error(`${percent} contains no number`);
        }
        return percent / 100 * value;
      }
    },
    // uses degree instead of the Math. functions
    trigonomitry: {
      cos(degree) {
        return Math.cos(Util.math.convert.DegToRad(degree));
      },
      arccos(num) {
        return Util.math.convert.RadToDeg(Math.acos(num));
      }
    },
    round(number, num_decimals = 0) {
      const factor = Math.pow(10, num_decimals);
      return Math.round(number * factor) / factor;
    },
    floor(number, num_decimals = 0) {
      const factor = Math.pow(10, num_decimals);
      return Math.floor(number * factor) / factor;
    },
    ceil(number, num_decimals = 0) {
      const factor = Math.pow(10, num_decimals);
      return Math.ceil(number * factor) / factor;
    }
  },
  shapes: {
    circle: {
      area(radius) {
        return Math.PI * Math.pow(radius, 2);
      },
      radius(volume) {
        return Math.sqrt(volume / Math.PI);
      }
    },
    polygon: {
      area(polygon) {
        return Polygon2Helper.findArea(polygon);
      }
    }
  },
  object: {
    findClassName(clas) {
      return clas instanceof Function ? clas.name : clas.constructor.name;
    },
    findSuperClassName(clas) {
      return clas instanceof Function ? Object.getPrototypeOf(clas).name : Object.getPrototypeOf(Object.getPrototypeOf(clas)).constructor.name;
    },
    findClass(clas) {
      return clas instanceof Function ? clas : Object.getPrototypeOf(clas).constructor;
    },
    findSuperClass(clas) {
      return clas instanceof Function ? Object.getPrototypeOf(clas) : Object.getPrototypeOf(Object.getPrototypeOf(clas)).constructor;
    },
    findAllClassNames(clas) {
      const superClasses = [];
      let currentClass = this.findClass(clas);
      while (currentClass.name != "") {
        superClasses.push(currentClass.name);
        currentClass = this.findSuperClass(currentClass);
      }
      return superClasses;
    },
    findAllClasses(clas) {
      const superClasses = [];
      let currentClass = this.findClass(clas);
      while (currentClass.name != "") {
        superClasses.push(currentClass);
        currentClass = this.findSuperClass(currentClass);
      }
      return superClasses;
    },
    findAllSuperClassNames(clas) {
      const superClasses = [];
      let currentClass = this.findSuperClass(clas);
      while (currentClass.name != "") {
        superClasses.push(currentClass.name);
        currentClass = this.findSuperClass(currentClass);
      }
      return superClasses;
    },
    findAllSuperClasses(clas) {
      const superClasses = [];
      let currentClass = this.findSuperClass(clas);
      while (currentClass.name != "") {
        superClasses.push(currentClass);
        currentClass = this.findSuperClass(currentClass);
      }
      return superClasses;
    }
  },
  position: {
    /** Returns the static Position of a point with a world Position */
    worldPos_to_staticPos(worldPos, camara) {
      const camaraOffset = camara.getOffset();
      const camaraScale = camara.scaleValue;
      const camaraPos = camara.pos;
      const distance = worldPos.subtract(camaraPos).scale(camaraScale);
      const staticPos = new Vector2(
        Util.math.round(distance.x, 5),
        Util.math.round(-distance.y, 5)
      ).add(camaraOffset);
      return staticPos;
    },
    /** Returns the world Position of a point with a static Position */
    staticPos_to_worldPos(staticPos, camara) {
      const camaraCenter = camara.getOffset();
      const camaraScale = camara.scaleValue;
      const distance = staticPos.subtract(camaraCenter).scale(1 / camaraScale);
      const worldPos = camara.pos.add(
        new Vector2(Util.math.round(distance.x, 5), Util.math.round(-distance.y, 5))
      );
      return worldPos;
    },
    convertStaticPosInValue(pos, camara) {
      switch (pos) {
        case "center":
          return camara.getOffset();
        default:
          console.warn(pos, " has no case!");
          return new Vector2();
      }
    },
    convertPercentInValue(canvas, widthPercent, heightPercent) {
      return new Vector2(
        Util.math.convert.percent(widthPercent, canvas.width),
        Util.math.convert.percent(heightPercent, canvas.height)
      );
    },
    convertWidthPercentInValue(canvas, percent) {
      const number = Number.parseFloat(percent) / 100 * canvas.width;
      return isNaN(number) ? 0 : number;
    },
    convertHeightPercentInValue(canvas, percent) {
      const number = Number.parseFloat(percent) / 100 * canvas.height;
      return isNaN(number) ? 0 : number;
    }
  },
  toVector(angle, lenght) {
    const rad = Util.math.convert.DegToRad(angle);
    return new Vector2(Math.sin(rad) * lenght, Math.cos(rad) * lenght);
  },
  findAngleLine(startPoint, endPoint) {
    const zeroDegreeVector = new Vector2(0, 1);
    const vec = endPoint.subtract(startPoint);
    const dot = zeroDegreeVector.dotProduct(vec);
    const mag1 = zeroDegreeVector.getMagnitude();
    const mag2 = vec.getMagnitude();
    const angle = Util.math.trigonomitry.arccos(dot / (mag1 * mag2));
    return endPoint.x < startPoint.x ? -angle : angle;
  },
  /**
   * Returns the Hypothenuse of a Triangle
   * @param side1 the lenght of the 1. side
   * @param side2 the lenght of the 2. side
   */
  calcHypothenuse(side1, side2) {
    return Math.sqrt(Math.pow(side1, 2) + Math.pow(side2, 2));
  },
  /**
   * Returns the distance between to Points
   * @param point1
   * @param point2
   */
  distance(point1, point2) {
    return Util.calcHypothenuse(point1.x - point2.x, point1.y - point2.y);
  },
  /**
   * Returns the closest Point to the mainPoint
   * @param mainPoint point from which the distance will be measured
   * @param points collection of Points that will be tested
   * @param exclude point(s) that will be excluded
   */
  closestPoint(mainPoint, points, exclude) {
    let closest = new Vector2(Infinity, Infinity);
    let closestDistance = Infinity;
    points.forEach((point) => {
      if (mainPoint == point) return;
      if (exclude instanceof Vector2 && point == exclude) return;
      if (exclude instanceof Array && exclude.includes(point)) return;
      let distance = Util.distance(mainPoint, point);
      if (!closest || !closestDistance || distance < closestDistance) {
        closest = point;
        closestDistance = distance;
      }
    });
    return closest;
  },
  /**
   * Returns the farthest Point to the mainPoint
   * @param mainPoint point from which the distance will be measured
   * @param points collection of Points that will be tested
   * @param exclude point(s) that will be excluded
   */
  farthestPoint(mainPoint, points, exclude) {
    let farthest = mainPoint;
    let farthestDistance = 0;
    points.forEach((point) => {
      if (mainPoint == point) return;
      if (exclude instanceof Vector2 && point == exclude) return;
      if (exclude instanceof Array && exclude.includes(point)) return;
      let distance = Util.distance(mainPoint, point);
      if (distance >= farthestDistance) {
        farthest = point;
        farthestDistance = distance;
      }
    });
    return farthest;
  },
  /**
   * Moves @param distance in @param direction from the @param start Point and returns the new Position
   * @param start point from which the movement starts
   * @param direction angle in which the point will be moved
   * @param distance amount by which the point will be moved
   */
  moveDirection(start, direction, distance) {
    const rad = Util.math.convert.DegToRad(direction);
    const moveX = Math.sin(rad) * distance;
    const moveY = Math.cos(rad) * distance;
    return new Vector2(start.x + moveX, start.y + moveY);
  },
  /**
   * Rotates the @param point around a @param center Point by @param angle degrees
   * @param center point which another point will rotate around
   * @param point point that will be rotated
   * @param angle angle by which the point will be rotated
   */
  rotateAroundCenter(center, point, angle) {
    const rad = Util.math.convert.DegToRad(angle);
    return new Vector2(
      Math.cos(rad) * (point.x - center.x) - Math.sin(rad) * (point.y - center.y) + center.x,
      Math.sin(rad) * (point.x - center.x) + Math.cos(rad) * (point.y - center.y) + center.y
    );
  }
};

// ts/math/Matrix2.ts
var Matrix2 = class {
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
    return Util.array.getItem(Util.array.getItem(this.cells, yIndex), x);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Matrix2,
  Vector2
});
//# sourceMappingURL=index.cjs.map