type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;

export function Rotateable<TBase extends AbstractConstructor>(Base: TBase) {
	abstract class RotateableMixin extends Base {
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
