import { Vec2 } from "../math";

export class Camera {
  constructor(
    public position = new Vec2(),
    public zoom = 1,
    public rotation = 0,
  ) {}

  setPosition(x: number, y: number): void {
    this.position.set(x, y);
  }

  translate(dx: number, dy: number): void {
    this.position.add(new Vec2(dx, dy));
  }
}
