import { IUpdateable } from "engine/propertys/IUpdateable";

export abstract class SceneObject implements IUpdateable {
	abstract update(deltaTime: number): void;
	abstract shouldUpdate(): boolean;
}
