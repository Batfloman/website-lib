import { Camara } from "../../display/Camara.js";
import { Util } from "../../util/Util.js";
import { Vector2 } from "../../util/Vector2.js";
import { ICollideable } from "../property/ICollideable.js";

export class CircleCollision {
  static potentialCollision(obj1: ICollideable, obj2: ICollideable): boolean {
    return this.circleCollision(
      obj1.pos,
      obj1.hitBox.farthestDistance,
      obj2.pos,
      obj2.hitBox.farthestDistance
    );
  }

  static circleCollision(c1: Vector2, r1: number, c2: Vector2, r2: number): boolean {
    return Util.distance(c1, c2) < r1 + r2;
  }
}
