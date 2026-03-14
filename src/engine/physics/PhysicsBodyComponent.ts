export abstract class PhysicsBodyComponent {
  enabled = true;

  abstract getState(): number[];

  abstract setState(state: readonly number[]): void;
}
