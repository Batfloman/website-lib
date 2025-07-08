import { Canvas } from "../display/Canvas";
import { TurnBasedPlayer } from "../assets/players/TurnBasedPlayer";
import { Game } from "./Game";
export declare class TurnBasedGame extends Game {
    protected players: TurnBasedPlayer[];
    protected currentPlayer: TurnBasedPlayer;
    constructor(canvas: Canvas, players?: TurnBasedPlayer | TurnBasedPlayer[]);
    tick(): void;
    addPlayer(player: TurnBasedPlayer): void;
    randomPlayerTurn(): TurnBasedPlayer;
    mixPlayerOrder(): void;
    nextPlayer(): TurnBasedPlayer;
}
