import { Renderer } from 'engine/renderer';
import { GameLoop } from '../core/GameLoop';
import { SceneManager } from './SceneManager';
import { IUpdateable } from 'engine/propertys';
import { Integrator } from 'engine/physic/integrator/Integrator';
import { SceneObject } from 'engine/entities';
import { ObjectScene, WorldScene } from 'engine/scenes';
import { System, SystemPhases } from './System';

export abstract class GameManager implements IUpdateable {
	public readonly gameLoop: GameLoop;
	public readonly sceneManager: SceneManager;
	private worldIntegrator?: Integrator;
	private fixedSystems: System[] = [];
	private updateSystems: System[] = [];
	private renderSystems: System[] = [];

	constructor(renderer: Renderer, integrator?: Integrator) {
		this.gameLoop = new GameLoop(this, renderer);
		this.sceneManager = new SceneManager();
		this.worldIntegrator = integrator;

		this.addSystem(this.sceneManager, { fixed: true, update: true, render: true });
	}

	fixedUpdate(dt: number): void {
		this.syncActiveWorldIntegrator();
		for (const system of this.fixedSystems) {
			system.fixedUpdate?.(dt);
		}
	}

	update(dt: number): void {
		for (const system of this.updateSystems) {
			system.update?.(dt);
		}
	}

	render(renderer: Renderer): void {
		for (const system of this.renderSystems) {
			system.render?.(renderer);
		}
	}

	addSystem(system: System, phases: SystemPhases = { fixed: true, update: true, render: true }) {
		this.removeSystem(system);

		if (phases.fixed) this.fixedSystems.push(system);
		if (phases.update) this.updateSystems.push(system);
		if (phases.render) this.renderSystems.push(system);
	}

	removeSystem(system: System) {
		this.fixedSystems = this.fixedSystems.filter(s => s !== system);
		this.updateSystems = this.updateSystems.filter(s => s !== system);
		this.renderSystems = this.renderSystems.filter(s => s !== system);
	}

	addObj(obj: SceneObject, sceneName?: string) {
		const scene = sceneName
			? this.sceneManager.getScene(sceneName)
			: this.sceneManager.getActiveScene();
		if (scene && scene instanceof ObjectScene) {
			scene.addObject(obj);
		}
	}

	removeObj(obj: SceneObject, sceneName?: string) {
		const scene = sceneName
			? this.sceneManager.getScene(sceneName)
			: this.sceneManager.getActiveScene();
		if (scene && scene instanceof ObjectScene) {
			scene.removeObject(obj)
		}
	}

	changeIntegrator(integrator: Integrator) {
		this.worldIntegrator = integrator;
		this.syncActiveWorldIntegrator();
	}

	private syncActiveWorldIntegrator() {
		const activeScene = this.sceneManager.getActiveScene();
		if (activeScene instanceof WorldScene && this.worldIntegrator) {
			activeScene.setIntegrator(this.worldIntegrator);
		}
	}
}
