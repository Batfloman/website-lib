import type { EntityId, FixedUpdateContext, UpdateContext } from "../common";
import type { PhysicsSimulation } from "../physics";
import type { RenderContext, Renderer } from "../render";
import { Entity } from "./Entity";

export interface SceneOptions {
  simulation?: PhysicsSimulation;
}

export class Scene {
  readonly name: string;
  private readonly entities = new Map<EntityId, Entity>();
  readonly simulation?: PhysicsSimulation;

  constructor(name: string, options: SceneOptions = {}) {
    this.name = name;
    this.simulation = options.simulation;
  }

  addEntity(entity: Entity): Entity {
    if (this.entities.has(entity.id)) {
      throw new Error(`Entity "${entity.id}" already exists in scene "${this.name}".`);
    }

    this.entities.set(entity.id, entity);
    const physicsBody = entity.components.physicsBody;
    if (physicsBody) {
      this.simulation?.addBody(physicsBody);
    }

    return entity;
  }

  removeEntity(entityId: EntityId): boolean {
    const entity = this.entities.get(entityId);
    if (!entity) {
      return false;
    }

    const physicsBody = entity.components.physicsBody;
    if (physicsBody) {
      this.simulation?.removeBody(physicsBody);
    }

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
    for (const entity of this.entities.values()) {
      const physicsBody = entity.components.physicsBody;
      if (physicsBody) {
        this.simulation?.removeBody(physicsBody);
      }
    }

    this.entities.clear();
  }

  fixedUpdate(context: FixedUpdateContext): void {
    this.simulation?.step(context.fixedDt, context.time);

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
