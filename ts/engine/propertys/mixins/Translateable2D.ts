import { Vector2 } from "math"

type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;

export interface Translateable2D {
	pos: Vector2;

	moveDirection(degrees: number, distance: number): void;
	move(vec: Vector2): void;
}

export function MakeTranslateable2D<TBase extends AbstractConstructor>(Base: TBase) {
	abstract class TranslateableMixin2D extends Base implements Translateable2D {
		pos: Vector2 = new Vector2(0, 0);

		moveDirection(degrees: number, distance: number): void {
			const radians = (degrees * Math.PI) / 180;
			const dx = Math.cos(radians) * distance;
			const dy = Math.sin(radians) * distance;
			this.move(new Vector2(dx, dy));
		}

		move(vec: Vector2): void {
			this.pos = this.pos.add(vec);
		}
	}
	return TranslateableMixin2D;
}
