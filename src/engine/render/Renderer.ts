import type { Scene } from "../world";

export interface Renderer {
  beginFrame(scene: Scene): void;
  drawScene(scene: Scene): void;
  endFrame(scene: Scene): void;
}
