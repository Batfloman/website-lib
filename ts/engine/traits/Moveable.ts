import { Vector2 } from "math";
import { Positionable, PositionableTrait } from "./Positionable";

type Constructor<T = {}> = new (...args: any[]) => T;
type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;

// --- Type definition ---
export interface Moveable extends Positionable {
	move(dx: number, dy: number): void;
}

// --- Unique runtime identifier ---
export const MoveableTag = Symbol("Moveable");

// --- Runtime type guard ---
export function isMoveable(obj: any): obj is Moveable {
	return !!obj?.[MoveableTag];
}

// --- Mixin function ---
export function MoveableTrait<TBase extends Constructor | AbstractConstructor>(Base: TBase) {
	return class MoveableImpl extends PositionableTrait(Base) implements Moveable {
		// Hidden runtime marker for trait detection
		readonly [MoveableTag] = true;

		// Default position (0,0)
		position: Vector2 = new Vector2(0, 0);

		// Implementation of the Moveable interface
		move(dx: number, dy: number) {
			this.position.x += dx;
			this.position.y += dy;
		}
	};
}
