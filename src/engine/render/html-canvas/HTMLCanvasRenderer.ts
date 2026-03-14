import type { Scene } from "../../world";
import { Camera } from "../Camera";
import {
  Renderer,
  type DrawCircleOptions,
  type DrawLineOptions,
  type DrawRectOptions,
} from "../Renderer";
import { CanvasSurface } from "./CanvasSurface";

export class HTMLCanvasRenderer extends Renderer {
  readonly camera: Camera;
  readonly surface: CanvasSurface;
  readonly context: CanvasRenderingContext2D;
  clearColor = "#000000";

  constructor(
    canvas: HTMLCanvasElement,
    camera?: Camera,
    context?: CanvasRenderingContext2D,
  ) {
    super();
    this.camera = camera ?? new Camera();
    this.surface = new CanvasSurface(canvas);
    this.context = context ?? HTMLCanvasRenderer.createContext(this.surface.element);
  }

  get canvas(): HTMLCanvasElement {
    return this.surface.element;
  }

  beginFrame(_scene: Scene): void {
    this.surface.syncSize();
    this.context.save();
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.scale(this.surface.pixelRatio, this.surface.pixelRatio);
    this.context.fillStyle = this.clearColor;
    this.context.fillRect(0, 0, this.surface.width, this.surface.height);
  }

  endFrame(_scene: Scene): void {
    this.context.restore();
  }

  drawLine(options: DrawLineOptions): void {
    this.context.beginPath();
    this.context.strokeStyle = options.color ?? "#ffffff";
    this.context.lineWidth = options.width ?? 1;
    this.context.moveTo(options.x1, options.y1);
    this.context.lineTo(options.x2, options.y2);
    this.context.stroke();
  }

  drawRect(options: DrawRectOptions): void {
    const color = options.color ?? "#ffffff";

    if (options.filled ?? true) {
      this.context.fillStyle = color;
      this.context.fillRect(options.x, options.y, options.width, options.height);
      return;
    }

    this.context.strokeStyle = color;
    this.context.strokeRect(options.x, options.y, options.width, options.height);
  }

  drawCircle(options: DrawCircleOptions): void {
    this.context.beginPath();
    this.context.arc(options.x, options.y, options.radius, 0, Math.PI * 2);

    if (options.filled ?? true) {
      this.context.fillStyle = options.color ?? "#ffffff";
      this.context.fill();
      return;
    }

    this.context.strokeStyle = options.color ?? "#ffffff";
    this.context.stroke();
  }

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
