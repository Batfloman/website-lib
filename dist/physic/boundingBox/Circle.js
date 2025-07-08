import { Util } from "../../util/Util.js";
import { HitBox } from "./HitBox.js";
export class Circle extends HitBox {
    constructor(radius = 0) {
        super();
        this.radius = radius;
        this.isConvex = true;
        this.farthestDistance = radius;
    }
    translatePoints(pos, orientation) {
        return [
            Util.moveDirection(pos, orientation, this.radius),
            Util.moveDirection(pos, 360 - orientation, this.radius),
        ];
    }
    scale(scalar) {
        this.radius *= scalar;
    }
}
