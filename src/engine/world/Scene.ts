import type { Entity } from "./Entity";

export interface Scene {
  readonly name: string;
  getEntities(): readonly Entity[];
}
