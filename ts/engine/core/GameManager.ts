import { Renderer } from 'engine/display';
import { GameLoop } from '../core/GameLoop';
import { SceneManager } from './SceneManager';

export abstract class GameManager {
	public readonly gameLoop: GameLoop;
	public readonly sceneManager: SceneManager;

	constructor(renderer: Renderer) {
		this.gameLoop = new GameLoop(this, renderer);
		this.sceneManager = new SceneManager();
	}

	fixedUpdate(dt: number): void {
		this.sceneManager.fixedUpdate(dt);
	}

	update(dt: number): void {
		this.sceneManager.update(dt);
	}

	render(renderer: Renderer): void {
		this.sceneManager.render(renderer);
	}
}
