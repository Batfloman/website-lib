import { IPositionable } from "engine/propertys";
import { KDTree } from "dataStructs/kdTree";
import { SpatialIndex } from "./spacialIndex";
import { Vector2 } from "math";

export class KDTreeIndex<T extends IPositionable> implements SpatialIndex<T> {
	private tree: KDTree<T>;

	constructor(items: T[] = []) {
		this.tree = new KDTree<T>({
			getPoint: (obj) => [obj.pos.x, obj.pos.y],
		}, items);
	}

	insert(obj: T, dynamic = false): void {
		this.tree.insert(obj);
	}

	remove(obj: T): void {
		this.tree.remove(obj);
	}

	update(obj: T): void {
		// easiest: remove + insert
		this.remove(obj);
		this.insert(obj);
	}

	queryRange(min: Vector2, max: Vector2): T[] {
		return this.tree.queryRange([min.x, min.y], [max.x, max.y]);
	}

	clear(): void {
		this.tree.clear();
	}
}

