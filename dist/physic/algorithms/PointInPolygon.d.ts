import { Vector2 } from "../../util/Vector2";
import { ICollideable } from "../property/ICollideable";
export declare class PointInPolygon {
    static isPointInsidePolygon(point: Vector2, polygon: ICollideable | Vector2[]): boolean;
}
