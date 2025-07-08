import { Game } from "../../games/Game";
export declare abstract class Player {
    static counter: number;
    game: Game;
    name: string;
    constructor(name?: string);
    init(game: Game): void;
}
