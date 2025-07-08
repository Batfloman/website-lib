import { Camara } from "../../display/Camara.js";
import { Collision } from "../../physic/algorithms/Collision.js";
import { HitBox } from "../../physic/boundingBox/HitBox.js";
import { ICollideable } from "../../physic/property/ICollideable.js";
import { IMoveable } from "../../physic/property/IMoveable.js";
import { Util } from "../../util/Util.js";
import { Vector2 } from "../../util/Vector2.js";
import { Chunk } from "../worlds/Chunk.js";
import { World } from "../worlds/World.js";
import { SceneObject } from "./SceneObject.js";

export abstract class WorldObject<HitBoxType extends HitBox>
  extends SceneObject
  implements ICollideable, IMoveable
{
  constructor(pos: Vector2, hitBox: HitBoxType, angle = 0) {
    super();

    this.pos = pos;
    this.hitBox = hitBox;
    this.orientation = angle;
  }

  abstract update(dt: number): void;

  shouldUpdate(): boolean {
    return true;
  }
  shouldRender(): boolean {
    return this.isCollidingWith(this.camara);
  }

  notifyOfClick(worldPos: Vector2): void {}

  // ==========================================================================================
  //#region world

  protected world!: World;
  protected chunk: Chunk = new Chunk();
  recentlyMoved: boolean = true;

  setWorld(world: World): void {
    this.world = world;
    this.recentlyMoved = true;
  }

  setChunk(chunk: Chunk): void {
    this.chunk = chunk;
    this.recentlyMoved = false;
  }

  getChunk(): Chunk {
    return this.chunk;
  }

  //#endregion

  // ==========================================================================================
  // #region collision and so

  pos: Vector2;
  hitBox: HitBoxType;
  orientation: number;
  translatedPoints!: Vector2[];
  alreadyTranslated: boolean = false;

  translatePoints(): Vector2[] {
    if (this.alreadyTranslated) return this.translatedPoints;

    this.translatedPoints = this.hitBox.translatePoints(this.pos, this.orientation);
    return this.translatedPoints;
  }

  isCollidingWith(other: ICollideable): boolean {
    return Collision.testCollision(this, other);
  }

  //#endregion

  // ==========================================================================================
  // #region move Object

  rotate(angle: number) {
    this.orientation += angle;
    this.orientation %= 360;

    this.alreadyTranslated = false;
  }
  moveDirection(direction: number, distance: number): void {
    this.move(Util.toVector(direction, distance));
  }
  move(move: Vector2): void {
    this.pos = this.pos.add(move);

    this.alreadyTranslated = false;
    this.recentlyMoved = true;
  }

  //#endregion
}
