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

interface ResolvedEngineOptions extends GameLoopOptions {
  renderer: Renderer;
  input?: InputSource;
  systems: System[];
  initialScene?: Scene;
  loopDriver?: LoopDriver;
}

function createDefaultEngineOptions(
  options: EngineOptions,
): ResolvedEngineOptions {
  return {
    renderer: options.renderer,
    input: options.input,
    systems: [...(options.systems ?? [])],
    initialScene: options.initialScene,
    loopDriver: options.loopDriver,
    fixedDt: options.fixedDt ?? 1 / 60,
    maxFrameDt: options.maxFrameDt ?? 0.25,
    renderWhilePaused: options.renderWhilePaused ?? true,
  };
}

export class Engine implements LoopHooks {
  readonly renderer: Renderer;
  readonly input?: InputSource;
  readonly systems: System[];
  readonly loop: GameLoop;
  private activeScene?: Scene;

  constructor(options: EngineOptions) {
    const resolvedOptions = createDefaultEngineOptions(options);

    this.renderer = resolvedOptions.renderer;
    this.input = resolvedOptions.input;
    this.systems = resolvedOptions.systems;
    this.activeScene = resolvedOptions.initialScene;
    this.loop = new GameLoop(this, resolvedOptions.loopDriver, resolvedOptions);
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
