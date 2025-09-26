import { Vector2 } from "math";
import { Renderer, RenderArgs } from "../Renderer";
import { Canvas } from "./Canvas";
import { Color } from "../Color";

function getColorStr(color: string | Color) {
	return (color instanceof Color) ? color.getRGBString() : color;
}

export class CanvasRenderer extends Renderer {
	protected canvas: Canvas;
	protected ctx: CanvasRenderingContext2D;

	constructor(canvas: HTMLCanvasElement) {
		super();

		this.canvas = new Canvas(canvas);
		const context = canvas.getContext('2d');
		if (!context) {
			throw new Error('2D context not supported or canvas is null');
		}
		this.ctx = context;
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	renderLine(pos1: Vector2, pos2: Vector2, args?: RenderArgs): void {
		const ctx = this.ctx;
		ctx.beginPath();
		ctx.moveTo(pos1.x, pos1.y);
		ctx.lineTo(pos2.x, pos2.y);
		if (args?.strokeStyle) ctx.strokeStyle = getColorStr(args.strokeStyle)
		if (args?.lineWidth) ctx.lineWidth = args.lineWidth;
		ctx.stroke();
	}

	renderCircle(pos: Vector2, radius: number, args?: RenderArgs): void {
		const ctx = this.ctx;
		ctx.beginPath();
		ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
		if (args?.fillStyle) {
			ctx.fillStyle = getColorStr(args.fillStyle);
			ctx.fill();
		}
		if (args?.strokeStyle) {
			ctx.strokeStyle = getColorStr(args.strokeStyle);
			if (args.lineWidth) ctx.lineWidth = args.lineWidth;
			ctx.stroke();
		}
	}

	renderRectangle(center: Vector2, width: number, height: number, args?: RenderArgs): void {
		const ctx = this.ctx;

		ctx.save(); // Save current canvas state

		if (args?.rotation) {
			ctx.translate(center.x, center.y);
			ctx.rotate(args.rotation);
			ctx.translate(-center.x, -center.y);
		}

		const x = center.x - width / 2;
		const y = center.y - height / 2;

		if (args?.fillStyle) {
			ctx.fillStyle = getColorStr(args.fillStyle);
			ctx.fillRect(x, y, width, height);
		}

		if (args?.strokeStyle) {
			ctx.strokeStyle = getColorStr(args.strokeStyle);
			if (args.lineWidth) ctx.lineWidth = args.lineWidth;
			ctx.strokeRect(x, y, width, height);
		}

		ctx.restore(); // Restore canvas state
	}
}
