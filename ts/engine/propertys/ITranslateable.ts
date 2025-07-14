import { Vector2 } from "math";

export interface ITranslateable {
	pos: Vector2;
	mover: TranslationBehavior;
}

export class TranslationBehavior {

	constructor(private host: { pos: Vector2 }) { }

	moveDirection(degrees: number, distance: number): void {
		const radians = (degrees * Math.PI) / 180;
		const dx = Math.cos(radians) * distance;
		const dy = Math.sin(radians) * distance;
		this.move(new Vector2(dx, dy));
	}

	move(vec: Vector2): void {
		this.host.pos.x += vec.x;
		this.host.pos.y += vec.y;
	}
}

