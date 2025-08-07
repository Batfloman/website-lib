import { Renderer } from "engine/display";

export interface IRenderable {
	render(renderer: Renderer): void;
	shouldRender?(): boolean;
}
