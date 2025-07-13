import { Vector2 } from "math";

export interface IMoveable {
  pos: Vector2;

  moveDirection(degrees: number, distance: number): void;
  move(translation_vec: Vector2): void;
}
