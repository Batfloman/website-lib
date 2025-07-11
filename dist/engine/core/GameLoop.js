export class GameLoop {
    constructor(game) {
        this.game = game;
        this.lastTickTime = Date.now();
        this.isStopped = false;
        this.loop = () => {
            const now = Date.now();
            const deltaTime = (now - this.lastTickTime) / 1000;
            this.lastTickTime = now;
            this.game.update(deltaTime);
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
