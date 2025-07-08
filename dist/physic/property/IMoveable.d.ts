import { Vector2 } from "../../util/Vector2.js";
import { IPositionable } from "./IPositionable.js";
export interface IMoveable extends IPositionable {
    moveDirection(direction: number, distance: number): void;
    move(move: Vector2): void;
}
