export class Player {
    constructor(name) {
        if (!name)
            name = "Player" + Player.counter++;
        this.name = name;
    }
    init(game) {
        this.game = game;
    }
}
Player.counter = 0;
