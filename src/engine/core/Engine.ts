import type { InputSource } from "../input";
import type { Renderer } from "../render";
import type { System } from "../systems";
import type { Scene } from "../world";
import { GameLoop, type GameLoopOptions, type LoopDriver, type LoopHooks } from "./GameLoop";

export interface EngineOptions extends GameLoopOptions {
  renderer: Renderer;
  input?: InputSource;
  systems?: System[];
  initialScene?: Scene;
  loopDriver?: LoopDriver;
}

export class Engine implements LoopHooks {
  readonly renderer: Renderer;
  readonly input?: InputSource;
  readonly systems: System[];
  readonly loop: GameLoop;
  private activeScene?: Scene;

  constructor(options: EngineOptions) {
    this.renderer = options.renderer;
    this.input = options.input;
    this.systems = options.systems ?? [];
    this.activeScene = options.initialScene;
    this.loop = new GameLoop(this, options.loopDriver, options);
  }

  setScene(scene: Scene): void {
    this.activeScene = scene;
  }

  getScene(): Scene | undefined {
    return this.activeScene;
  }

  start(): void {
    this.loop.start();
  }

  pause(): void {
    this.loop.pause();
  }

  resume(): void {
    this.loop.resume();
  }

  stop(): void {
    this.loop.stop();
  }

  fixedUpdate(fixedDt: number): void {
    void fixedDt;
  }

  update(dt: number, fixedDt: number): void {
    void dt;
    void fixedDt;
  }

  render(alpha: number): void {
    void alpha;
  }
}
