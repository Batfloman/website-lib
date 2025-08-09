import { Renderer } from "engine/renderer";
import { IMoveable, IRenderable, TranslationBehavior, RotateBehaviour } from "engine/propertys";
import { SceneObject } from "./SceneObject";
import { Vector2 } from "math";
import { SceneContext } from "engine/core";

export abstract class GameObject extends SceneObject implements IMoveable, IRenderable {
	abstract pos: Vector2;
	mover: TranslationBehavior = new TranslationBehavior(this);
	orientation: number = 0;
	rotator: RotateBehaviour = new RotateBehaviour(this);

	abstract fixedUpdate(dt: number, context: SceneContext): void;
	abstract update(deltaTime: number, context: SceneContext): void;
	shouldUpdate(): boolean {
		return true;
	};

	abstract render(renderer: Renderer): void;
	shouldRender(): boolean {
		return true;
	};

}
