import { Input } from "input/Input";

export class Canvas {
	private htmlCanvas: HTMLCanvasElement;

	public width: number = 0;
	public height: number = 0;

	constructor(htmlCanvas: HTMLCanvasElement | null) {
		this.htmlCanvas = htmlCanvas ?? document.createElement("canvas");

		Input.newEventListener("resize", this, this.updateSize);
		this.updateSize();
	}

	updateSize() {
		this.htmlCanvas.width = this.htmlCanvas.getBoundingClientRect().width;
		this.htmlCanvas.height = this.htmlCanvas.getBoundingClientRect().height;

		this.width = this.htmlCanvas.getBoundingClientRect().width;
		this.height = this.htmlCanvas.getBoundingClientRect().height;
	}
}
