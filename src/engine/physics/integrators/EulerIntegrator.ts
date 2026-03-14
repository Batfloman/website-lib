import type { Integrator, IntegratorStepOptions } from "./Integrator";

export class EulerIntegrator implements Integrator {
  step(options: IntegratorStepOptions): number[] {
    const derivative = options.derivative(options.state, options.time);

    return options.state.map((value, index) => {
      return value + derivative[index] * options.dt;
    });
  }
}
