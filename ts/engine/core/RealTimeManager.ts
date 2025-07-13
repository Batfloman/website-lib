import { GameManager } from '../core/GameManager';

export class RealTimeManager extends GameManager {
	update(deltaTime: number) {
		console.log(deltaTime);
	}
}

