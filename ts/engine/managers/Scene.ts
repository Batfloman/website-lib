import { Renderer } from "engine/display";
import { GameObject } from "../entities/GameObject";

export class Scene {
	private objects: Set<GameObject> = new Set();
	// public readonly cameras: 
	// public readonly camera: Camera;

	addObject(obj: GameObject) {
		this.objects.add(obj);
	}

	update(dt: number) {
		for (const obj of this.objects) obj.update(dt);
	}

	render(renderer: Renderer) {
		for (const obj of this.objects) obj.render(renderer);
	}
}
