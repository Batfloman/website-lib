export interface IntegratorStepOptions {
  state: readonly number[];
  dt: number;
  time: number;
  derivative: (state: readonly number[], time: number) => number[];
}

export interface Integrator {
  step(options: IntegratorStepOptions): number[];
}
