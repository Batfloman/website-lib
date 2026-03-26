import type { Controller } from "../controllers";
import type { AppAction, AppAxis, InputSource } from "../input";
import { createRenderContext, type Renderer } from "../render";
import type { System } from "../systems";
import type { Scene } from "../world";
import { GameLoop, type GameLoopOptions, type LoopDriver, type LoopHooks } from "./GameLoop";

export interface EngineOptions<
  TAction extends string = AppAction,
  TAxis extends string = AppAxis,
> extends GameLoopOptions {
  renderer: Renderer;
  input?: InputSource<TAction, TAxis>;
  controllers?: Controller<TAction, TAxis>[];
  systems?: System[];
  initialScene?: Scene;
  loopDriver?: LoopDriver;
}

interface ResolvedEngineOptions<
  TAction extends string = AppAction,
  TAxis extends string = AppAxis,
> extends GameLoopOptions {
  renderer: Renderer;
  input?: InputSource<TAction, TAxis>;
  controllers: Controller<TAction, TAxis>[];
  systems: System[];
  initialScene?: Scene;
  loopDriver?: LoopDriver;
}

function createDefaultEngineOptions<
  TAction extends string = AppAction,
  TAxis extends string = AppAxis,
>(
  options: EngineOptions<TAction, TAxis>,
): ResolvedEngineOptions<TAction, TAxis> {
  return {
    renderer: options.renderer,
    input: options.input,
    controllers: [...(options.controllers ?? [])],
    systems: [...(options.systems ?? [])],
    initialScene: options.initialScene,
    loopDriver: options.loopDriver,
    fixedDt: options.fixedDt ?? 1 / 60,
    maxFrameDt: options.maxFrameDt ?? 0.25,
    renderWhilePaused: options.renderWhilePaused ?? true,
  };
}

export class Engine<
  TAction extends string = AppAction,
  TAxis extends string = AppAxis,
> implements LoopHooks {
  readonly renderer: Renderer;
  readonly input?: InputSource<TAction, TAxis>;
  readonly controllers: Controller<TAction, TAxis>[];
  readonly systems: System[];
  readonly loop: GameLoop;
  private activeScene?: Scene;
  private elapsedTime = 0;
  private currentInputSnapshot?: ReturnType<InputSource<TAction, TAxis>["sample"]>;

  constructor(options: EngineOptions<TAction, TAxis>) {
    const resolvedOptions = createDefaultEngineOptions(options);

    this.renderer = resolvedOptions.renderer;
    this.input = resolvedOptions.input;
    this.controllers = resolvedOptions.controllers;
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
    this.elapsedTime += fixedDt;
    this.activeScene?.fixedUpdate({
      dt: fixedDt,
      fixedDt,
      alpha: 0,
      time: this.elapsedTime,
    });
  }

  update(dt: number, fixedDt: number): void {
    this.currentInputSnapshot = this.input?.sample();

    for (const controller of this.controllers) {
      controller.update({
        dt,
        fixedDt,
        alpha: 0,
        time: this.elapsedTime,
        input: this.currentInputSnapshot,
      });
    }

    this.activeScene?.update({
      dt,
      fixedDt,
      alpha: 0,
      time: this.elapsedTime,
    });
  }

  render(alpha: number): void {
    this.activeScene?.render(
      this.renderer,
      createRenderContext({ alpha }),
    );
  }
}
