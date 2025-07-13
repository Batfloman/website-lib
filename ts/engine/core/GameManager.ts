import { GameLoop } from '../core/GameLoop';
import { Scene } from '../managers/Scene';

export abstract class GameManager {
	public readonly gameLoop: GameLoop;
	protected scene: Scene;

	constructor() {
		this.gameLoop = new GameLoop(this);
		this.scene = new Scene();
	}

	abstract update(deltaTime: number): void;
}
