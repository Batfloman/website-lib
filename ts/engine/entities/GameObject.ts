import { Renderer } from "../display/Renderer";
import { IMoveable, IRenderable } from "engine/propertys";
import { SceneObject } from "./SceneObject";
import { Vector2 } from "math";
import { Util } from "util";

export abstract class GameObject extends SceneObject implements IRenderable, IMoveable {
	public readonly pos: Vector2 = new Vector2();

	abstract update(deltaTime: number): void;
	shouldUpdate(): boolean {
		return true;
	};

	abstract render(renderer: Renderer): void;
	shouldRender(): boolean {
		return true;
	};

	moveDirection(degrees: number, distance: number): void {
		const rad = Util.math.convert.DegToRad(degrees)
		const dx = Math.cos(rad) * distance;
		const dy = Math.sin(rad) * distance;
		this.pos.x += dx;
		this.pos.y += dy;
	}

	move(translation_vec: Vector2): void {
		this.pos.x += translation_vec.x;
		this.pos.y += translation_vec.y;
	}
}
