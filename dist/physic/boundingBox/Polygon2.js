import { Util } from "../../util/Util";
import { Vector2 } from "../../math/Vector2";
import { Polygon2Helper } from "../algorithms/Polygon2Helper";
import { HitBox } from "./HitBox";
export class Polygon2 extends HitBox {
    constructor(model) {
        super();
        this.model = new Array();
        this.model = model;
        this.farthestDistance = Util.farthestPoint(new Vector2(), this.model).getMagnitude();
        this.isConvex = Polygon2Helper.testConvex(this);
    }
    centerModel() {
        const realCenter = this.findCenter();
        this.model.forEach((point) => {
            point.x -= Util.math.round(realCenter.x, 2);
            point.y -= Util.math.round(realCenter.y, 2);
        });
        this.farthestDistance = Util.farthestPoint(new Vector2(), this.model).getMagnitude();
    }
    findCenter() {
        let center = new Vector2();
        for (let point of this.model) {
            center = center.add(point);
        }
        return center.scale(1 / this.model.length);
    }
    translatePoints(pos, orientation) {
        return Polygon2Helper.translatePoints(this.model, pos, orientation);
    }
    scale(scalar) {
        this.model.forEach((point) => {
            point = point.scale(scalar);
        });
    }
}
