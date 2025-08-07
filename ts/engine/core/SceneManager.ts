import { Scene } from "engine/scenes";
import { Renderer } from "engine/display";

export class SceneManager {
	private currentScene: Scene | null = null;

	setScene(scene: Scene) {
		this.currentScene = scene;
	}

	fixedUpdate(dt: number) {
		this.currentScene?.fixedUpdate(dt);
	}

	update(dt: number) {
		this.currentScene?.update(dt);
	}

	render(renderer: Renderer) {
		this.currentScene?.render(renderer);
	}
}

