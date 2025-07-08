import { Renderer } from "../../display/Renderer";
import { Util } from "../../util/Util";
import { Vector2 } from "../../util/Vector2";
import { World } from "./World";

export class CircleWorld extends World {
  radius: number;

  constructor(radius: number) {
    super();

    this.radius = radius;
  }

  isInsideWorld(point: Vector2): boolean {
    return Util.distance(new Vector2(), point) < this.radius;
  }

  render(renderer: Renderer): void {
    renderer.renderCircle(new Vector2(), this.radius);
  }
}
