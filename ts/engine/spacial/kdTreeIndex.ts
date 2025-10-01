import { Positionable } from "engine/traits";
import { KDTree } from "dataStructs/kdTree";
import { SpatialIndex } from "./spacialIndex";
import { Vector2 } from "math";

export class KDTreeIndex<T extends Positionable> implements SpatialIndex<T> {
	private tree: KDTree<T>;
	private objects: Set<T> = new Set();

	constructor(items: T[] = []) {
		this.tree = new KDTree<T>({
			getPoint: (obj) => [obj.position.x, obj.position.y],
		}, items);
	}

	insert(obj: T, dynamic = false): void {
		this.tree.insert(obj);
		this.objects.add(obj);
	}

	remove(obj: T): void {
		this.tree.remove(obj);
		this.objects.delete(obj);
	}

	update(obj: T): void {
		// easiest: remove + insert
		this.remove(obj);
		this.insert(obj);
	}

	queryRange(min: Vector2, max: Vector2): T[] {
		return this.tree.queryRange([min.x, min.y], [max.x, max.y]);
	}

	getAllObjects(): T[] {
		return Array.from(this.objects);
	}

	clear(): void {
		this.tree.clear();
	}
}

