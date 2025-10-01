import { Integrator, Integrable } from "./Integrator";

export class RK4Integrator implements Integrator {
	step(objs: Integrable[], dt: number): number[][] {
		const n = objs.length;
		const state0 = objs.map(o => o.getState()); // initial states

		// Helper: add two state arrays scaled by factor
		const addScaled = (a: number[][], b: number[][], scale: number) =>
			a.map((row, i) => row.map((v, j) => v + b[i][j] * scale));

		// 1️⃣ Compute k1
		const k1 = objs.map((o, i) => o.computeDerivative(state0, objs, i));

		// 2️⃣ Compute k2
		const tempState2 = addScaled(state0, k1, dt / 2);
		const k2 = objs.map((o, i) => o.computeDerivative(tempState2, objs, i));

		// 3️⃣ Compute k3
		const tempState3 = addScaled(state0, k2, dt / 2);
		const k3 = objs.map((o, i) => o.computeDerivative(tempState3, objs, i));

		// 4️⃣ Compute k4
		const tempState4 = addScaled(state0, k3, dt);
		const k4 = objs.map((o, i) => o.computeDerivative(tempState4, objs, i));

		// 5️⃣ Combine to get next state
		const nextStates: number[][] = state0.map((row, i) =>
			row.map((v, j) =>
				v + (dt / 6) * (k1[i][j] + 2 * k2[i][j] + 2 * k3[i][j] + k4[i][j])
			)
		);

		return nextStates;
	}
}
