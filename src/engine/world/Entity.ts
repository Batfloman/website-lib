import type { EntityId } from "../common";

export interface Entity {
  readonly id: EntityId;
  readonly tags?: readonly string[];
}
