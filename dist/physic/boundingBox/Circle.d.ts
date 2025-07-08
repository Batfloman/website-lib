import { Vector2 } from "../../util/Vector2.js";
import { HitBox } from "./HitBox.js";
export declare class Circle extends HitBox {
    radius: number;
    constructor(radius?: number);
    translatePoints(pos: Vector2, orientation: number): Vector2[];
    scale(scalar: number): void;
}
