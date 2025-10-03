type AnyConstructor<T = {}> = abstract new (...args: any[]) => T;

// --- Type definition ---
export interface Scaleable {
	scale: number;
	setScale(scale: number): void;
	scaleBy(scale: number): void;
}

// --- Mixin function ---
export function ScaleableTrait(Base: AnyConstructor) {
	abstract class ScaleableImpl extends Base implements Scaleable {
		// Hidden runtime marker for trait detection
		readonly [ScaleableTrait.tag] = true;

		// Default position (0,0)
		scale: number = 1;

		setScale(scale: number) {
			this.scale = scale;
		}

		scaleBy(scale: number) {
			this.scale *= scale;
		}
	};
	return ScaleableImpl;
}

ScaleableTrait.tag = Symbol("Scaleable")

ScaleableTrait.is = function(obj: any): obj is Scaleable {
	return !!obj?.[ScaleableTrait.tag];
}
