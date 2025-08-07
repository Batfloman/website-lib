import { Renderer } from "engine/display";

export interface Scene {
	fixedUpdate(dt: number): void;
	update(dt: number): void;
	render(renderer: Renderer): void;
}
