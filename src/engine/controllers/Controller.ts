import type { TickContext } from "../common";
import type { InputSnapshot } from "../input";

export interface ControllerContext extends TickContext {
  input?: InputSnapshot;
}

export interface Controller {
  update(context: ControllerContext): void;
}
