type Constructor<T = {}> = new (...args: any[]) => T;
type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;

// --- Type definition ---
export interface Scaleable {
	scale: number;
	setScale(scale: number): void;
	scaleBy(scale: number): void;
}

// --- Unique runtime identifier ---
const ScaleableTag = Symbol("Scaleable");

// --- Runtime type guard ---
export function isScaleable(obj: any): obj is Scaleable {
	return !!obj?.[ScaleableTag];
}

// --- Mixin function ---
export function ScaleableTrait<TBase extends Constructor | AbstractConstructor>(Base: TBase) {
	return class ScaleableImpl extends Base implements Scaleable {
		// Hidden runtime marker for trait detection
		[ScaleableTag] = true;

		// Default position (0,0)
		scale: number = 1;

		setScale(scale: number) {
			this.scale = scale;
		}

		scaleBy(scale: number) {
			this.scale *= scale;
		}
	};
}
