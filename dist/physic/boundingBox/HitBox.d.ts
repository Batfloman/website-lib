import { Vector2 } from "../../util/Vector2";
export declare abstract class HitBox {
    isConvex: boolean;
    farthestDistance: number;
    abstract translatePoints(pos: Vector2, orientation: number): Vector2[];
    abstract scale(scalar: number): void;
}
