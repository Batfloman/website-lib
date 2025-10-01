import { Vector2 } from "math";

type Constructor<T = {}> = new (...args: any[]) => T;
type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;

// --- Type definition ---

export interface Positionable {
	position: Vector2
}

// --- Unique runtime identifier ---
export const PositionableTag = Symbol("Positionable");

// --- Runtime type guard ---
export function isPositionable(obj: any): obj is Positionable {
	return !!obj?.[PositionableTag];
}

// --- Mixin function ---
export function PositionableTrait<TBase extends Constructor | AbstractConstructor>(Base: TBase) {
	return class PositionableImpl extends Base implements Positionable {
		// Hidden runtime marker for trait detection
		readonly [PositionableTag] = true;

		// Default position (0,0)
		position: Vector2 = new Vector2(0, 0);
	};
}
