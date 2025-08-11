import { Vector2 } from "math";
import { IPositionable } from "engine/propertys";

export class UniformGrid<T extends IPositionable> {
	private cellSize: number;
	private cells: Map<string, Set<T>> = new Map();

	constructor(cellSize: number = 64) {
		this.cellSize = cellSize;
	}

	private cellKey(pos: Vector2): string {
		return `${Math.floor(pos.x / this.cellSize)},${Math.floor(pos.y / this.cellSize)}`;
	}

	insert(obj: T) {
		const key = this.cellKey(obj.pos);
		if (!this.cells.has(key)) {
			this.cells.set(key, new Set());
		}
		this.cells.get(key)!.add(obj);
	}

	remove(obj: T) {
		const key = this.cellKey(obj.pos);
		this.cells.get(key)?.delete(obj);
	}

	update(obj: T) {
		this.remove(obj);
		this.insert(obj);
	}

	queryRange(min: Vector2, max: Vector2): T[] {
		const results: T[] = [];
		const minCellX = Math.floor(min.x / this.cellSize);
		const minCellY = Math.floor(min.y / this.cellSize);
		const maxCellX = Math.floor(max.x / this.cellSize);
		const maxCellY = Math.floor(max.y / this.cellSize);

		for (let cx = minCellX; cx <= maxCellX; cx++) {
			for (let cy = minCellY; cy <= maxCellY; cy++) {
				const key = `${cx},${cy}`;
				if (this.cells.has(key)) {
					for (const obj of this.cells.get(key)!) {
						if (
							obj.pos.x >= min.x && obj.pos.x <= max.x &&
							obj.pos.y >= min.y && obj.pos.y <= max.y
						) {
							results.push(obj);
						}
					}
				}
			}
		}

		return results;
	}

	clear() {
		this.cells.clear();
	}
}
