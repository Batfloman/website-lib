type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;

export interface IRotateable {
	orientation: number;

	rotate(degrees: number): void;
	setRotation(degrees: number): void;
}

export function MakeRotateable<TBase extends AbstractConstructor>(Base: TBase) {
	abstract class RotateableMixin extends Base implements IRotateable {
		orientation: number = 0;

		rotate(degrees: number): void {
			this.orientation += degrees;
			this.orientation %= 360;
		}

		setRotation(degrees: number): void {
			this.orientation = degrees;
		}
	}
	return RotateableMixin;
}
