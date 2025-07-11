import { Util } from "../../util/Util";
import { Polygon2 } from "../boundingBox/Polygon2";
import { Polygon2Helper } from "./Polygon2Helper";
export class Triangulation {
    static triangulate(obj) {
        if (!(obj.hitBox instanceof Polygon2))
            throw new Error("other than polygon not implemented yet!");
        const vertices = obj.hitBox.model;
        const windung = Polygon2Helper.findWinding(obj.hitBox);
        const tirangles = [];
        const indexList = [];
        for (let i = 0; i < vertices.length; i++) {
            indexList.push(i);
        }
        while (indexList.length > 3) {
            for (let i = 0; i < indexList.length; i++) {
                const i1 = Util.array.getItem(indexList, i - 1);
                const i2 = Util.array.getItem(indexList, i);
                const i3 = Util.array.getItem(indexList, i + 1);
                const va = vertices[i1];
                const vb = vertices[i2];
                const vc = vertices[i3];
                const vb_to_va = va.subtract(vb);
                const vb_to_vc = vc.subtract(vb);
                if (!Polygon2Helper.isConvex(windung, vb_to_va.crossProduct(vb_to_vc)))
                    continue;
                let isEar = true;
                for (let j = 0; j < vertices.length; j++) {
                    if (j == i1 || j == i2 || j == i3)
                        continue;
                    let p = vertices[j];
                    if (Triangulation.isPointInTriangle(p, vb, va, vc)) {
                        isEar = false;
                        break;
                    }
                }
                if (!isEar)
                    continue;
                tirangles.push(new Triangle(obj.pos, new Polygon2([va, vb, vc]), obj.orientation));
                Util.array.removeItemAtIndex(indexList, i);
                break;
            }
        }
        tirangles.push(new Triangle(obj.pos, new Polygon2([vertices[indexList[0]], vertices[indexList[1]], vertices[indexList[2]]]), obj.orientation));
        return tirangles;
    }
    static isPointInTriangle(p, a, b, c) {
        const ab = b.subtract(a);
        const bc = c.subtract(b);
        const ca = a.subtract(c);
        const ap = p.subtract(a);
        const bp = p.subtract(b);
        const cp = p.subtract(c);
        const cross1 = ab.crossProduct(ap);
        const cross2 = bc.crossProduct(bp);
        const cross3 = ca.crossProduct(cp);
        if (cross1 < 0 || cross2 < 0 || cross3 < 0)
            return false;
        return true;
    }
}
class Triangle {
    constructor(pos, hitBox, angle = 0) {
        this.alreadyTranslated = false;
        this.pos = pos;
        this.hitBox = hitBox;
        this.orientation = angle;
    }
    isCollidingWith(other) {
        throw new Error("Method not implemented.");
    }
    translatePoints() {
        if (!this.alreadyTranslated) {
            this.translatedPoints = Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.orientation);
            this.alreadyTranslated = true;
        }
        return this.translatedPoints;
    }
}
