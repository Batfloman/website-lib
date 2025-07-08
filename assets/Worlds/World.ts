import { SceneObject } from "../objects/SceneObject.js";
import { Vector2 } from "../../util/Vector2.js";
import { Util } from "../../util/Util.js";
import { IRenderable } from "../../display/IRenderable.js";
import { Renderer } from "../../display/Renderer.js";
import { Color } from "../../util/Color.js";
import { HitBox } from "../../physic/boundingBox/HitBox.js";
import { TwoKeyMap } from "../../util/TwoKeyMap.js";
import { Chunk } from "./Chunk.js";
import { WorldObject } from "../objects/WorldObject.js";
import { Game } from "../../games/Game.js";

export class World implements IRenderable {
  protected game!: Game;

  public pos: Vector2;
  public objects: SceneObject[] = [];

  constructor(pos: Vector2 = new Vector2(), backgroundColor: Color = Color.get("white")) {
    this.pos = pos;
    this.backgroundColor = backgroundColor;
  }

  clicked(worldPos: Vector2) {
    const chunkPos = this.findChunkOfPos(worldPos);
    const chunk = this.getChunk(chunkPos.x, chunkPos.y);
    if(!chunk) return;

    for(let obj of chunk.objects) {
      obj.notifyOfClick(worldPos);
    }
  }

  init(game: Game) {
    this.game = game;
  }

  // ==========================================================================================
  // #region positioning, collision...

  isInsideWorld(point: Vector2): boolean {
    // this World is infinit
    return true;
  }

  //#endregion

  // ==========================================================================================
  // #region render

  private backgroundColor: Color;

  shouldRender(): boolean {
    return true;
  }

  render(renderer: Renderer): void {
    renderer.setStrokeColor(this.backgroundColor);
    renderer.setFillColor(this.backgroundColor);
    renderer.renderStaticRectangle("center", "100%", "100%");
  }

  setBackground(color: Color) {
    this.backgroundColor = color;
  }

  //#endregion

  // ==========================================================================================
  // #region objects

  addObject(obj: SceneObject): void {
    if (this.objects.includes(obj)) return;

    this.objects.push(obj);
    this.addToMap(obj);

    if (obj instanceof WorldObject) {
      this.addToChunks(obj);
      obj.setWorld(this);
    }
  }

  removeObject(obj: SceneObject): SceneObject | undefined {
    const removed = Util.array.removeItem(this.objects, obj);
    this.removeFromMap(obj);

    if (obj instanceof WorldObject) {
      const chunk = obj.getChunk();
      chunk.removeObject(obj);
    }

    return removed;
  }

  findObjects<T extends SceneObject>(clas: string | Function, exclude?: T | T[]): T[] {
    const clasName = clas instanceof Function ? clas.name : clas;
    const objects = this.objectMap.get(clasName);
    if (!objects) return [];

    // copy and work with values
    const values = Util.array.copyOf(objects);

    if (exclude instanceof Object && values?.includes(exclude as T)) {
      Util.array.removeItem(values, exclude as T);
    } else if (exclude instanceof Array) {
      for (let ex of exclude) {
        Util.array.removeItem(values, ex);
      }
    }

    return values as Array<T>;
  }

  findObjectsInNeighbouringChunks<T extends WorldObject<HitBox>>(
    chunk: Chunk,
    clas: string | Function,
    exclude?: T | T[],
    distance: number = 1,
    rectStyle = true
  ): T[] {
    const neighbours = this.findNeighbourChunksOf(chunk, distance, rectStyle);
    let found: T[] = [];

    for (let chunk of neighbours) {
      found = found.concat(chunk.findObjects(clas, exclude));
    }

    return found as Array<T>;
  }

  //#endregion

  // ==========================================================================================
  // #region map

  // sorted Objects after class: <className, [Objects]>
  private objectMap: Map<string, SceneObject[]> = new Map();

  private addToMap(obj: SceneObject): void {
    const classes = Util.object.findAllClassNames(obj);

    for (let clasz of classes) {
      const previousValues = this.objectMap.get(clasz);
      let values: SceneObject[] = !previousValues ? [] : previousValues;
      values.push(obj);
      this.objectMap.set(clasz, values);
    }
  }

  private removeFromMap(obj: SceneObject): void {
    const classes = Util.object.findAllClassNames(obj);

    for (let clasz of classes) {
      const values = this.objectMap.get(clasz);
      if (!values) continue;

      Util.array.removeItem(values, obj);

      if (Util.array.isEmpty(values)) this.objectMap.delete(clasz);
    }
  }

  //#endregion

  // ==========================================================================================
  // #region chunks

  private chunkSize: number = 100;
  private chunks: TwoKeyMap<number, number, Chunk> = new TwoKeyMap();

  putObjectsInCunks(): void {
    const worldObjects: WorldObject<HitBox>[] = this.findObjects<WorldObject<HitBox>>(WorldObject);

    for (let obj of worldObjects) {
      if (!obj.recentlyMoved) continue;

      this.removeFromChunks(obj);
      this.addToChunks(obj);
    }
  }

  private addToChunks(obj: WorldObject<HitBox>): void {
    const chunk = this.findChunkOf(obj);
    this.addToChunk(chunk.x, chunk.y, obj);
  }

  private removeFromChunks(obj: WorldObject<HitBox>) {
    const chunk = obj.getChunk();
    chunk.removeObject(obj);

    if (!chunk.objects || Util.array.isEmpty(chunk.objects)) {
      this.chunks.delete(chunk.keys.x, chunk.keys.y);
    }
  }

  // adds Object at specific chunk
  private addToChunk(x: number, y: number, obj: WorldObject<HitBox>): void {
    let content = this.chunks.get(x, y);

    if (!(content instanceof Chunk)) {
      content = new Chunk(x, y, obj);
      this.chunks.set(x, y, content);
    }

    content.addObject(obj);
    obj.setChunk(content);
  }

  findChunkOf(obj: WorldObject<HitBox>): Vector2 {
    return this.findChunkOfPos(obj.pos);
  }

  findChunkOfPos(pos: Vector2): Vector2 {
    return new Vector2(Math.floor(pos.x / this.chunkSize), Math.floor(pos.y / this.chunkSize));
  }

  findNeighbourChunksOf(chunk: Chunk, distance: number = 1, rectangleStlye = true): Chunk[] {
    if (!rectangleStlye) {
      console.warn("Circle Style not implemented!");
      return [];
    }

    const found: Chunk[] = [];

    for (let x = -distance + chunk.keys.x; x <= distance + chunk.keys.x; x++) {
      for (let y = -distance + chunk.keys.y; y <= distance + chunk.keys.y; y++) {
        const chunk = this.chunks.get(x, y);
        if (!chunk) continue;
        found.push(chunk);
      }
    }

    return found;
  }

  getChunk(x: number, y: number): Chunk | undefined {
    return this.chunks.get(x, y);
  }

  setChunkSize(size: number) {
    this.chunkSize = size;
  }

  //#endregion
}
