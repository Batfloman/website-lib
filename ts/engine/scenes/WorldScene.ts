import { ObjectScene } from "./ObjectScene";
import { IRenderable, IPositionable, isPositionable } from "engine/propertys";
import { Vector2 } from "math";
import { HybridSpatialIndex } from "engine/spacial";
import { SceneObject } from "engine/entities";

export class WorldScene extends ObjectScene {
	private spatialIndex = new HybridSpatialIndex<IPositionable>();

	addObject(
		obj: SceneObject & Partial<IRenderable> & Partial<IPositionable>
	) {
		super.addObject(obj);

		if (isPositionable(obj)) {
			// null = auto-detect based on `mover` property from ITranslateable
			this.spatialIndex.insert(obj as IPositionable, null);
		}
	}

	removeObject(obj: any) {
		super.removeObject(obj);

		if (isPositionable(obj)) {
			this.spatialIndex.remove(obj as IPositionable);
		}
	}

	updateObjectPosition(obj: IPositionable) {
		this.spatialIndex.update(obj);
	}

	getObjectsInArea(area: { pos: Vector2; size: Vector2 }): IPositionable[] {
		const min = area.pos;
		const max = new Vector2(area.pos.x + area.size.x, area.pos.y + area.size.y);
		return this.spatialIndex.queryRange(min, max);
	}

	clearObjects() {
		super.clearObjects();
		this.spatialIndex.clear();
	}
}


