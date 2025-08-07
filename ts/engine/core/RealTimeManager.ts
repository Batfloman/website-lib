import { Renderer } from 'engine/display';
import { GameManager } from '../core/GameManager';

export class RealTimeManager extends GameManager {
	update(dt: number) {
		super.update(dt)
		console.log(dt);
	}
}

