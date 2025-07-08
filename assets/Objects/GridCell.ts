import { Rectangle } from "../../physic/boundingBox/Rectangle.js";
import { Vector2 } from "../../util/Vector2.js";
import { GridWorld } from "../worlds/GridWorld.js";
import { WorldObject } from "./WorldObject.js";

export abstract class GridCell extends WorldObject<Rectangle> {
  grid!: GridWorld;

  gridPos: Vector2 = new Vector2();

  update(dt: number): void {
    this.pos = this.getWorldPos();
  }

  constructor(grid?: GridWorld, gridPos?: Vector2) {
    super(new Vector2(), new Rectangle(10, 10), 0);

    if (grid) this.grid = grid;
    if (gridPos) this.gridPos = gridPos;

    if (grid && gridPos) {
      this.pos = this.getWorldPos();
    }
  }

  testMoveInGrid(x: number, y: number): boolean {
    return this.isInGrid(this.gridPos.x + x, this.gridPos.y + y);
  }

  isInGrid(x = this.gridPos.x, y = this.gridPos.y): boolean {
    return x >= 0 && x < this.grid.xSize && y <= 0 && y > -this.grid.ySize;
  }

  moveInGrid(x: number, y: number): void {
    this.gridPos.x += x;
    this.gridPos.y += y;
  }

  setGrid(grid: GridWorld) {
    this.grid = grid;
  }

  setGridPos(x: number, y: number) {
    this.gridPos.x = x;
    this.gridPos.y = y;

    this.pos = this.getWorldPos();
  }

  getWorldPos(): Vector2 {
    const bottomLeft = new Vector2(
      this.grid.pos.x - this.grid.width / 2,
      this.grid.pos.x - this.grid.height / 2
    );

    const posRelativeTopLeft = new Vector2(
      this.gridPos.x * this.grid.cellWidth + this.grid.cellWidth / 2,
      this.gridPos.y * this.grid.cellHeight  + this.grid.cellHeight / 2
    );

    return posRelativeTopLeft.add(bottomLeft);
  }
}
