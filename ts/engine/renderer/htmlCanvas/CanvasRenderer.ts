import { Vector2 } from "math";
import { Renderer, RenderArgs } from "../Renderer";

export class CanvasRenderer extends Renderer {
	protected canvas: HTMLCanvasElement;

	constructor(canvas: HTMLCanvasElement) {
		super();

		this.canvas = canvas;
	}

	clear() {

	}

	renderLine(pos1: Vector2, pos2: Vector2, args?: RenderArgs): void {

	}

	renderCircle(pos: Vector2, radius: number, args?: RenderArgs): void {

	}

	renderRectangle(pos: Vector2, pos2: Vector2, args?: RenderArgs): void {

	}
}
