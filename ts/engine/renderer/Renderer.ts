import { Vector2 } from "../../math/Vector2";
import { Color } from "./Color";

export type RenderArgs = {
	color?: Color,
	rotation?: number,
	fill?: string,
	borderStyle?: string,
}

export abstract class Renderer {
	static defaultArgs: RenderArgs = {
		color: Color.get("black"),
		rotation: 0,
	}

	abstract clear(): void;
	abstract renderLine(pos1: Vector2, pos2: Vector2, args?: RenderArgs): void;
	abstract renderCircle(pos: Vector2, radius: number, args?: RenderArgs): void;
	abstract renderRectangle(pos: Vector2, pos2: Vector2, args?: RenderArgs): void;
}
