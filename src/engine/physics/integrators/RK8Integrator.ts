import type { Integrator, IntegratorStepOptions } from "./Integrator";

// Fixed-step DOP853 coefficients for the 8th-order solution formula.
const C = [
  0,
  0.05260015195876773,
  0.0789002279381516,
  0.1183503419072274,
  0.2816496580927726,
  1 / 3,
  1 / 4,
  4 / 13,
  0.6512820512820513,
  0.6,
  6 / 7,
  1,
] as const;

const A = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0.05260015195876773, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0.0197250569840754, 0.0591751709540762, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0.0295875854761131, 0, 0.0887627564311143, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0.2413651341592667, 0, -0.8845494793282861, 0.924834003261792, 0, 0, 0, 0, 0, 0, 0, 0],
  [0.037037037037037, 0, 0, 0.1708286087294739, 0.1254676875668224, 0, 0, 0, 0, 0, 0, 0],
  [0.037109375, 0, 0, 0.170252211019544, 0.0602165389804559, -0.017578125, 0, 0, 0, 0, 0, 0],
  [0.0370920001185048, 0, 0, 0.1703839257122399, 0.1072620304463733, -0.0153194377486244, 0.0082737891635563, 0, 0, 0, 0, 0],
  [0.6241109587160757, 0, 0, -3.360892629446941, -0.868219346841726, 27.59209969944671, 20.15406755047789, -43.48988418106996, 0, 0, 0, 0],
  [0.4776625364382644, 0, 0, -2.488114619971667, -0.590290826836843, 21.23005144818119, 15.27923363288242, -33.28821096898486, -0.0203312017085086, 0, 0, 0],
  [-0.9371424300859873, 0, 0, 5.186372428844064, 1.091437348996729, -8.149787010746926, -18.52006565999696, 22.7394870993505, 2.493605552679652, -3.046764471898219, 0, 0],
  [2.273310147516538, 0, 0, -10.53449546673725, -2.000872058224863, -17.9589318631188, 27.94888452941996, -2.858998277135023, -8.87285693353063, 12.3605671757943, 0.6433927460157635, 0],
] as const;

const B = [
  0.0542937341165688,
  0,
  0,
  0,
  0,
  4.450312892752409,
  1.8915178993145,
  -5.801203960010585,
  0.3111643669578199,
  -0.1521609496625161,
  0.2013654008040303,
  0.0447106157277726,
] as const;

export class RK8Integrator implements Integrator {
  step(options: IntegratorStepOptions): number[] {
    const { state, dt, time, derivative } = options;
    const stages: number[][] = [];

    stages[0] = derivative(state, time);

    for (let stageIndex = 1; stageIndex < C.length; stageIndex += 1) {
      const stageState = state.map((value, componentIndex) => {
        let weightedDerivative = 0;

        for (let derivativeIndex = 0; derivativeIndex < stageIndex; derivativeIndex += 1) {
          weightedDerivative += A[stageIndex][derivativeIndex] * stages[derivativeIndex][componentIndex];
        }

        return value + dt * weightedDerivative;
      });

      stages[stageIndex] = derivative(stageState, time + C[stageIndex] * dt);
    }

    return state.map((value, componentIndex) => {
      let weightedDerivative = 0;

      for (let stageIndex = 0; stageIndex < B.length; stageIndex += 1) {
        weightedDerivative += B[stageIndex] * stages[stageIndex][componentIndex];
      }

      return value + dt * weightedDerivative;
    });
  }
}
