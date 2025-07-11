import { GameLoop } from '../core/GameLoop';
export class GameManager {
    constructor() {
        this.gameLoop = new GameLoop(this);
    }
}
