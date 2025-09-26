import { IUpdateable } from "engine/propertys/IUpdateable";
import { Scene } from "engine/scenes";

export abstract class SceneObject<TScene extends Scene = Scene> implements IUpdateable {
	protected scene: TScene | null = null;

	abstract fixedUpdate?(dt: number): void;
	abstract update(deltaTime: number): void;
	abstract shouldUpdate(): boolean;

	addedToScene(scene: TScene) {
		this.scene = scene;
	}
	removedFromScene() {
		this.scene = null;
	}
}
