export interface IScaleable {
	scale: number;

	scaler: ScaleBehavior;
}

export class ScaleBehavior {
	constructor(private host: { scale: number }) { }

	scale(scalar: number) {
		this.host.scale *= scalar;
	}

	setScale(scale: number) {
		this.host.scale = scale;
	}
}
