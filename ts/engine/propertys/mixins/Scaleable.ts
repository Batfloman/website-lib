type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;

export interface IScaleable {
	scale_value: number;

	scale(scalar: number): void;
	setScale(scalar: number): void;
}

export function MakeScaleable<TBase extends AbstractConstructor>(Base: TBase) {
	abstract class ScaleableMixin extends Base implements IScaleable {
		scale_value: number = 1;

		scale(scalar: number): void {
			this.scale_value *= scalar;
		}

		setScale(scalar: number): void {
			this.scale_value = scalar;
		}
	}
	return ScaleableMixin;
}
