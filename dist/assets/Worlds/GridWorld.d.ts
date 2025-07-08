import { Renderer } from "../../display/Renderer";
import { Matrix2 } from "../../util/Matrix2";
import { Vector2 } from "../../util/Vector2";
import { GridCell } from "../objects/GridCell";
import { RectangleWorld } from "./RectangleWorld";
export declare class GridWorld extends RectangleWorld {
    grid: Matrix2<Array<GridCell>>;
    xSize: number;
    ySize: number;
    cellWidth: number;
    cellHeight: number;
    constructor(width: number, height: number, xSize: number, ySize: number);
    private resize;
    clicked(worldPos: Vector2): void;
    findGridPosition(worldPos: Vector2): Vector2;
    render(renderer: Renderer): void;
    putObjectsInCunks(): void;
    putObjectsInGrid(): void;
    addCell(cell: GridCell): void;
    private removeFromGrid;
    private addToGrid;
}
