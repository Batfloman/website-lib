import { Vector2 } from "math";
import { Util } from "myutil";
import { HitBox } from "./HitBox";

export type PolygonWinding = "clockwise" | "counterclockwise";

export class Polygon2 extends HitBox {
  // points relative to a (0|0) center with 0° rotation
  public model: Vector2[] = new Array();
  // quick access vars (need to set at initialization)
  public boundingRadius: number;
  public isConvex: boolean;

  constructor(model: Vector2[]) {
    super();

    this.model = model;
    this.boundingRadius = this.updateBoundingRadius();
    this.isConvex = Polygon2.testConvex(this);
  }

  private updateBoundingRadius() {
    let point_distances = this.model.map(p => p.getMagnitude());
    this.boundingRadius = Math.max(...point_distances);
    return this.boundingRadius;
  }

  private findCenter(): Vector2 {
    let center = new Vector2();

    for (let point of this.model) {
      center = center.add(point);
    }

    return center.scaleBy(1 / this.model.length);
  }

  /**
   * offsets all Points to match the focus point
   */
  centerModel(): void {
    // offset from current center
    const realCenter = this.findCenter();

    // move points
    this.model.forEach((point) => {
      point.x -= realCenter.x;
      point.y -= realCenter.y;
    });

    // update boundingRadius
    this.updateBoundingRadius()
  }

  // ==========================================================================================
  // from Super classes

  translatePoints(pos: Vector2, orientation: number): Vector2[] {
    return this.model.map(p => Vector2.setAngleAroundCenter(pos, p.add(pos), orientation));
  }

  isPointInside(point: Vector2): boolean {
    return Polygon2.isPointIndside(this, point);
  }

  // ==================================================
  // static

  static findArea(polygon: Polygon2): number {
    let area = 0;
    for (let i = 0; i < polygon.model.length; i++) {
      const a = polygon.model[i];
      const b = Util.array.getItemCyclic(polygon.model, i + 1);

      area += a.x * b.y;
      area -= a.y * b.x;
    }

    return area / 2;
  }

  static findWinding(polygon: Polygon2): PolygonWinding {
    return Polygon2.findArea(polygon) < 0 ? "clockwise" : "counterclockwise";
  }

  static testConvex(polygon: Polygon2): boolean {
    if (polygon.model.length <= 3) return true;

    const winding = Polygon2.findWinding(polygon);

    for (let i = 0; i < polygon.model.length; i++) {
      const a = Util.array.getItemCyclic(polygon.model, i - 1);
      const b = polygon.model[i]
      const c = Util.array.getItemCyclic(polygon.model, i + 1);

      const ba = a.subtract(b);
      const bc = c.subtract(b);

      if (!Polygon2.isConvex(winding, ba.crossProduct(bc))) return false;
    }
    return true;
  }

  static isConvex(windung: PolygonWinding, crossProduct: number) {
    if (windung == "clockwise" && crossProduct >= 0) return true;
    if (windung == "counterclockwise" && crossProduct <= 0) return true;
    return false;
  }

  /**
  *  Uses local koords to check if a point is "inside"
  */
  static isPointIndside(polygon: Polygon2, point: Vector2) {
    const winding = Polygon2.findWinding(polygon);

    for (let i = 0; i < polygon.model.length; i++) {
      const a = polygon.model[i];
      // ensure index `-1` and `n+1` are handled
      const b = Util.array.getItemCyclic(polygon.model, i - 1);

      const a_to_b = b.subtract(a);
      const a_to_p = point.subtract(a);

      const cross = a_to_b.crossProduct(a_to_p);

      if (!Polygon2.isConvex(winding, cross))
        return false;
    }
    return true;
  }
}
