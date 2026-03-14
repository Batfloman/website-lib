import { Vec2 } from "../math";

export class TransformComponent {
  constructor(
    public position = new Vec2(),
    public rotation = 0,
  ) {}

  setPosition(x: number, y: number): void {
    this.position.set(x, y);
  }

  translate(dx: number, dy: number): void {
    this.position.add(new Vec2(dx, dy));
  }

  rotate(delta: number): void {
    this.rotation += delta;
  }
}
