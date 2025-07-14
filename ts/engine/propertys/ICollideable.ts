import { Vector2 } from "../../math/Vector2";
import { Collision, HitBox } from "engine/physic";
import { IMoveable } from "./IMoveable";

export interface ICollideable<Box extends HitBox = HitBox> extends IMoveable {
  hitBox: Box;

  collider: CollideableBehaviour;
}

export class CollideableBehaviour {
  translatedPoints: Vector2[] = [];
  alreadyTranslated: boolean = false;

  constructor(private host: ICollideable) { };

  isCollidingWith(other: ICollideable): boolean {
    return Collision.testCollision(this.host, other);
  }

  translatePoints(): Vector2[] {
    return this.host.hitBox.translatePoints(this.host.pos, this.host.orientation)
  }
}
