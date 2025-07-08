import { Util } from "../../util/Util";
import { Vector2 } from "../../util/Vector2";
import { World } from "./World";
export class CircleWorld extends World {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    isInsideWorld(point) {
        return Util.distance(new Vector2(), point) < this.radius;
    }
    render(renderer) {
        renderer.renderCircle(new Vector2(), this.radius);
    }
}
