import { Vector2 } from "../../math/Vector2";

export abstract class HitBox {
  isConvex!: boolean;
  farthestDistance!: number;

  abstract translatePoints(pos: Vector2, orientation: number): Vector2[];

  abstract scale(scalar: number): void;
}
