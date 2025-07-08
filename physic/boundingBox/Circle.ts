import { Util } from "../../util/Util.js";
import { Vector2 } from "../../util/Vector2.js";
import { HitBox } from "./HitBox.js";

export class Circle extends HitBox {
  radius: number;

  constructor(radius: number = 0) {
    super();
    this.radius = radius;
    this.isConvex = true;
    this.farthestDistance = radius;
  }

  // ==========================================================================================
  // from Super classes

  translatePoints(pos: Vector2, orientation: number): Vector2[] {
    return [
      Util.moveDirection(pos, orientation, this.radius),
      Util.moveDirection(pos, 360 - orientation, this.radius),
    ];
  }
  scale(scalar: number): void {
    this.radius *= scalar;
  }
}
