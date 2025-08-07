import { Renderer } from "engine/display";

export abstract class Scene {
	// optional
	onLoad?(): void;
	onUnload?(): void;

	abstract fixedUpdate(dt: number): void;
	abstract update(dt: number): void;
	abstract render(renderer: Renderer): void;
}
