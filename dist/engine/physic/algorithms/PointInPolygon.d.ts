import { Vector2 } from "../../math/Vector2";
import { ICollideable } from "../propertys/ICollideable";
export declare class PointInPolygon {
    static isPointInsidePolygon(point: Vector2, polygon: ICollideable | Vector2[]): boolean;
}
