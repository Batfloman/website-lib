import { Vector2 } from "./Vector2";

export namespace vector {
  export function distance(vec1: Vector2, vec2: Vector2): number {
    return vec1.subtract(vec2).getMagnitude();
  }

  export function distanceSq(vec1: Vector2, vec2: Vector2): number {
    let dx = vec1.x - vec2.x;
    let dy = vec1.y - vec2.y;
    return dx ** 2 + dy ** 2;
  }
}
