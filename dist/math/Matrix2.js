import { Util } from "../util/Util";
export class Matrix2 {
    constructor(x, y) {
        this.cells = [];
        this.xSize = x;
        this.ySize = y;
        for (let i = 0; i < y; i++) {
            let arr = [];
            for (let j = 0; j < x; j++) {
                arr.push("[]");
            }
            this.cells.push(arr);
        }
    }
    isCellEmpty(x, y) {
        return this.get(x, y) === "[]";
    }
    clearCell(x, y) {
        this.set(x, y, "[]");
    }
    get(x, y) {
        const yIndex = this.ySize - y - 1;
        return Util.array.getItem(Util.array.getItem(this.cells, yIndex), x);
    }
    set(x, y, content) {
        if (x < 0 || x >= this.getSizeX()) {
            console.warn(`${x} is out of Bounds!`);
            return;
        }
        if (y < 0 || y >= this.getSizeY()) {
            console.warn(`${y} is out of Bounds!`);
            return;
        }
        const yIndex = this.ySize - y - 1;
        this.cells[yIndex][x] = content;
    }
    getSizeX() {
        return this.xSize;
    }
    getSizeY() {
        return this.ySize;
    }
}
