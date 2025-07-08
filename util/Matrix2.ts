import { Util } from "./Util.js";

export class Matrix2<T> {
  private cells: Array<Array<T | string>>;

  private xSize: number;
  private ySize: number;

  constructor(x: number, y: number) {
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

  isCellEmpty(x: number, y: number): boolean {
    return this.get(x, y) === "[]";
  }

  clearCell(x: number, y: number): void {
    this.set(x, y, "[]");
  }

  get(x: number, y: number): T | string {
    const yIndex = this.ySize - y - 1;

    return Util.array.getItem(Util.array.getItem(this.cells, yIndex), x);
  }

  set(x: number, y: number, content: string | T): void {
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

  getSizeX(): number {
    return this.xSize;
  }

  getSizeY(): number {
    return this.ySize;
  }
}
