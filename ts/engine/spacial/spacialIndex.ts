import { Vector2 } from "math";
import { IPositionable } from "engine/propertys";

export interface SpatialIndex<T extends IPositionable> {
	insert(obj: T, dynamic?: boolean): void;
	remove(obj: T): void;
	update(obj: T): void; // call when pos changes
	queryRange(min: Vector2, max: Vector2): T[];
	clear(): void;
}
