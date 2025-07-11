import { Vector2 } from "../../util/Vector2.js";
import { Polygon2 } from "./Polygon2.js";
export class Rectangle extends Polygon2 {
    constructor(width, height) {
        let model = [
            new Vector2(0, 0),
            new Vector2(0, height),
            new Vector2(width, height),
            new Vector2(width, 0),
        ];
        super(model);
        this.width = width;
        this.height = height;
        this.centerModel();
    }
}
