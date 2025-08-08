import { Renderer } from "engine/renderer";

export interface IRenderable {
	render(renderer: Renderer): void;
	shouldRender?(): boolean;
}
