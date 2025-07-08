import { Util } from "./Util.js";

export class Vector2 {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
    this.x = !x ? 0 : x;
    this.y = !y ? 0 : y;
  }

  add(vec2: Vector2): Vector2 {
    return new Vector2(this.x + vec2.x, this.y + vec2.y);
  }

  subtract(vec2: Vector2): Vector2 {
    return new Vector2(this.x - vec2.x, this.y - vec2.y);
  }

  scale(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  dotProduct(vec2: Vector2): number {
    return this.x * vec2.x + this.y * vec2.y;
  }

  crossProduct(vec2: Vector2): number {
    return this.x * vec2.y - vec2.x * this.y;
  }

  vectorTo(point: Vector2): Vector2 {
    return new Vector2(Math.round(point.x - this.x), Math.round(point.y - this.y));
  }

  getNormal(): Vector2 {
    return new Vector2(-this.y, this.x);
  }

  getMagnitude(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  angle(vec2: Vector2): number {
    const angleBetween = Util.math.trigonomitry.arccos(
      this.dotProduct(vec2) / (this.getMagnitude() * vec2.getMagnitude())
    );
    if (isNaN(angleBetween)) return 0;
    return vec2.crossProduct(this) >= 0 ? angleBetween : -angleBetween;
  }
}