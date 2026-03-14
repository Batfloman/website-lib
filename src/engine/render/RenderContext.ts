import { Camera } from "./Camera";

export interface RenderContext {
  alpha: number;
  camera: Camera;
}

export interface RenderContextOptions {
  alpha: number;
  camera?: Camera;
}

export function createRenderContext(
  options: RenderContextOptions,
): RenderContext {
  return {
    alpha: options.alpha,
    camera: options.camera ?? new Camera(),
  };
}
