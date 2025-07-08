import { Renderer } from "../../display/Renderer";
import { Vector2 } from "../../util/Vector2";
import { World } from "./World";
export declare class RectangleWorld extends World {
    width: number;
    height: number;
    constructor(width: number, height: number);
    isInsideWorld(point: Vector2): boolean;
    render(renderer: Renderer): void;
}
