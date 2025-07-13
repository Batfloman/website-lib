import { Vector2 } from "math/Vector2.js";
import { Polygon2 } from "./Polygon2.js";

export class Rectangle extends Polygon2 {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    super([ // model
      new Vector2(0, 0),
      new Vector2(0, height),
      new Vector2(width, height),
      new Vector2(width, 0),
    ]);
    this.centerModel(); // ensure model is centered

    this.width = width;
    this.height = height;
  }
}
