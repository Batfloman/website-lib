import { IUpdateable } from "engine/propertys";
import { Scene } from "engine/scenes";
import { Renderer } from "engine/renderer";

export class SceneManager implements IUpdateable {
	private sceneMap: Map<string, Scene> = new Map();
	private activeScene: Scene | null = null;

	addScene(name: string, scene: Scene) {
		this.sceneMap.set(name, scene);
	}

	enableScene(name: string) {
		const scene = this.sceneMap.get(name);
		if (!scene) return;

		// unload previous scene
		this.activeScene?.onUnload?.();

		// set new scene
		this.activeScene = scene;
		this.activeScene.onLoad?.();
	}

	disableScene() {
		this.activeScene?.onUnload?.();
		this.activeScene = null;
	}

	clearScenes() {
		this.disableScene();
		this.sceneMap.clear();
	}

	fixedUpdate(dt: number) {
		this.activeScene?.fixedUpdate?.(dt);
	}

	update(dt: number) {
		this.activeScene?.update?.(dt);
	}

	render(renderer: Renderer) {
		renderer.clear();
		this.activeScene?.render(renderer);
	}

	// helper
	getActiveScene(): Scene | null {
		return this.activeScene;
	}

	getScene(name: string): Scene | undefined {
		return this.sceneMap.get(name);
	}
}
