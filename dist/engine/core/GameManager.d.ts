import { GameLoop } from '../core/GameLoop';
import { Scene } from '../managers/Scene';
export declare abstract class GameManager {
    readonly gameLoop: GameLoop;
    protected scene: Scene;
    constructor();
    abstract update(deltaTime: number): void;
}
