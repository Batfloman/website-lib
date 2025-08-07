import { Renderer } from "engine/display";

export class GameLoop {
	private lastTickTime = Date.now();
	private isStopped = false;
	private accumulator = 0;
	private readonly fixedDelta = 1 / 60; // 60 FPS → 16.666... ms

	constructor(
		private game: {
			fixedUpdate: (fixedDt: number) => void;
			update: (dt: number) => void;
			render: (renderer: Renderer) => void;
		},
		private renderer: Renderer,
	) { }

	start() {
		this.isStopped = false;
		this.lastTickTime = Date.now();
		this.accumulator = 0;
		this.loop();
	}

	stop() {
		this.isStopped = true;
	}

	private loop() {
		const now = Date.now();
		const deltaTime = (now - this.lastTickTime) / 1000;
		this.lastTickTime = now;
		this.accumulator += deltaTime;

		// 🧮 Fixed-step loop
		while (this.accumulator >= this.fixedDelta) {
			this.game.fixedUpdate(this.fixedDelta);
			this.accumulator -= this.fixedDelta;
		}

		// 🧠 Variable update (z. B. Animationen)
		this.game.update(deltaTime);

		// 🎨 Rendering
		this.game.render(this.renderer);

		if (!this.isStopped) {
			window.requestAnimationFrame(this.loop);
		}
	};
}
