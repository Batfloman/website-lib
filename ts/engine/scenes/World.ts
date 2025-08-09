import { Renderer } from "engine/renderer";
import { GameObject } from "../entities/GameObject";
import { Scene } from "./Scene";
import { GameContext, SceneContext } from "engine/core";

export class World implements Scene {
	private objects: Set<GameObject> = new Set();

	addObject(obj: GameObject) {
		this.objects.add(obj);
	}

	fixedUpdate(dt: number, context: GameContext): void {
		const sceneContext: SceneContext = { ...context, scene: this, };
		for (const obj of this.objects) {
			if (obj.fixedUpdate) obj.fixedUpdate(dt, sceneContext)
		};
	}

	update(dt: number, context: GameContext) {
		const sceneContext: SceneContext = { ...context, scene: this, };
		for (const obj of this.objects) {
			if (obj.update) obj.update(dt, sceneContext)
		};
	}

	render(renderer: Renderer) {
		for (const obj of this.objects) obj.render(renderer);
	}
}
