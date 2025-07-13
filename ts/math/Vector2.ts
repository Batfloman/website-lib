import { Util } from "util";

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
    const angleBetween = Util.math.trigonometry.arccos(
      this.dotProduct(vec2) / (this.getMagnitude() * vec2.getMagnitude())
    );
    if (isNaN(angleBetween)) return 0;
    return vec2.crossProduct(this) >= 0 ? angleBetween : -angleBetween;
  }

  // ==================================================
  // static 

  static add(vec1: Vector2, vec2: Vector2): Vector2 {
    return new Vector2(vec1.x + vec2.x, vec1.y + vec2.y);
  }

  static moveInDirectionFromPoint(start: Vector2, direction: number, distance: number): Vector2 {
    direction = Util.math.convert.DegToRad(direction)
    const dx = Math.cos(direction) * distance;
    const dy = Math.sin(direction) * distance;
    return new Vector2(start.x + dx, start.y + dy);
  }

  /** 
   * takes the relative vector between `center` and `vec` and rotates it by angle [radians]
   * */
  static rotateAroundCenter(center: Vector2, vec: Vector2, angle: number): Vector2 {
    let rel = vec.subtract(center);
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);

    let rotated = new Vector2(
      rel.x * cos - rel.y * sin,
      rel.x * sin + rel.y * cos
    );

    return rotated.add(center);
  }

  /** 
   * takes the relative vector between `center` and `vec` and sets the rotation to angle [radians]
   * */
  static setAngleAroundCenter(center: Vector2, vec: Vector2, angle: number): Vector2 {
    let rel = vec.subtract(center);
    let magnitude = rel.getMagnitude();

    let newRel = new Vector2(
      Math.cos(angle) * magnitude,
      Math.sin(angle) * magnitude
    );

    return newRel.add(center);
  }
}
