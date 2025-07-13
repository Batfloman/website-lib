import { Vector2 } from "./Vector2";

export namespace vector {
  export function distance(vec1: Vector2, vec2: Vector2): number {
    return vec1.subtract(vec2).getMagnitude();
  }
}
