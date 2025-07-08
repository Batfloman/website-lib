import { Util } from "../../util/Util";
import { Vector2 } from "../../math/Vector2";
import { Polygon2 } from "../boundingBox/Polygon2";
import { ICollideable } from "../propertys/ICollideable";
import { Polygon2Helper } from "./Polygon2Helper";

export class PointInPolygon {
  static isPointInsidePolygon(point: Vector2, polygon: ICollideable | Vector2[]) {
    const vertices = polygon instanceof Array ? polygon : polygon.translatePoints();

    const winding = Polygon2Helper.findWinding(new Polygon2(vertices));

    for (let i in vertices) {
      let index = Number.parseInt(i);

      const a = Util.array.getItem(vertices, index);
      const b = Util.array.getItem(vertices, index - 1);

      const a_to_b = b.subtract(a);
      const a_to_p = point.subtract(a);

      const cross = a_to_b.crossProduct(a_to_p);

      if (!Polygon2Helper.isConvex(winding, cross)) return false;
    }

    return true;
  }
}
