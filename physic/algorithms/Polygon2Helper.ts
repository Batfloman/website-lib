import { Util } from "../../util/Util.js";
import { Vector2 } from "../../util/Vector2.js";
import { Polygon2 } from "../boundingBox/Polygon2.js";

type PolygonWinding = "clockwise" | "counterclockwise";

export class Polygon2Helper {
  /**
   * Test a polygon for convexity
   */
  static testConvex(polygon: Polygon2): boolean {
    if (polygon.model.length <= 3) return true;

    const winding = Polygon2Helper.findWinding(polygon);

    for (let i = 0; i < polygon.model.length; i++) {
      const a = Util.array.getItem(polygon.model, i - 1);
      const b = Util.array.getItem(polygon.model, i);
      const c = Util.array.getItem(polygon.model, i + 1);

      const ba = a.subtract(b);
      const bc = c.subtract(b);

      if (!Polygon2Helper.isConvex(winding, ba.crossProduct(bc))) return false;
    }
    return true;
  }

  /**
   * test a vertex for Convexity
   */
  static isConvex(windung: PolygonWinding, crossProduct: number) {
    if (windung == "clockwise" && crossProduct >= 0) return true;
    if (windung == "counterclockwise" && crossProduct <= 0) return true;
    return false;
  }

  /**
   * Returns the winding of an Polygon
   */
  static findWinding(polygon: Polygon2): PolygonWinding {
    return this.findArea(polygon) < 0 ? "clockwise" : "counterclockwise";
  }

  static findArea(polygon: Polygon2): number {
    let area = 0;
    for (let i = 0; i < polygon.model.length; i++) {
      const a = Util.array.getItem(polygon.model, i);
      const b = Util.array.getItem(polygon.model, i + 1);

      area += a.x * b.y;
      area -= a.y * b.x;
    }

    return area / 2;
  }

  /**
   * Translates a point and returns the new Position
   */
  static translatePoint(point: Vector2, center: Vector2, angle: number = 0): Vector2 {
    return Util.rotateAroundCenter(center, point.add(center), angle);
  }
  static translatePoints(points: Vector2[], center: Vector2, angle: number = 0): Vector2[] {
    const translated: Vector2[] = [];

    points.forEach((point) => {
      translated.push(Util.rotateAroundCenter(center, point.add(center), angle));
    });

    return translated;
  }
}
