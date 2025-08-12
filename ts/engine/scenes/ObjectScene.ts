import { Scene } from "./Scene";
import { IRenderable } from "engine/propertys";
import { Renderer } from "engine/renderer";
import { SceneObject } from "engine/entities";

export class ObjectScene extends Scene {
	private updateables: SceneObject[] = [];
	private renderables: IRenderable[] = [];

	addObject(obj: SceneObject & Partial<IRenderable>) {
		this.updateables.push(obj);
		if (typeof obj.render === "function") {
			this.renderables.push(obj as IRenderable);
		}
		obj.addedToScene(this)
	}

	removeObject(obj: SceneObject & Partial<IRenderable>) {
		this.updateables = this.updateables.filter(o => o !== obj);
		if (typeof obj.render === "function") {
			this.renderables = this.renderables.filter(o => o !== obj);
		}
		obj.removedFromScene();
	}

	fixedUpdate(dt: number) {
		for (const obj of this.updateables) {
			obj.fixedUpdate?.(dt);
		}
	}

	update(dt: number) {
		for (const obj of this.updateables) {
			if (obj.shouldUpdate?.() !== false) {
				obj.update(dt);
			}
		}
	}

	render(renderer: Renderer) {
		for (const obj of this.renderables) {
			if (obj.shouldRender?.() !== false) {
				obj.render(renderer);
			}
		}
	}

	clearObjects(): void {
		this.updateables = []
		this.renderables = []
	}
}
