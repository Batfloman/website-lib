export interface IRotateable {
	orientation: number;

	rotator: RotateBehaviour;
}

export class RotateBehaviour {
	constructor(private host: IRotateable) { };

	rotate(degrees: number): void {
		this.host.orientation += degrees;
		this.host.orientation %= 360;
	}

	setRotation(degrees: number) {
		this.host.orientation = (degrees % 360);
	}
}
