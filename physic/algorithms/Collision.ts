import { Camara } from "../../display/Camara.js";
import { Circle } from "../boundingBox/Circle.js";
import { ICollideable } from "../property/ICollideable.js";
import { CircleCollision } from "./CircleCollision.js";
import { SAT } from "./SAT.js";
import { Triangulation } from "./Triangulation.js";

export class Collision {
  static testCollision(obj1: ICollideable, obj2: ICollideable): boolean {
    [obj1, obj2].forEach((obj) => obj.translatePoints());

    if (obj1.hitBox instanceof Circle || obj2.hitBox instanceof Circle) {
      return CircleCollision.potentialCollision(obj1, obj2);
    }

    if (!CircleCollision.potentialCollision(obj1, obj2)) return false;

    if (!obj1.hitBox.isConvex) {
      const parts = Triangulation.triangulate(obj1);
      for (let part of parts) {
        if (Collision.testCollision(part, obj2)) return true;
      }
      return false;
    }
    if (!obj2.hitBox.isConvex) {
      const parts = Triangulation.triangulate(obj2);
      for (let part of parts) {
        if (Collision.testCollision(obj1, part)) return true;
      }
      return false;
    }

    return SAT.testCollision(obj1, obj2);
  }
}
