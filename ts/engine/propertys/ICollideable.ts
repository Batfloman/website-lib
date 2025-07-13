import { Vector2 } from "../../math/Vector2";
import { HitBox } from "engine/physic";
import { IMoveable } from "./IMoveable";

export interface ICollideable extends IMoveable {
  hitBox: HitBox;
  orientation: number;

  translatedPoints: Vector2[];
  alreadyTranslated: boolean;

  // isCollidingWith(other: ICollideable): boolean;
  translatePoints(): Vector2[];
}
