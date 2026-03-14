export class Vec2 {
  constructor(
    public x = 0,
    public y = 0,
  ) {}

  clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  set(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  add(other: Vec2): this {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  subtract(other: Vec2): this {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  scale(scalar: number): this {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  length(): number {
    return Math.hypot(this.x, this.y);
  }

  normalize(): this {
    const magnitude = this.length();
    if (magnitude === 0) {
      return this;
    }

    return this.scale(1 / magnitude);
  }
}
