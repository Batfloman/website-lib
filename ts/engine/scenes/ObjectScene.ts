import { Scene } from "./Scene";
import { IUpdateable, IRenderable } from "engine/propertys";
import { SceneContext } from "engine/core";
import { Renderer } from "engine/renderer";

export class ObjectScene extends Scene {
	private updateables: IUpdateable<SceneContext>[] = [];
	private renderables: IRenderable[] = [];

	addObject(obj: IUpdateable<SceneContext> & Partial<IRenderable>) {
		this.updateables.push(obj);
		if (typeof obj.render === "function") {
			this.renderables.push(obj as IRenderable);
		}
	}

	removeObject(obj: IUpdateable<SceneContext> & Partial<IRenderable>) {
		this.updateables = this.updateables.filter(o => o !== obj);
		if (typeof obj.render === "function") {
			this.renderables = this.renderables.filter(o => o !== obj);
		}
	}

	fixedUpdate(dt: number, context: SceneContext) {
		for (const obj of this.updateables) {
			obj.fixedUpdate?.(dt, context);
		}
	}

	update(dt: number, context: SceneContext) {
		for (const obj of this.updateables) {
			if (obj.shouldUpdate?.() !== false) {
				obj.update(dt, context);
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
}
