export interface InputSnapshot {
  isPressed(action: string): boolean;
  getAxis(name: string): number;
}

export interface InputSource {
  sample(): InputSnapshot;
}
