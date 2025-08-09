import { SceneContext } from "engine/core";
import { IUpdateable } from "engine/propertys/IUpdateable";

export abstract class SceneObject implements IUpdateable<SceneContext> {
	abstract fixedUpdate?(dt: number, context: SceneContext): void;
	abstract update(deltaTime: number, context: SceneContext): void;
	abstract shouldUpdate(): boolean;
}
