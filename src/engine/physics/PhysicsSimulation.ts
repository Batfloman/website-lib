import { Integrator } from "./integrators";
import { PhysicsBodyComponent } from "./PhysicsBodyComponent";

export abstract class PhysicsSimulation<
  TBody extends PhysicsBodyComponent = PhysicsBodyComponent,
> {
  private readonly bodies = new Set<TBody>();

  constructor(private readonly integrator: Integrator) {}

  addBody(body: TBody): void {
    this.bodies.add(body);
  }

  removeBody(body: TBody): void {
    this.bodies.delete(body);
  }

  clearBodies(): void {
    this.bodies.clear();
  }

  getBodies(): readonly TBody[] {
    return [...this.bodies];
  }

  step(dt: number, time: number): void {
    const activeBodies = this.getBodies().filter((body) => body.enabled);
    if (activeBodies.length === 0) {
      return;
    }

    const currentState = this.getStateVector(activeBodies);
    const nextState = this.integrator.step({
      state: currentState,
      dt,
      time,
      derivative: (state, currentTime) =>
        this.getDerivative(state, activeBodies, currentTime),
    });

    this.applyStateVector(activeBodies, nextState);
  }

  protected abstract getDerivative(
    state: readonly number[],
    bodies: readonly TBody[],
    time: number,
  ): number[];

  private getStateVector(bodies: readonly TBody[]): number[] {
    return bodies.flatMap((body) => body.getState());
  }

  private applyStateVector(
    bodies: readonly TBody[],
    state: readonly number[],
  ): void {
    let offset = 0;

    for (const body of bodies) {
      const sliceSize = body.getState().length;
      body.setState(state.slice(offset, offset + sliceSize));
      offset += sliceSize;
    }
  }
}
