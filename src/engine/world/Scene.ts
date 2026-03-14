import type { EntityId, FixedUpdateContext, UpdateContext } from "../common";
import type { RenderContext, Renderer } from "../render";
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

  fixedUpdate(context: FixedUpdateContext): void {
    for (const entity of this.entities.values()) {
      entity.fixedUpdate(context);
    }
  }

  update(context: UpdateContext): void {
    for (const entity of this.entities.values()) {
      entity.update(context);
    }
  }

  render(renderer: Renderer, context: RenderContext): void {
    renderer.beginFrame(this);

    for (const entity of this.entities.values()) {
      entity.render(renderer, context);
    }

    renderer.endFrame(this);
  }
}
