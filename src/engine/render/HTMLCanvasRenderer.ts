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

  constructor(
    public readonly canvas: HTMLCanvasElement,
    public readonly context: CanvasRenderingContext2D,
    camera?: Camera,
  ) {
    super();
    this.camera = camera ?? new Camera();
  }

  beginFrame(_scene: Scene): void {}

  endFrame(_scene: Scene): void {}

  drawLine(_options: DrawLineOptions): void {}

  drawRect(_options: DrawRectOptions): void {}

  drawCircle(_options: DrawCircleOptions): void {}
}
