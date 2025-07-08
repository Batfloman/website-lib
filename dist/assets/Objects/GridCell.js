import { Rectangle } from "../../physic/boundingBox/Rectangle";
import { Vector2 } from "../../util/Vector2";
import { WorldObject } from "./WorldObject";
export class GridCell extends WorldObject {
    update(dt) {
        this.pos = this.getWorldPos();
    }
    constructor(grid, gridPos) {
        super(new Vector2(), new Rectangle(10, 10), 0);
        this.gridPos = new Vector2();
        if (grid)
            this.grid = grid;
        if (gridPos)
            this.gridPos = gridPos;
        if (grid && gridPos) {
            this.pos = this.getWorldPos();
        }
    }
    testMoveInGrid(x, y) {
        return this.isInGrid(this.gridPos.x + x, this.gridPos.y + y);
    }
    isInGrid(x = this.gridPos.x, y = this.gridPos.y) {
        return x >= 0 && x < this.grid.xSize && y <= 0 && y > -this.grid.ySize;
    }
    moveInGrid(x, y) {
        this.gridPos.x += x;
        this.gridPos.y += y;
    }
    setGrid(grid) {
        this.grid = grid;
    }
    setGridPos(x, y) {
        this.gridPos.x = x;
        this.gridPos.y = y;
        this.pos = this.getWorldPos();
    }
    getWorldPos() {
        const bottomLeft = new Vector2(this.grid.pos.x - this.grid.width / 2, this.grid.pos.x - this.grid.height / 2);
        const posRelativeTopLeft = new Vector2(this.gridPos.x * this.grid.cellWidth + this.grid.cellWidth / 2, this.gridPos.y * this.grid.cellHeight + this.grid.cellHeight / 2);
        return posRelativeTopLeft.add(bottomLeft);
    }
}
