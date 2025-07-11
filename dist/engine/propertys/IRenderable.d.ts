import { Renderer } from "./Renderer.js";
export interface IRenderable {
    render(renderer: Renderer): void;
    shouldRender(): boolean;
}
