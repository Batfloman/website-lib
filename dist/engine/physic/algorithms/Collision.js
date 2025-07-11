import { Circle } from "../boundingBox/Circle";
import { CircleCollision } from "./CircleCollision";
import { SAT } from "./SAT";
import { Triangulation } from "./Triangulation";
export class Collision {
    static testCollision(obj1, obj2) {
        [obj1, obj2].forEach((obj) => obj.translatePoints());
        if (obj1.hitBox instanceof Circle || obj2.hitBox instanceof Circle) {
            return CircleCollision.potentialCollision(obj1, obj2);
        }
        if (!CircleCollision.potentialCollision(obj1, obj2))
            return false;
        if (!obj1.hitBox.isConvex) {
            const parts = Triangulation.triangulate(obj1);
            for (let part of parts) {
                if (Collision.testCollision(part, obj2))
                    return true;
            }
            return false;
        }
        if (!obj2.hitBox.isConvex) {
            const parts = Triangulation.triangulate(obj2);
            for (let part of parts) {
                if (Collision.testCollision(obj1, part))
                    return true;
            }
            return false;
        }
        return SAT.testCollision(obj1, obj2);
    }
}
