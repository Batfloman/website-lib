export interface LoopHooks {
  fixedUpdate(fixedDt: number): void;
  update(dt: number, fixedDt: number): void;
  render(alpha: number): void;
}

export interface LoopDriver {
  requestFrame(callback: FrameRequestCallback): number;
  cancelFrame(handle: number): void;
  now(): number;
}

export class BrowserLoopDriver implements LoopDriver {
  requestFrame(callback: FrameRequestCallback): number {
    return window.requestAnimationFrame(callback);
  }

  cancelFrame(handle: number): void {
    window.cancelAnimationFrame(handle);
  }

  now(): number {
    return performance.now();
  }
}

export type GameLoopState = "idle" | "running" | "paused";

export interface GameLoopOptions {
  fixedDt?: number;
  maxFrameDt?: number;
  renderWhilePaused?: boolean;
}

export class GameLoop {
  private state: GameLoopState = "idle";
  private frameHandle: number | null = null;
  private lastTime = 0;
  private accumulator = 0;
  readonly fixedDt: number;
  readonly maxFrameDt: number;
  readonly renderWhilePaused: boolean;

  constructor(
    readonly hooks: LoopHooks,
    readonly driver: LoopDriver = new BrowserLoopDriver(),
    options: GameLoopOptions = {},
  ) {
    this.fixedDt = options.fixedDt ?? 1 / 60;
    this.maxFrameDt = options.maxFrameDt ?? 0.25;
    this.renderWhilePaused = options.renderWhilePaused ?? true;
  }

  start(): void {
    if (this.state !== "idle") {
      return;
    }

    this.state = "running";
    this.lastTime = this.driver.now();
    this.accumulator = 0;
    this.scheduleNextFrame();
  }

  pause(): void {
    if (this.state !== "running") {
      return;
    }

    this.state = "paused";
    this.accumulator = 0;
  }

  resume(): void {
    if (this.state !== "paused") {
      return;
    }

    this.state = "running";
    this.lastTime = this.driver.now();
    this.scheduleNextFrame();
  }

  stop(): void {
    this.state = "idle";
    this.accumulator = 0;

    if (this.frameHandle !== null) {
      this.driver.cancelFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  getState(): GameLoopState {
    return this.state;
  }

  private scheduleNextFrame(): void {
    if (this.frameHandle !== null) {
      return;
    }

    this.frameHandle = this.driver.requestFrame(this.tick);
  }

  private tick = (time: number): void => {
    this.frameHandle = null;

    if (this.state === "idle") {
      return;
    }

    const dt = Math.min((time - this.lastTime) / 1000, this.maxFrameDt);
    this.lastTime = time;

    if (this.state === "running") {
      this.accumulator += dt;

      while (this.accumulator >= this.fixedDt) {
        this.hooks.fixedUpdate(this.fixedDt);
        this.accumulator -= this.fixedDt;
      }

      this.hooks.update(dt, this.fixedDt);
      this.hooks.render(this.accumulator / this.fixedDt);
    } else if (this.renderWhilePaused) {
      this.hooks.render(0);
    }

    if (this.state !== "idle") {
      this.scheduleNextFrame();
    }
  };
}
