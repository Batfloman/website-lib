import { Rectangle } from "engine/physic";
import { Vector2 } from "math";
import { Camera } from "../Camera";
import { Canvas } from "engine/renderer";
import { Input } from "input";

export class CanvasCamera extends Camera {
	constructor(canvas: Canvas) {
		super(canvas.width, canvas.height);

		Input.newEventListener("wheel", this, this.mouseWheel)
		Input.newEventListener("mousemove", this, this.mouseMove);

		Input.newEventListener("touchmove", this, this.touchMove);
		Input.newEventListener("touchend", this, () => (this.previousTouchPos = undefined));
		Input.newEventListener("touchcancel", this, () => (this.previousTouchPos = undefined));

		Input.newEventListener("resize", this, () => {
			canvas.updateSize()
			this.hitBox = new Rectangle(canvas.width, canvas.height)
			this.alreadyTranslated = false;
		});
	}

	// ==================================================
	// eventhandlers

	private mouseWheel(event: WheelEvent): void {
		if (!this.zoom.activated) return;

		if (event.deltaY < 0) {
			this.zoom.zoomIn();
		} else if (event.deltaY > 0) {
			this.zoom.zoomOut();
		}

		this.alreadyTranslated = false;
	}

	private mouseMove(event: MouseEvent): void {
		if (this.lockMovement) return;

		if (!Input.isLeftClick()) return;

		this.pos.x -= event.movementX / this.zoom.currentZoom;
		this.pos.y += event.movementY / this.zoom.currentZoom;

		this.alreadyTranslated = false;
	}

	private previousTouchPos: Vector2 | undefined;
	private touchMove(event: TouchEvent): void {
		if (this.lockMovement) return;

		const touch = event.touches[0] || event.changedTouches[0];
		const touchPos = new Vector2(touch.clientX, touch.clientY);

		if (!this.previousTouchPos) {
			this.previousTouchPos = touchPos;
			return;
		}

		const move = touchPos.subtract(this.previousTouchPos);
		this.previousTouchPos = touchPos;

		this.pos.x -= move.x / this.zoom.currentZoom;
		this.pos.y += move.y / this.zoom.currentZoom;

		this.alreadyTranslated = false;
	}

}
