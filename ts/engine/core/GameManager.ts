import { Renderer } from 'engine/renderer';
import { GameLoop } from '../core/GameLoop';
import { SceneManager } from './SceneManager';
import { IUpdateable } from 'engine/propertys';

export abstract class GameManager implements IUpdateable {
	public readonly gameLoop: GameLoop;
	public readonly sceneManager: SceneManager;

	constructor(renderer: Renderer) {
		this.gameLoop = new GameLoop(this, renderer);
		this.sceneManager = new SceneManager();
	}

	fixedUpdate(dt: number): void {
		const context: GameContext = { game: this }
		this.sceneManager.fixedUpdate(dt, context);
	}

	update(dt: number): void {
		const context: GameContext = { game: this }
		this.sceneManager.update(dt, context);
	}

	render(renderer: Renderer): void {
		this.sceneManager.render(renderer);
	}
}

export interface GameContext {
	game: GameManager;
}
