import { Game } from "../../games/Game";

export abstract class Player {
  static counter: number = 0;

  game!: Game;

  name: string;

  constructor(name?: string) {
    if (!name) name = "Player" + Player.counter++;

    this.name = name;
  }

  init(game: Game) {
    this.game = game;
  }
}
