import { Integrable, Integrator } from "engine/physic/integrator/Integrator";
import { System } from "./System";

export class PhysicsManager implements System {
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

	fixedUpdate(dt: number): void {
		this.step(dt);
	}

	setIntegrator(integrator: Integrator) {
		this.integrator = integrator;
	}
}
