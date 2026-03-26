import type { TickContext } from "../common";
import type { AppAction, AppAxis, InputSnapshot } from "../input";

export interface ControllerContext<
  TAction extends string = AppAction,
  TAxis extends string = AppAxis,
> extends TickContext {
  input?: InputSnapshot<TAction, TAxis>;
}

export interface Controller<
  TAction extends string = AppAction,
  TAxis extends string = AppAxis,
> {
  update(context: ControllerContext<TAction, TAxis>): void;
}
