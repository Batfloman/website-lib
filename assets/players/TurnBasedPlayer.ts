import { Player } from "./Player.js"

export abstract class TurnBasedPlayer extends Player {
  turnFinished: boolean = false;

  isUp() {
    this.turnFinished = false;
  }

  abstract task(): void;
}