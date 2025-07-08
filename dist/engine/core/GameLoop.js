export class GameLoop {
    constructor(game) {
        this.game = game;
        this.lastTickTime = Date.now();
        this.isStopped = false;
        this.maxDTPerTick = 75;
        this.loop = () => {
            this.game.tick();
            if (!this.isStopped) {
                window.requestAnimationFrame(this.loop);
            }
        };
    }
    start() {
        this.isStopped = false;
        this.loop();
    }
    stop() {
        this.isStopped = true;
    }
}
