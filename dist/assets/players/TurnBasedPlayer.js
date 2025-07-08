import { Player } from "./Player";
export class TurnBasedPlayer extends Player {
    constructor() {
        super(...arguments);
        this.turnFinished = false;
    }
    isUp() {
        this.turnFinished = false;
    }
}
