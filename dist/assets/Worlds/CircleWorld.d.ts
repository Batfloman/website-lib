import { Renderer } from "../../display/Renderer";
import { Vector2 } from "../../util/Vector2";
import { World } from "./World";
export declare class CircleWorld extends World {
    radius: number;
    constructor(radius: number);
    isInsideWorld(point: Vector2): boolean;
    render(renderer: Renderer): void;
}
