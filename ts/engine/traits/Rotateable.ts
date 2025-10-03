type AnyConstructor<T = {}> = abstract new (...args: any[]) => T;

// --- Type definition ---
export interface Rotateable {
	rotation: number;
}

// --- Mixin function ---
export function RotateableTrait(Base: AnyConstructor) {
	abstract class RotateableImpl extends Base implements Rotateable {
		// Hidden runtime marker for trait detection
		readonly [RotateableTrait.tag] = true;

		rotation = 0;
	};
	return RotateableImpl
}

RotateableTrait.tag = Symbol("Rotateable");

RotateableTrait.is = function(obj: any): obj is Rotateable {
	return !!obj?.[RotateableTrait.tag]
}
