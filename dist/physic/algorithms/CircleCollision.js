import { Util } from "../../util/Util";
export class CircleCollision {
    static potentialCollision(obj1, obj2) {
        return this.circleCollision(obj1.pos, obj1.hitBox.farthestDistance, obj2.pos, obj2.hitBox.farthestDistance);
    }
    static circleCollision(c1, r1, c2, r2) {
        return Util.distance(c1, c2) < r1 + r2;
    }
}
