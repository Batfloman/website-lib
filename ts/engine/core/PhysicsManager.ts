import { Integrable, Integrator } from "engine/physic/integrator/Integrator";

export class PhysicsManager {
	private objs: Integrable[] = [];
	private integrator: Integrator;

	constructor(integrator: Integrator) {
		this.integrator = integrator;
	}

	add(obj: Integrable) {
		this.objs.push(obj);
	}
	remove(obj: Integrable) {
		this.objs = this.objs.filter(o => o !== obj);
	}

	step(dt: number) {
		let use_objs = this.objs.filter(o => o.shouldIntegrate?.() ?? true);
		const nextStates = this.integrator.step(use_objs, dt);
		this.objs.forEach((o, i) => o.setState(nextStates[i]));
	}

	setIntegrator(integrator: Integrator) {
		this.integrator = integrator;
	}
}

