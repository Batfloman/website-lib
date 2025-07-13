import { HitBox } from "./HitBox";
import { Vector2 } from "math";

export class Circle extends HitBox {
  radius: number;
  // quick access vars (need to set at initialization)
  public readonly boundingRadius: number;
  public readonly isConvex: boolean;

  constructor(radius: number = 1) {
    super();
    this.radius = radius;
    this.isConvex = true;
    this.boundingRadius = radius;
  }

  // ==================================================
  // super class

  translatePoints(pos: Vector2, orientation: number): Vector2[] {
    return [
      Vector2.moveInDirectionFromPoint(pos, orientation, this.radius),
      Vector2.moveInDirectionFromPoint(pos, 360 - orientation, this.radius),
    ]
  }
  scale(scalar: number): void {
    super.scale(scalar)
    this.radius *= scalar;
  }
  setScale(scale: number): void {
    this.radius /= this.current_scale
    super.setScale(scale);
  }

  isPointInside(point: Vector2): boolean {
    return point.getMagnitude() <= this.radius;
  }
}


