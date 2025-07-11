import { Input } from "../input/Input.js";
import { Collision } from "../physic/algorithms/Collision.js";
import { Polygon2Helper } from "../physic/algorithms/Polygon2Helper.js";
import { Rectangle } from "../physic/boundingBox/Rectangle.js";
import { Util } from "../util/Util.js";
import { Vector2 } from "../util/Vector2.js";
export class Camara {
    constructor(canvas, pos) {
        this.alreadyTranslated = false;
        this.lockScaling = true;
        this.zoomFactor = 1.15;
        this.maxZoomInAmount = Infinity;
        this.maxZoomOutAmount = Infinity;
        this.scaleAmount = 0;
        this.scaleValue = 1;
        this.lockMovement = true;
        this.canvas = canvas;
        this.pos = !pos ? new Vector2() : pos;
        this.hitBox = new Rectangle(this.canvas.htmlCanvas.width, this.canvas.htmlCanvas.height);
        this.orientation = 0;
        this.translatePoints();
        Input.newEventListener("wheel", this, this.mouseWheel);
        Input.newEventListener("mousemove", this, this.mouseMove);
        Input.newEventListener("touchmove", this, this.touchMove);
        Input.newEventListener("touchend", this, () => (this.previousTouchPos = undefined));
        Input.newEventListener("touchcancel", this, () => (this.previousTouchPos = undefined));
        Input.newEventListener("resize", this, () => {
            this.hitBox = new Rectangle(this.canvas.htmlCanvas.width, this.canvas.htmlCanvas.height);
            this.alreadyTranslated = false;
        });
    }
    getOffset() {
        return new Vector2(this.canvas.width / 2, this.canvas.height / 2);
    }
    moveDirection(direction, distance) {
        this.pos = Util.moveDirection(this.pos, direction, distance);
    }
    move(move) {
        this.pos = this.pos.add(move);
    }
    isCollidingWith(other) {
        return Collision.testCollision(this, other);
    }
    translatePoints() {
        if (this.alreadyTranslated)
            return this.translatedPoints;
        this.translatedPoints = [];
        for (let point of this.hitBox.model) {
            point = point.scale(1 / this.scaleValue);
            this.translatedPoints.push(Polygon2Helper.translatePoint(point, this.pos, this.orientation));
        }
        this.hitBox.farthestDistance = this.getOffset()
            .scale(1 / this.scaleValue)
            .getMagnitude();
        this.alreadyTranslated = true;
        return this.translatedPoints;
    }
    mouseWheel(event) {
        if (this.lockScaling)
            return;
        event.deltaY < 0 ? this.zoomIn() : this.zoomOut();
        this.updateScaleValue();
        this.alreadyTranslated = false;
    }
    zoomIn() {
        if (this.scaleAmount >= this.maxZoomInAmount)
            return;
        this.scaleAmount++;
    }
    zoomOut() {
        if (this.scaleAmount <= -this.maxZoomOutAmount)
            return;
        this.scaleAmount--;
    }
    updateScaleValue() {
        this.scaleValue = Math.pow(this.zoomFactor, this.scaleAmount);
    }
    setScale(scale) {
        this.scaleAmount = scale;
        this.updateScaleValue();
        this.alreadyTranslated = false;
    }
    setMaxZoomInAmount(amount) {
        this.maxZoomInAmount = amount;
    }
    setMaxZoomOutAmount(amount) {
        this.maxZoomOutAmount = amount;
    }
    setZoomingFactor(factor) {
        this.zoomFactor = factor;
        this.alreadyTranslated = false;
    }
    setLockScaling(b) {
        this.lockScaling = b;
    }
    mouseMove(event) {
        if (this.lockMovement)
            return;
        if (!Input.isLeftClick())
            return;
        this.pos.x -= event.movementX / this.scaleValue;
        this.pos.y += event.movementY / this.scaleValue;
        this.alreadyTranslated = false;
    }
    setLockMovement(b) {
        this.lockMovement = b;
    }
    touchMove(event) {
        if (this.lockMovement)
            return;
        const touch = event.touches[0] || event.changedTouches[0];
        const touchPos = new Vector2(touch.clientX, touch.clientY);
        if (!this.previousTouchPos) {
            this.previousTouchPos = touchPos;
            return;
        }
        const move = touchPos.subtract(this.previousTouchPos);
        this.previousTouchPos = touchPos;
        this.pos.x -= move.x / this.scaleValue;
        this.pos.y += move.y / this.scaleValue;
        this.alreadyTranslated = false;
    }
}
