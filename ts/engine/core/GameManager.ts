import { Renderer } from 'engine/renderer';
import { GameLoop } from '../core/GameLoop';
import { SceneManager } from './SceneManager';
import { IUpdateable } from 'engine/propertys';
import { PhysicsManager } from './PhysicsManager';
import { Integrator, Integrable, isIntegrable } from 'engine/physic/integrator/Integrator';
import { SceneObject } from 'engine/entities';
import { WorldScene } from 'engine/scenes';
import { EulerIntegrator } from 'engine/physic';

export abstract class GameManager implements IUpdateable {
	public readonly gameLoop: GameLoop;
	public readonly sceneManager: SceneManager;
	private physicsManager: PhysicsManager;

	constructor(renderer: Renderer, integrator = new EulerIntegrator()) {
		this.gameLoop = new GameLoop(this, renderer);
		this.sceneManager = new SceneManager();
		this.physicsManager = new PhysicsManager(integrator);
	}

	fixedUpdate(dt: number): void {
		this.physicsManager.step(dt);
		this.sceneManager.fixedUpdate(dt);
	}

	update(dt: number): void {
		this.sceneManager.update(dt);
	}

	render(renderer: Renderer): void {
		this.sceneManager.render(renderer);
	}

	addObj(obj: SceneObject, sceneName?: string) {
		const scene = sceneName
			? this.sceneManager.getScene(sceneName)
			: this.sceneManager.getActiveScene();
		if (scene && scene instanceof WorldScene)
			scene?.addObject(obj);

		if (isIntegrable(obj)) {
			this.physicsManager.add(obj);
		}
	}

	removeObj(obj: SceneObject, sceneName?: string) {
		const scene = sceneName
			? this.sceneManager.getScene(sceneName)
			: this.sceneManager.getActiveScene();
		if (scene && scene instanceof WorldScene)
			scene?.removeObject(obj);

		if (isIntegrable(obj)) {
			this.physicsManager.remove(obj)
		}
	}

	changeIntegrator(integrator: Integrator) {
		this.physicsManager.setIntegrator(integrator);
	}
}
