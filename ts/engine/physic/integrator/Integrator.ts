export interface Integrable {
	getState(): number[];
	computeDerivative(states: number[][], objs: Integrable[], index: number): number[];
	setState(state: number[]): void;

	shouldIntegrate?(): boolean;
}

export function isIntegrable(obj: any): obj is Integrable {
	return (
		obj != null &&
		typeof obj.getState === 'function' &&
		typeof obj.computeDerivative === 'function' &&
		typeof obj.setState === 'function'
	);
}

export interface Integrator {
	step(objs: Integrable[], dt: number): number[][];
}
