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

	abstract fixedUpdate(fixedDt: number): void;
	abstract update(deltaTime: number): void;
	abstract render(renderer: Renderer): void;
}
