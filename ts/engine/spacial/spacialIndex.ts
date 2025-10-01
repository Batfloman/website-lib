import { Vector2 } from "math";
import { Positionable } from "engine/traits";

export interface SpatialIndex<T extends Positionable> {
	insert(obj: T, dynamic?: boolean): void;
	remove(obj: T): void;
	update(obj: T): void; // call when pos changes
	getAllObjects(): T[];
	queryRange(min: Vector2, max: Vector2): T[];
	clear(): void;
}
