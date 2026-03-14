import type { TickContext } from "../common";
import type { InputSnapshot } from "../input";
import type { Renderer } from "../render";
import type { Scene } from "../world";

export interface SystemContext extends TickContext {
  input?: InputSnapshot;
  renderer: Renderer;
  scene: Scene;
}

export interface System {
  readonly name: string;
  fixedUpdate?(context: SystemContext): void;
  update?(context: SystemContext): void;
  render?(context: SystemContext): void;
}
