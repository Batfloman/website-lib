import { Integrable, Integrator } from "./Integrator";

export class VelocityVerletIntegrator implements Integrator {
	step(objs: Integrable[], dt: number): number[][] {
		// 1️⃣ Snapshot current states
		const states = objs.map(o => o.getState());

		// 2️⃣ Compute current derivatives
		const derivs = objs.map((o, i) => o.computeDerivative(states, objs, i));

		// 3️⃣ Half-step positions
		const halfStepStates: number[][] = states.map((s, i) => {
			const [x, y, vx, vy] = s;
			const [dx, dy, ax, ay] = derivs[i];
			return [
				x + vx * dt + 0.5 * ax * dt * dt,
				y + vy * dt + 0.5 * ay * dt * dt,
				vx, // temporary velocity
				vy
			];
		});

		// 4️⃣ Compute derivatives at half-step positions
		const derivsNext = objs.map((o, i) => o.computeDerivative(halfStepStates, [], i));

		// 5️⃣ Update velocities using average acceleration and commit
		const nextStates: number[][] = halfStepStates.map((s, i) => {
			const [x, y, vx, vy] = s;
			const [dxOld, dyOld, axOld, ayOld] = derivs[i];
			const [dxNew, dyNew, axNew, ayNew] = derivsNext[i];

			return [
				x,
				y,
				vx + 0.5 * (axOld + axNew) * dt,
				vy + 0.5 * (ayOld + ayNew) * dt
			];
		});

		return nextStates;
	}
}
