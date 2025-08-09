import { SceneContext } from "engine/core";
import { Renderer } from "engine/renderer";
import { IRenderable, IUpdateable } from "engine/propertys";

export abstract class Scene implements IUpdateable<SceneContext>, IRenderable {
	// optional
	onLoad?(): void;
	onUnload?(): void;

	abstract fixedUpdate?(dt: number, context: SceneContext): void;
	abstract update(dt: number, context: SceneContext): void;
	abstract render(renderer: Renderer): void;
}
