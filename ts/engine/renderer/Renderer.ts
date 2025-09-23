import { Vector2 } from "../../math/Vector2";
import { Color } from "./Color";

export type RenderArgs = {
	rotation?: number,
	strokeStyle?: string; // Linienfarbe
	fillStyle?: string;   // Füllfarbe
	lineWidth?: number;   // Linienbreite
}

export abstract class Renderer {
	static defaultArgs: RenderArgs = {
		strokeStyle: Color.get("black").getRGBString(),
		rotation: 0,
	}

	abstract clear(): void;
	abstract renderLine(pos1: Vector2, pos2: Vector2, args?: RenderArgs): void;
	abstract renderCircle(pos: Vector2, radius: number, args?: RenderArgs): void;
	abstract renderRectangle(pos: Vector2, width: number, heigth: number, args?: RenderArgs): void;
}
