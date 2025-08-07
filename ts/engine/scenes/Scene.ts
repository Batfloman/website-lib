import { Renderer } from "engine/display";
import { IRenderable, IUpdateable } from "engine/propertys";

export abstract class Scene implements IUpdateable, IRenderable {
	// optional
	onLoad?(): void;
	onUnload?(): void;

	abstract fixedUpdate(dt: number): void;
	abstract update(dt: number): void;
	abstract render(renderer: Renderer): void;
}
