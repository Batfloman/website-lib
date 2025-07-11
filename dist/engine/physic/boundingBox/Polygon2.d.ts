import { Vector2 } from "../../math/Vector2";
import { HitBox } from "./HitBox";
export declare class Polygon2 extends HitBox {
    model: Vector2[];
    constructor(model: Vector2[]);
    centerModel(): void;
    findCenter(): Vector2;
    translatePoints(pos: Vector2, orientation: number): Vector2[];
    scale(scalar: number): void;
}
