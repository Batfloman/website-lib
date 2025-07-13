export class GameLoop {
	private lastTickTime = Date.now();
	private isStopped = false;

	constructor(private game: { update: (dt: number) => void }) { }

	start() {
		this.isStopped = false;
		this.loop();
	}

	stop() {
		this.isStopped = true;
	}

	private loop = () => {
		const now = Date.now();
		const deltaTime = (now - this.lastTickTime) / 1000; // in Sekunden
		this.lastTickTime = now;

		this.game.update(deltaTime);

		if (!this.isStopped) {
			window.requestAnimationFrame(this.loop);
		}
	};
}

