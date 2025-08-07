import { Renderer } from "engine/display";
import { GameObject } from "../entities/GameObject";
import { Scene } from "./Scene";

export class World implements Scene {
	private objects: Set<GameObject> = new Set();

	addObject(obj: GameObject) {
		this.objects.add(obj);
	}

	fixedUpdate(dt: number): void {
		for (const obj of this.objects) obj.fixedUpdate(dt);
	}

	update(dt: number) {
		for (const obj of this.objects) obj.update(dt);
	}

	render(renderer: Renderer) {
		for (const obj of this.objects) obj.render(renderer);
	}
}
