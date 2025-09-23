import { Vector2 } from "math";

type Constructor<T = {}> = new (...args: any[]) => T;
type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;

// --- Type definition ---
// This is the TypeScript *interface* for a Moveable object.
// It defines the shape, used for typing
export interface Moveable {
	position: Vector2;
	move(dx: number, dy: number): void;
}

// --- Unique runtime identifier ---
// We use a Symbol as a "hidden tag" to mark objects that implement Moveable.
// Symbols are unique and won't conflict with normal property names.
const MoveableTag = Symbol("Moveable");

// --- Mixin function ---
// Takes a base class and returns a new class with Moveable behavior.
// Adds position property, move() method, and sets the hidden tag.
export function MoveableTrait<TBase extends Constructor | AbstractConstructor>(Base: TBase) {
	return class MoveableImpl extends Base implements Moveable {
		// Hidden runtime marker for trait detection
		[MoveableTag] = true;

		// Default position (0,0)
		position: Vector2 = new Vector2(0, 0);

		// Implementation of the Moveable interface
		move(dx: number, dy: number) {
			this.position.x += dx;
			this.position.y += dy;
		}
	};
}

// --- Runtime type guard ---
// Safe way to check if an object has the Moveable trait at runtime.
export function isMoveable(obj: any): obj is Moveable {
	return !!obj?.[MoveableTag];
}
