import { Vector2 } from "math";

export abstract class HitBox {
  // quick access vars (need to set at initialization)
  public boundingRadius!: number;
  public isConvex!: boolean;
  public current_scale: number = 1;

  // returns points for a given position and orientation
  abstract translatePoints(pos: Vector2, orientation: number): Vector2[];

  // scale the hitbox
  scale(scalar: number): void {
    this.current_scale *= scalar;
  }
  setScale(scale: number): void {
    this.current_scale = scale;
  }

  abstract isPointInside(point: Vector2): boolean;
}
