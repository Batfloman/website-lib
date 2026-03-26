export interface InputActionBinding {
  key?: string;
  mouseButton?: number;
}

export interface InputAxisKeyBinding {
  key: string;
  scale: number;
}

export interface InputAxisWheelBinding {
  wheel: "x" | "y";
  scale?: number;
}

export type InputAxisBinding =
  | InputAxisKeyBinding
  | InputAxisWheelBinding;
