import type { BaseComponents } from "../components";
import type { EntityId } from "../common";

export interface EntityOptions<TComponents extends BaseComponents = BaseComponents> {
  id: EntityId;
  tags?: Iterable<string>;
  components?: TComponents;
}

export class Entity<TComponents extends BaseComponents = BaseComponents> {
  readonly id: EntityId;
  readonly components: TComponents;
  private readonly tags = new Set<string>();

  constructor(options: EntityOptions<TComponents>) {
    this.id = options.id;
    this.components = (options.components ?? {}) as TComponents;

    if (options.tags) {
      for (const tag of options.tags) {
        this.tags.add(tag);
      }
    }
  }

  hasTag(tag: string): boolean {
    return this.tags.has(tag);
  }

  addTag(tag: string): void {
    this.tags.add(tag);
  }

  removeTag(tag: string): boolean {
    return this.tags.delete(tag);
  }

  getTags(): readonly string[] {
    return [...this.tags];
  }
}
