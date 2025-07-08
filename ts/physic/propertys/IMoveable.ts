import { Vector2 } from "../../math/Vector2";
import { IPositionable } from "./IPositionable";

export interface IMoveable extends IPositionable {
  moveDirection(direction: number, distance: number): void;
  move(move: Vector2): void;
}
