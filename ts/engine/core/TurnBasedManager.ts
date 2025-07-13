import { GameManager } from "./GameManager";

export class TurnBasedManager extends GameManager {
	update(deltaTime: number) {
		console.log(deltaTime);
	}
}
