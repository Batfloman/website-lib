import { Positionable, isMoveable } from "engine/traits";
import { SpatialIndex } from "./spacialIndex";
import { UniformGrid } from "./uniformGrid";
import { KDTreeIndex } from "./kdTreeIndex";
import { Vector2 } from "math";

export class HybridSpatialIndex<T extends Positionable> implements SpatialIndex<T> {
	private staticIndex: KDTreeIndex<T>;
	private dynamicIndex: UniformGrid<T>;

	constructor(cellSize: number = 64, staticItems: T[] = []) {
		this.staticIndex = new KDTreeIndex(staticItems);
		this.dynamicIndex = new UniformGrid(cellSize);
	}

	insert(obj: T, dynamic: boolean | null = null): void {
		if (dynamic === null) {
			dynamic = isMoveable(obj);
		}

		if (dynamic) {
			this.dynamicIndex.insert(obj);
		} else {
			this.staticIndex.insert(obj);
		}
	}

	remove(obj: T): void {
		this.dynamicIndex.remove(obj);
		this.staticIndex.remove(obj);
	}

	update(obj: T): void {
		this.dynamicIndex.update(obj);
	}

	queryRange(min: Vector2, max: Vector2): T[] {
		return [
			...this.staticIndex.queryRange(min, max),
			...this.dynamicIndex.queryRange(min, max),
		];
	}

	getAllObjects(): T[] {
		return [
			...this.staticIndex.getAllObjects(),
			...this.dynamicIndex.getAllObjects()
		]
	}

	clear(): void {
		this.staticIndex.clear();
		this.dynamicIndex.clear();
	}
}
