import { HitBox } from "../../physic/boundingBox/HitBox.js";
import { Util } from "../../util/Util.js";
import { WorldObject } from "../objects/WorldObject.js";

export class Chunk {
  public objects: WorldObject<HitBox>[] = [];

  public keys = {
    x: 0,
    y: 0,
  };

  constructor(x: number = 0, y: number = 0, ...objects: WorldObject<HitBox>[]) {
    this.keys.x = x;
    this.keys.y = y;

    this.objects = objects;

    for (let obj of objects) {
      this.addToMap(obj);
    }
  }

  // ==========================================================================================
  // #region objects

  addObject(obj: WorldObject<HitBox>): void {
    if (this.objects.includes(obj)) return;

    this.objects.push(obj);
    this.addToMap(obj);
  }

  removeObject(obj: WorldObject<HitBox>): WorldObject<HitBox> | undefined {
    this.removeFromMap(obj);

    return Util.array.removeItem(this.objects, obj);
  }

  findObjects<T extends WorldObject<HitBox>>(clas: string | Function, exclude?: T | T[]): T[] {
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

  //#endregion

  // ==========================================================================================
  // #region map

  // sorted Objects after class: <className, [Objects]>
  private objectMap: Map<string, WorldObject<HitBox>[]> = new Map();

  private addToMap(obj: WorldObject<HitBox>): void {
    const classes = Util.object.findAllClassNames(obj);

    for (let clasz of classes) {
      const previousValues = this.objectMap.get(clasz);
      let values: WorldObject<HitBox>[] = !previousValues ? [] : previousValues;
      values.push(obj);
      this.objectMap.set(clasz, values);
    }
  }

  private removeFromMap(obj: WorldObject<HitBox>): void {
    const classes = Util.object.findAllClassNames(obj);

    for (let clasz of classes) {
      const values = this.objectMap.get(clasz);
      if (!values) continue;

      Util.array.removeItem(values, obj);

      if (Util.array.isEmpty(values)) this.objectMap.delete(clasz);
    }
  }

  //#endregion
}
