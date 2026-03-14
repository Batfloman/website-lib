import type { Scene } from "../world";
import { Camera } from "./Camera";
import {
  Renderer,
  type DrawCircleOptions,
  type DrawLineOptions,
  type DrawRectOptions,
} from "./Renderer";

export class HTMLCanvasRenderer extends Renderer {
  readonly camera: Camera;
  readonly context: CanvasRenderingContext2D;

  constructor(
    public readonly canvas: HTMLCanvasElement,
    camera?: Camera,
    context?: CanvasRenderingContext2D,
  ) {
    super();
    this.camera = camera ?? new Camera();
    this.context = context ?? HTMLCanvasRenderer.createContext(canvas);
  }

  beginFrame(_scene: Scene): void {}

  endFrame(_scene: Scene): void {}

  drawLine(_options: DrawLineOptions): void {}

  drawRect(_options: DrawRectOptions): void {}

  drawCircle(_options: DrawCircleOptions): void {}

  private static createContext(
    canvas: HTMLCanvasElement,
  ): CanvasRenderingContext2D {
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not acquire a 2D rendering context from the canvas.");
    }

    return context;
  }
}
