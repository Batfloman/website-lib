import { Vector2 } from "../../math/Vector2";
import { Renderer, RenderArgs } from "./Renderer";
export declare class CanvasRenderer extends Renderer {
    protected canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement);
    renderLine(pos1: Vector2, pos2: Vector2, args?: RenderArgs): void;
    renderCircle(pos: Vector2, radius: number, args?: RenderArgs): void;
    renderRectangle(pos: Vector2, pos2: Vector2, args?: RenderArgs): void;
}
