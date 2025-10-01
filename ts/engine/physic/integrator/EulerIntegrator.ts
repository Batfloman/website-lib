import { Integrator, Integrable } from "./Integrator";

export class EulerIntegrator implements Integrator {
	step(objs: Integrable[], dt: number): number[][] {
		const states = objs.map(o => o.getState());
		const derivs = objs.map((o, i) => o.computeDerivative(states, objs, i));

		return states.map((s, i) =>
			s.map((v, j) => v + derivs[i][j] * dt)
		);
	}
}
