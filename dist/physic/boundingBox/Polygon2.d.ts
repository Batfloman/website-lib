import { Vector2 } from "../../util/Vector2.js";
import { HitBox } from "./HitBox.js";
export declare class Polygon2 extends HitBox {
    model: Vector2[];
    constructor(model: Vector2[]);
    centerModel(): void;
    findCenter(): Vector2;
    translatePoints(pos: Vector2, orientation: number): Vector2[];
    scale(scalar: number): void;
}
