import { Rectangle } from "../../physic/boundingBox/Rectangle";
import { Vector2 } from "../../util/Vector2";
import { GridWorld } from "../worlds/GridWorld";
import { WorldObject } from "./WorldObject";
export declare abstract class GridCell extends WorldObject<Rectangle> {
    grid: GridWorld;
    gridPos: Vector2;
    update(dt: number): void;
    constructor(grid?: GridWorld, gridPos?: Vector2);
    testMoveInGrid(x: number, y: number): boolean;
    isInGrid(x?: any, y?: any): boolean;
    moveInGrid(x: number, y: number): void;
    setGrid(grid: GridWorld): void;
    setGridPos(x: number, y: number): void;
    getWorldPos(): Vector2;
}
