export class TransformComponent {
  constructor(
    public x = 0,
    public y = 0,
    public rotation = 0,
  ) {}

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  translate(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
  }

  rotate(delta: number): void {
    this.rotation += delta;
  }
}
