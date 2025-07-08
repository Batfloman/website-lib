import { Camara } from "../display/Camara.js";
import { Canvas } from "../display/Canvas.js";
import { Polygon2Helper } from "../physic/algorithms/Polygon2Helper.js";
import { Polygon2 } from "../physic/boundingBox/Polygon2.js";
import { Vector2 } from "./Vector2.js";

export type staticPosition = "center";

export const Util = {
  array: {
    getItem<T>(arr: T[], index: number): T {
      if (index < 0) index = arr.length - 1;

      return arr[index % arr.length];
    },
    getLastItem<T>(arr: T[]): T {
      return arr[-1];
    },
    getRandomItem<T>(arr: T[]): T {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    },
    removeItemAtIndex<T>(arr: T[], index: number): T {
      if (index < 0 || index >= arr.length) throw new Error(`${index} is not Valid!`);

      return arr.splice(index, 1)[0];
    },
    removeItem<T>(arr: T[], item: T): T | undefined {
      if (!arr.includes(item)) return undefined;

      return arr.splice(arr.indexOf(item), 1)[0];
    },
    sum(arr: number[]): number {
      return arr.reduce((a, b) => (a += isNaN(b) ? 0 : b));
    },
    isEmpty<T>(arr: T[]): boolean {
      return !arr || arr.length === 0;
    },
    copyOf<T>(arr: T[]): T[] {
      return [...arr];
    },
    connectArrays<T>(arrays: T[]): T[] {
      let connected: T[] = [];
      for (let arr of arrays) {
        connected = connected.concat(arr);
      }
      return connected;
    },
  },
  map: {
    copyOf<K, V>(map: Map<K, V>): Map<K, V> {
      var newMap = new Map<K, V>();
      for (let [key, value] of map.entries()) {
        newMap.set(key, value);
      }
      return newMap;
    },
  },
  math: {
    random: {
      between(start: number, end: number, num_decimals: number = 0): number {
        return Util.math.round(Math.random() * (end - start) + start, num_decimals);
      },
      // Vorzeichen
      mathSign(): number {
        return Math.random() > 0.5 ? 1 : -1;
      },
    },
    convert: {
      DegToRad(degree: number) {
        return (degree * Math.PI) / 180;
      },
      RadToDeg(rad: number) {
        return (180 * rad) / Math.PI;
      },
      percent(percent: number | string, value: number = 1) {
        if (typeof percent === "string") {
          percent = parseFloat(percent);
          if (isNaN(percent)) throw new Error(`${percent} contains no number`);
        }

        return (percent / 100) * value;
      },
    },
    // uses degree instead of the Math. functions
    trigonomitry: {
      cos(degree: number): number {
        // Math.cos uses radian not degree
        return Math.cos(Util.math.convert.DegToRad(degree));
      },
      arccos(num: number): number {
        return Util.math.convert.RadToDeg(Math.acos(num));
      },
    },
    round(number: number, num_decimals: number = 0): number {
      const factor = Math.pow(10, num_decimals);
      return Math.round(number * factor) / factor;
    },
    floor(number: number, num_decimals: number = 0): number {
      const factor = Math.pow(10, num_decimals);
      return Math.floor(number * factor) / factor;
    },
    ceil(number: number, num_decimals: number = 0): number {
      const factor = Math.pow(10, num_decimals);
      return Math.ceil(number * factor) / factor;
    },
  },
  shapes: {
    circle: {
      area(radius: number): number {
        return Math.PI * Math.pow(radius, 2);
      },
      radius(volume: number): number {
        return Math.sqrt(volume / Math.PI);
      },
    },
    polygon: {
      area(polygon: Polygon2): number {
        return Polygon2Helper.findArea(polygon);
      },
    },
  },
  object: {
    findClassName(clas: Object | Function): string {
      return clas instanceof Function ? clas.name : clas.constructor.name;
    },
    findSuperClassName(clas: Object | Function): string {
      return clas instanceof Function
        ? Object.getPrototypeOf(clas).name
        : Object.getPrototypeOf(Object.getPrototypeOf(clas)).constructor.name;
    },
    findClass(clas: Object | Function): Function {
      return clas instanceof Function ? clas : Object.getPrototypeOf(clas).constructor;
    },
    findSuperClass(clas: Object | Function): Function {
      // if can't access .constructor => Max superclass Found!
      return clas instanceof Function
        ? Object.getPrototypeOf(clas)
        : Object.getPrototypeOf(Object.getPrototypeOf(clas)).constructor;
    },
    findAllClassNames(clas: Object | Function): string[] {
      const superClasses: string[] = [];

      let currentClass = this.findClass(clas);
      while (currentClass.name != "") {
        superClasses.push(currentClass.name);
        currentClass = this.findSuperClass(currentClass);
      }
      return superClasses;
    },
    findAllClasses(clas: Object | Function): Function[] {
      const superClasses: Function[] = [];

      let currentClass = this.findClass(clas);
      while (currentClass.name != "") {
        superClasses.push(currentClass);
        currentClass = this.findSuperClass(currentClass);
      }

      return superClasses;
    },
    findAllSuperClassNames(clas: Object | Function): string[] {
      const superClasses: string[] = [];

      let currentClass = this.findSuperClass(clas);
      while (currentClass.name != "") {
        superClasses.push(currentClass.name);
        currentClass = this.findSuperClass(currentClass);
      }
      return superClasses;
    },
    findAllSuperClasses(clas: Object | Function): Function[] {
      const superClasses: Function[] = [];

      let currentClass = this.findSuperClass(clas);
      while (currentClass.name != "") {
        superClasses.push(currentClass);
        currentClass = this.findSuperClass(currentClass);
      }

      return superClasses;
    },
  },
  position: {
    /** Returns the static Position of a point with a world Position */
    worldPos_to_staticPos(worldPos: Vector2, camara: Camara): Vector2 {
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
    staticPos_to_worldPos(staticPos: Vector2, camara: Camara): Vector2 {
      const camaraCenter = camara.getOffset();
      const camaraScale = camara.scaleValue;

      const distance = staticPos.subtract(camaraCenter).scale(1 / camaraScale);

      const worldPos = camara.pos.add(
        new Vector2(Util.math.round(distance.x, 5), Util.math.round(-distance.y, 5))
      );
      return worldPos;
    },
    convertStaticPosInValue(pos: staticPosition, camara: Camara): Vector2 {
      switch (pos) {
        case "center":
          return camara.getOffset();
        default:
          console.warn(pos, " has no case!");
          return new Vector2();
      }
    },
    convertPercentInValue(canvas: Canvas, widthPercent: string, heightPercent: string): Vector2 {
      return new Vector2(
        Util.math.convert.percent(widthPercent, canvas.width),
        Util.math.convert.percent(heightPercent, canvas.height)
      );
    },
    convertWidthPercentInValue(canvas: Canvas, percent: string): number {
      const number = (Number.parseFloat(percent) / 100) * canvas.width;
      return isNaN(number) ? 0 : number;
    },
    convertHeightPercentInValue(canvas: Canvas, percent: string): number {
      const number = (Number.parseFloat(percent) / 100) * canvas.height;
      return isNaN(number) ? 0 : number;
    },
  },

  toVector(angle: number, lenght: number): Vector2 {
    const rad = Util.math.convert.DegToRad(angle);
    return new Vector2(Math.sin(rad) * lenght, Math.cos(rad) * lenght);
  },

  findAngleLine(startPoint: Vector2, endPoint: Vector2): number {
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
  calcHypothenuse(side1: number, side2: number): number {
    return Math.sqrt(Math.pow(side1, 2) + Math.pow(side2, 2));
  },

  /**
   * Returns the distance between to Points
   * @param point1
   * @param point2
   */
  distance(point1: Vector2, point2: Vector2): number {
    return Util.calcHypothenuse(point1.x - point2.x, point1.y - point2.y);
  },

  /**
   * Returns the closest Point to the mainPoint
   * @param mainPoint point from which the distance will be measured
   * @param points collection of Points that will be tested
   * @param exclude point(s) that will be excluded
   */
  closestPoint(mainPoint: Vector2, points: Vector2[], exclude?: Vector2 | Vector2[]): Vector2 {
    let closest: Vector2 = new Vector2(Infinity, Infinity);
    let closestDistance: number = Infinity;
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
  farthestPoint(mainPoint: Vector2, points: Vector2[], exclude?: Vector2 | Vector2[]): Vector2 {
    let farthest: Vector2 = mainPoint;
    let farthestDistance: number = 0;

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
  moveDirection(start: Vector2, direction: number, distance: number): Vector2 {
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
  rotateAroundCenter(center: Vector2, point: Vector2, angle: number): Vector2 {
    const rad = Util.math.convert.DegToRad(angle);

    return new Vector2(
      Math.cos(rad) * (point.x - center.x) - Math.sin(rad) * (point.y - center.y) + center.x,
      Math.sin(rad) * (point.x - center.x) + Math.cos(rad) * (point.y - center.y) + center.y
    );
  },
};
