import { Scene } from "engine/scenes";
import { Renderer } from "engine/renderer";
import { GameContext } from "./GameManager";
import { IUpdateable } from "engine/propertys";

export interface SceneContext extends GameContext {
	scene: Scene,
}

export class SceneManager implements IUpdateable<GameContext> {
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

	fixedUpdate(dt: number, context: GameContext) {
		for (const scene of this.activeScenes) {
			const sceneContext: SceneContext = { ...context, scene }
			scene.fixedUpdate?.(dt, sceneContext);
		}
	}

	update(dt: number, context: GameContext) {
		for (const scene of this.activeScenes) {
			const sceneContext: SceneContext = { ...context, scene }
			scene.update(dt, sceneContext);
		}
	}

	render(renderer: Renderer) {
		for (const scene of this.activeScenes) {
			scene.render(renderer);
		}
	}
}
