export type EntityId = string;

export interface TickContext {
  dt: number;
  fixedDt: number;
  alpha: number;
  time: number;
}

export interface FixedUpdateContext extends TickContext {}

export interface UpdateContext extends TickContext {}
