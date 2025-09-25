import { Vector2 } from "math";

type Constructor<T = {}> = new (...args: any[]) => T;
type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;

export interface Rotateable {
	rotation: number;
}

// --- Unique runtime identifier ---
// We use a Symbol as a "hidden tag" to mark objects that implement Moveable.
// Symbols are unique and won't conflict with normal property names.
const RotateableTag = Symbol("Rotateable");

// --- Mixin function ---
// Takes a base class and returns a new class with Moveable behavior.
// Adds position property, move() method, and sets the hidden tag.
export function RotateableTrait<TBase extends Constructor | AbstractConstructor>(Base: TBase) {
	return class MoveableImpl extends Base implements Rotateable {
		// Hidden runtime marker for trait detection
		[RotateableTag] = true;

		rotation = 0;
	};
}

// --- Runtime type guard ---
// Safe way to check if an object has the Moveable trait at runtime.
export function isRotateable(obj: any): obj is Rotateable {
	return !!obj?.[RotateableTag];
}
