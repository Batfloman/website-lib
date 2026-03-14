import type { Scene } from "../world";

export interface DrawLineOptions {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
}

export interface DrawRectOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  filled?: boolean;
}

export interface DrawCircleOptions {
  x: number;
  y: number;
  radius: number;
  color?: string;
  filled?: boolean;
}

export abstract class Renderer {
  abstract beginFrame(scene: Scene): void;

  abstract endFrame(scene: Scene): void;

  abstract drawLine(options: DrawLineOptions): void;

  abstract drawRect(options: DrawRectOptions): void;

  abstract drawCircle(options: DrawCircleOptions): void;
}
