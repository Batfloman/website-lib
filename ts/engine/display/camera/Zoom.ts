export class Zoom {
	activated: boolean = true;
	faktor: number;
	minZoom: number;
	maxZoom: number;
	currentZoom: number;

	constructor(faktor: number = 1.15, minZoom: number = 0.5, maxZoom: number = 3) {
		this.faktor = faktor;
		this.minZoom = minZoom;
		this.maxZoom = maxZoom;
		this.currentZoom = 1;
	}

	zoomIn(): number | null {
		if (!this.activated) return null;

		const nextZoom = this.currentZoom / this.faktor;
		if (nextZoom < this.minZoom) return null;

		this.currentZoom = nextZoom;
		return this.currentZoom;
	}

	zoomOut(): number | null {
		if (!this.activated) return null;

		const nextZoom = this.currentZoom * this.faktor;
		if (nextZoom > this.maxZoom) return null;

		this.currentZoom = nextZoom;
		return this.currentZoom;
	}

	setZoom(zoom: number = 1) {
		this.currentZoom = zoom;
	}

	setActivated(value: boolean) {
		this.activated = value;
	}

	enable() {
		this.activated = true;
	}
	disable() {
		this.activated = false;
	}
}

