import { IUpdateable } from "engine/propertys/IUpdateable";
import { Scene } from "engine/scenes";

export abstract class SceneObject implements IUpdateable {
	protected scene: Scene | null = null;

	abstract fixedUpdate?(dt: number): void;
	abstract update(deltaTime: number): void;
	abstract shouldUpdate(): boolean;

	addedToScene(scene: Scene) {
		this.scene = scene;
	}
	removedFromScene() {
		this.scene = null;
	}
}
