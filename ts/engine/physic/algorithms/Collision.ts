import { Vector2 } from "math";
import { Util } from "util";
import { Circle } from "../boundingBox/Circle";

import { ICollideable } from "engine/propertys";
import { SAT } from "./SAT";
import { Triangulation } from "./Triangulation";

export namespace Collision {
  export function testCollision(obj1: ICollideable, obj2: ICollideable): boolean {
    [obj1, obj2].forEach((obj) => obj.collider.translatePoints());

    if (obj1.hitBox instanceof Circle || obj2.hitBox instanceof Circle) {
      return potentialCollision(obj1, obj2);
    }

    if (!potentialCollision(obj1, obj2)) return false;

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

  export function isPointInside(obj: ICollideable, worldPoint: Vector2): boolean {
    // transform in koordinates relative to the hitbox 
    const localPoint = Vector2.setAngleAroundCenter(obj.pos, worldPoint, -obj.orientation);
    return obj.hitBox.isPointInside(localPoint);
  }

  export function potentialCollision(obj1: ICollideable, obj2: ICollideable): boolean {
    return circleCollision(
      obj1.pos,
      obj1.hitBox.boundingRadius,
      obj2.pos,
      obj2.hitBox.boundingRadius
    );
  }

  export function circleCollision(c1: Vector2, r1: number, c2: Vector2, r2: number): boolean {
    return Util.vector.distance(c1, c2) < r1 + r2;
  }
}
