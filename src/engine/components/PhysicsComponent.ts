import { Vec2 } from "../math";

export class PhysicsComponent {
  constructor(
    public velocity = new Vec2(),
    public mass = 1,
  ) {}

  setVelocity(x: number, y: number): void {
    this.velocity.set(x, y);
  }
}
