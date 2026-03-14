export class PhysicsComponent {
  constructor(
    public velocityX = 0,
    public velocityY = 0,
    public mass = 1,
  ) {}

  setVelocity(x: number, y: number): void {
    this.velocityX = x;
    this.velocityY = y;
  }
}
