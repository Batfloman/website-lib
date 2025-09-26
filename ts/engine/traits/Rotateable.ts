type Constructor<T = {}> = new (...args: any[]) => T;
type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;

// --- Type definition ---
export interface Rotateable {
	rotation: number;
}

// --- Unique runtime identifier ---
export const RotateableTag = Symbol("Rotateable");

// --- Runtime type guard ---
export function isRotateable(obj: any): obj is Rotateable {
	return !!obj?.[RotateableTag];
}

// --- Mixin function ---
export function RotateableTrait<TBase extends Constructor | AbstractConstructor>(Base: TBase) {
	return class MoveableImpl extends Base implements Rotateable {
		// Hidden runtime marker for trait detection
		declare readonly [RotateableTag] = true;

		rotation = 0;
	};
}

