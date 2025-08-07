import { GameManager } from "./GameManager";

export class TurnBasedManager extends GameManager {
	update(dt: number) {
		super.update(dt)
		console.log(dt);
	}
}
