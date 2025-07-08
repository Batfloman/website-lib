import { Canvas } from "../display/Canvas.js";
import { Player } from "../assets/players/Player.js";
import { TurnBasedPlayer } from "../assets/players/TurnBasedPlayer.js";
import { Util } from "../util/Util.js";
import { Game } from "./Game.js";

export class TurnBasedGame extends Game {
  protected players: TurnBasedPlayer[];
  protected currentPlayer: TurnBasedPlayer;

  constructor(canvas: Canvas, players?: TurnBasedPlayer | TurnBasedPlayer[]) {
    super(canvas);

    if (!players) this.players = [];
    else if (players instanceof Player) this.players = [players];
    else this.players = players;

    this.currentPlayer = this.randomPlayerTurn();
  }

  tick() {
    super.tick();

    if (Util.array.isEmpty(this.players)) return;

    if (this.currentPlayer.turnFinished) {
      this.nextPlayer();
      this.currentPlayer.isUp();
    }
  }

  addPlayer(player: TurnBasedPlayer): void {
    if (this.players.includes(player)) return;

    this.players.push(player);
    player.init(this);
  }

  randomPlayerTurn(): TurnBasedPlayer {
    this.currentPlayer = Util.array.getRandomItem(this.players);
    return this.currentPlayer;
  }

  mixPlayerOrder(): void {
    let mixedPlayer = [];
    while (this.players.length > 0) {
      mixedPlayer.push(
        Util.array.removeItemAtIndex(
          this.players,
          Util.math.random.between(0, this.players.length - 1)
        )
      );
    }
    this.players = mixedPlayer;
  }

  nextPlayer(): TurnBasedPlayer {
    if (!this.currentPlayer) this.randomPlayerTurn();
    else
      this.currentPlayer = Util.array.getItem(
        this.players,
        this.players.indexOf(this.currentPlayer) + 1
      );
    return this.currentPlayer;
  }
}
