import { Vector2 } from "math";
import { Positionable, PositionableTrait } from "./Positionable";

type AnyConstructor<T = {}> = abstract new (...args: any[]) => T;

// --- Type definition ---
export interface Moveable extends Positionable {
	move(dx: number, dy: number): void;
}

// --- Mixin function ---
export function MoveableTrait<TBase extends AnyConstructor>(Base: TBase) {
	abstract class MoveableImpl extends PositionableTrait(Base) implements Moveable {
		readonly [MoveableTrait.tag] = true;

		move(vec: Vector2): void;
		move(dx: number, dy: number): void;
		move(arg1: number | Vector2, arg2?: number): void {
			if (arg1 instanceof Vector2) {
				this.position.x += arg1.x;
				this.position.y += arg1.y;
			} else {
				this.position.x += arg1;
				this.position.y += arg2 ?? 0;
			}
		}
	};
	return MoveableImpl;
}

// attach a unique tag symbol
MoveableTrait.tag = Symbol("Moveable");

// and a type guard
MoveableTrait.is = function(obj: any): obj is Moveable {
	return !!obj?.[MoveableTrait.tag];
};

