import { Vector2 } from "../../math/Vector2";
import { HitBox } from "../boundingBox/HitBox";
import { IPositionable } from "./IPositionable";

export interface ICollideable extends IPositionable {
  hitBox: HitBox;
  orientation: number;

  translatedPoints: Vector2[];
  alreadyTranslated: boolean;

  isCollidingWith(other: ICollideable): boolean;
  translatePoints(): Vector2[];
}
