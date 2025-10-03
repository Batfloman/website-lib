import { ObjectScene } from "./ObjectScene";
import { IRenderable } from "engine/propertys";
import { Positionable, PositionableTrait } from "engine/traits";
import { Vector2 } from "math";
import { HybridSpatialIndex } from "engine/spacial";
import { SceneObject } from "engine/entities";

export class WorldScene extends ObjectScene {
	private spatialIndex = new HybridSpatialIndex<Positionable>();

	addObject(
		obj: SceneObject & Partial<IRenderable> & Partial<Positionable>
	) {
		super.addObject(obj);

		if (PositionableTrait.is(obj)) {
			this.spatialIndex.insert(obj as Positionable, null);
		}
	}

	removeObject(obj: any) {
		super.removeObject(obj);

		if (PositionableTrait.is(obj)) {
			this.spatialIndex.remove(obj as Positionable);
		}
	}

	updateObjectPosition(obj: Positionable) {
		this.spatialIndex.update(obj);
	}

	getObjectsInArea(area: { pos: Vector2; size: Vector2 }): Positionable[] {
		const min = area.pos;
		const max = new Vector2(area.pos.x + area.size.x, area.pos.y + area.size.y);
		return this.spatialIndex.queryRange(min, max);
	}

	getObjects(): Positionable[] {
		return this.spatialIndex.getAllObjects();
	}

	clearObjects() {
		super.clearObjects();
		this.spatialIndex.clear();
	}
}


