import type { Integrator, IntegratorStepOptions } from "./Integrator";

export class RK4Integrator implements Integrator {
  step(options: IntegratorStepOptions): number[] {
    const { state, dt, time, derivative } = options;

    const k1 = derivative(state, time);
    const k2 = derivative(
      this.addScaledState(state, k1, dt / 2),
      time + dt / 2,
    );
    const k3 = derivative(
      this.addScaledState(state, k2, dt / 2),
      time + dt / 2,
    );
    const k4 = derivative(this.addScaledState(state, k3, dt), time + dt);

    return state.map((value, index) => {
      return value + (dt / 6) * (k1[index] + 2 * k2[index] + 2 * k3[index] + k4[index]);
    });
  }

  private addScaledState(
    state: readonly number[],
    derivative: readonly number[],
    scale: number,
  ): number[] {
    return state.map((value, index) => value + derivative[index] * scale);
  }
}
