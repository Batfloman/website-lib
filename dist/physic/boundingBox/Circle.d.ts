import { Vector2 } from "../../math/Vector2";
import { HitBox } from "./HitBox";
export declare class Circle extends HitBox {
    radius: number;
    constructor(radius?: number);
    translatePoints(pos: Vector2, orientation: number): Vector2[];
    scale(scalar: number): void;
}
