import { Vector2 } from "../../util/Vector2";
import { Polygon2 } from "../boundingBox/Polygon2";
type PolygonWinding = "clockwise" | "counterclockwise";
export declare class Polygon2Helper {
    static testConvex(polygon: Polygon2): boolean;
    static isConvex(windung: PolygonWinding, crossProduct: number): boolean;
    static findWinding(polygon: Polygon2): PolygonWinding;
    static findArea(polygon: Polygon2): number;
    static translatePoint(point: Vector2, center: Vector2, angle?: number): Vector2;
    static translatePoints(points: Vector2[], center: Vector2, angle?: number): Vector2[];
}
export {};
