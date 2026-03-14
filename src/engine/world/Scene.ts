import type { EntityId } from "../common";
import { Entity } from "./Entity";

export class Scene {
  readonly name: string;
  private readonly entities = new Map<EntityId, Entity>();

  constructor(name: string) {
    this.name = name;
  }

  addEntity(entity: Entity): Entity {
    if (this.entities.has(entity.id)) {
      throw new Error(`Entity "${entity.id}" already exists in scene "${this.name}".`);
    }

    this.entities.set(entity.id, entity);
    return entity;
  }

  removeEntity(entityId: EntityId): boolean {
    return this.entities.delete(entityId);
  }

  hasEntity(entityId: EntityId): boolean {
    return this.entities.has(entityId);
  }

  getEntity(entityId: EntityId): Entity | undefined {
    return this.entities.get(entityId);
  }

  getEntities(): readonly Entity[] {
    return [...this.entities.values()];
  }

  getEntitiesByTag(tag: string): readonly Entity[] {
    return this.getEntities().filter((entity) => entity.hasTag(tag));
  }

  clear(): void {
    this.entities.clear();
  }
}
