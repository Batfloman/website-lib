import { IScaleable, ScaleBehavior } from "engine/propertys";
import { Vector2 } from "math";

export abstract class HitBox implements IScaleable {
  // quick access vars (need to set at initialization)
  public boundingRadius!: number;
  public isConvex!: boolean;
  public scale: number = 1;
  public scaler: ScaleBehavior = new ScaleBehavior(this);

  // returns points for a given position and orientation
  abstract translatePoints(pos: Vector2, orientation: number): Vector2[];

  abstract isPointInside(point: Vector2): boolean;
}
