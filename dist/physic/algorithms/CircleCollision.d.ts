import { Vector2 } from "../../util/Vector2";
import { ICollideable } from "../property/ICollideable";
export declare class CircleCollision {
    static potentialCollision(obj1: ICollideable, obj2: ICollideable): boolean;
    static circleCollision(c1: Vector2, r1: number, c2: Vector2, r2: number): boolean;
}
