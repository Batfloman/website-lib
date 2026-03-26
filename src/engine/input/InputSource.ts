import type { Vec2 } from "../math";
import type { AppAction, AppAxis } from "./AppInput";

export type PointerButton = "Left" | "Middle" | "Right";

export interface InputSnapshot<
  TAction extends string = AppAction,
  TAxis extends string = AppAxis,
> {
  isPressed(action: TAction): boolean;
  wasPressed(action: TAction): boolean;
  wasReleased(action: TAction): boolean;
  getAxis(name: TAxis): number;
  getPointerPosition(): Vec2;
  getPointerDelta(): Vec2;
  isPointerDown(button?: PointerButton): boolean;
  wasPointerPressed(button?: PointerButton): boolean;
  wasPointerReleased(button?: PointerButton): boolean;
}

export interface InputSource<
  TAction extends string = AppAction,
  TAxis extends string = AppAxis,
> {
  sample(): InputSnapshot<TAction, TAxis>;
}
