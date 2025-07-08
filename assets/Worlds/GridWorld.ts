import { Renderer } from "../../display/Renderer.js";
import { Input } from "../../input/Input.js";
import { Matrix2 } from "../../util/Matrix2.js";
import { Util } from "../../util/Util.js";
import { Vector2 } from "../../util/Vector2.js";
import { GridCell } from "../objects/GridCell.js";
import { RectangleWorld } from "./RectangleWorld.js";

export class GridWorld extends RectangleWorld {
  grid: Matrix2<Array<GridCell>>;

  xSize: number;
  ySize: number;

  cellWidth: number;
  cellHeight: number;

  constructor(width: number, height: number, xSize: number, ySize: number) {
    super(width, height);

    this.grid = new Matrix2(xSize, ySize);
    this.xSize = xSize;
    this.ySize = ySize;
    this.cellWidth = width / xSize;
    this.cellHeight = height / ySize;

    Input.newEventListener("resize", this, this.resize);
    this.resize();
  }

  private resize() {
    this.cellWidth = this.width / this.xSize;
    this.cellHeight = this.height / this.ySize;
  }

  clicked(worldPos: Vector2): void {
    const gridPos = this.findGridPosition(worldPos);

    if (this.grid.isCellEmpty(gridPos.x, gridPos.y)) return;

    const content = this.grid.get(gridPos.x, gridPos.y);

    if (typeof content === "string") return;

    for (let obj of content) {
      obj.notifyOfClick(worldPos);
    }
  }

  findGridPosition(worldPos: Vector2): Vector2 {
    const bottomLeft = new Vector2(
      this.pos.x - this.width / 2,
      this.pos.y - this.height / 2,
    )

    const offSet = worldPos.subtract(bottomLeft);

    const pos = new Vector2(
      Math.floor(offSet.x / this.cellWidth),
      Math.floor(offSet.y / this.cellHeight)
    ) 

    return pos;
  }

  render(renderer: Renderer): void {
    renderer.renderGrid(new Vector2(), this.xSize, this.ySize, this.cellWidth, this.cellHeight);
  }

  // override
  putObjectsInCunks(): void {
    this.putObjectsInGrid();

    super.putObjectsInCunks();
  }

  putObjectsInGrid() {
    const gridObjects: GridCell[] = this.findObjects<GridCell>(GridCell);

    for (let obj of gridObjects) {
      if (!obj.recentlyMoved) continue;

      this.removeFromGrid(obj);
      this.addToGrid(obj);
    }
  }

  addCell(cell: GridCell) {
    this.game.addObject(cell);

    cell.setGrid(this);
    cell.init(this.game, this.game.getCanvas());
    cell.recentlyMoved = true;
  }

  private removeFromGrid(obj: GridCell): undefined | GridCell {
    const pos = obj.gridPos;

    const content = this.grid.get(pos.x, pos.y);
    
    if (typeof content === "string") return;
    if(!content.includes(obj)) return;
    
    return Util.array.removeItem(content, obj);
  }

  private addToGrid(obj: GridCell): void {
    const pos = this.findGridPosition(obj.pos);
    obj.gridPos = pos;

    if (this.grid.isCellEmpty(pos.x, pos.y)) {
      this.grid.set(pos.x, pos.y, [obj]);
      return;
    }

    const content = this.grid.get(pos.x, pos.y);

    if (typeof content === "string") {
      this.grid.set(pos.x, pos.y, [obj]);
      return;
    }

    content.push(obj);
  }
}
