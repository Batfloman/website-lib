export type EntityId = string;

export interface TickContext {
  dt: number;
  fixedDt: number;
  alpha: number;
  time: number;
}
