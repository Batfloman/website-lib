import { Scene } from "engine/scenes";
import { Renderer } from "engine/renderer";
import { IUpdateable } from "engine/propertys";

export class SceneManager implements IUpdateable {
	private sceneMap: Map<string, Scene> = new Map();
	private activeScenes: Scene[] = [];

	addScene(name: string, scene: Scene) {
		this.sceneMap.set(name, scene);
	}

	enableScene(name: string) {
		const scene = this.sceneMap.get(name);
		if (scene && !this.activeScenes.includes(scene)) {
			this.activeScenes.push(scene);
			scene.onLoad?.(); // optionaler Hook
		}
	}

	disableScene(name: string) {
		const scene = this.sceneMap.get(name);
		if (scene) {
			this.activeScenes = this.activeScenes.filter(s => s !== scene);
			scene.onUnload?.(); // optionaler Hook
		}
	}

	clearScenes() {
		for (const scene of this.activeScenes) {
			scene.onUnload?.();
		}
		this.activeScenes = [];
	}

	fixedUpdate(dt: number) {
		for (const scene of this.activeScenes) {
			scene.fixedUpdate?.(dt);
		}
	}

	update(dt: number) {
		for (const scene of this.activeScenes) {
			scene.update(dt);
		}
	}

	render(renderer: Renderer) {
		renderer.clear()
		for (const scene of this.activeScenes) {
			scene.render(renderer);
		}
	}
}
