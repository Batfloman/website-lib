import { Vector2 } from "math";
import { Polygon2 } from "../boundingBox/Polygon2";

// simple ICollideable Object to store;
export class Triangle extends Polygon2 {
  constructor(p1: Vector2, p2: Vector2, p3: Vector2) {
    let model = [
      p1, p2, p3
    ]
    super(model);

    this.centerModel();
  }
}
