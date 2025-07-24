import { Util } from "myutil";
import { Vector2 } from "math";
import { CollideableBehaviour, ICollideable, RotateBehaviour } from "engine/propertys";
import { TranslationBehavior } from "engine/propertys/ITranslateable";
import { Polygon2 } from "../boundingBox/Polygon2";
import { Triangle } from "../boundingBox/Triangle";

export class Triangulation {
  static triangulate(obj: ICollideable): ICollideable[] {
    if (!(obj.hitBox instanceof Polygon2))
      throw new Error("other than polygon not implemented yet!");

    const vertices = obj.hitBox.model;
    const windung = Polygon2.findWinding(obj.hitBox);

    const ears: Ear[] = [];

    const indexList: number[] = [];
    for (let i = 0; i < vertices.length; i++) {
      indexList.push(i);
    }

    while (indexList.length > 3) {
      for (let i = 0; i < indexList.length; i++) {
        const i1 = Util.array.getItemCyclic(indexList, i - 1);
        const i2 = indexList[i]
        const i3 = Util.array.getItemCyclic(indexList, i + 1);

        const va = vertices[i1];
        const vb = vertices[i2];
        const vc = vertices[i3];

        const vb_to_va = va.subtract(vb);
        const vb_to_vc = vc.subtract(vb);

        // Is ear test vertex convex?
        if (!Polygon2.isConvex(windung, vb_to_va.crossProduct(vb_to_vc))) continue;

        let isEar = true;

        // Does test ear contain any polygon vertecies?
        for (let j = 0; j < vertices.length; j++) {
          if (j == i1 || j == i2 || j == i3) continue;

          let p = vertices[j];

          if (Triangulation.isPointInTriangle(p, vb, va, vc)) {
            isEar = false;
            break;
          }
        }

        if (!isEar) continue;

        const ear = new Ear(obj.pos, new Triangle(va, vb, vc), obj.orientation)
        ears.push(ear);

        Util.array.removeItemAtIndex(indexList, i);
        break;
      }
    }

    const last_triangle = new Triangle(vertices[indexList[0]], vertices[indexList[1]], vertices[indexList[2]]);
    const last_ear = new Ear(obj.pos, last_triangle, obj.orientation)
    ears.push(last_ear)

    return ears;
  }

  private static isPointInTriangle(p: Vector2, a: Vector2, b: Vector2, c: Vector2): boolean {
    const ab = b.subtract(a);
    const bc = c.subtract(b);
    const ca = a.subtract(c);

    const ap = p.subtract(a);
    const bp = p.subtract(b);
    const cp = p.subtract(c);

    const cross1 = ab.crossProduct(ap);
    const cross2 = bc.crossProduct(bp);
    const cross3 = ca.crossProduct(cp);

    if (cross1 < 0 || cross2 < 0 || cross3 < 0) return false;
    return true;
  }
}

class Ear implements ICollideable {
  pos: Vector2;
  mover: TranslationBehavior = new TranslationBehavior(this);
  collider: CollideableBehaviour = new CollideableBehaviour(this);
  rotator: RotateBehaviour = new RotateBehaviour(this);
  hitBox: Triangle;
  orientation: number;

  constructor(pos: Vector2, hitBox: Triangle, orientation: number = 0) {
    this.pos = pos;
    this.hitBox = hitBox;
    this.orientation = orientation
  }

  translatedPoints: Vector2[] = [];
  alreadyTranslated: boolean = false;

  translatePoints(): Vector2[] {
    if (this.alreadyTranslated) return this.translatedPoints;

    this.translatedPoints = this.hitBox.translatePoints(this.pos, this.orientation);
    this.alreadyTranslated = true
    return this.translatedPoints;
  }
}
