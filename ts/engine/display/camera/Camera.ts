import { Collision, HitBox, Rectangle } from "engine/physic";
import { ICollideable } from "engine/propertys";
import { Vector2 } from "math";
import { Util } from "util";
import { Zoom } from "./Zoom";

export class Camera implements ICollideable {
	pos: Vector2 = new Vector2();
	lockMovement: boolean = false;
	orientation: number = 0;

	hitBox: HitBox;

	protected zoom = new Zoom()

	constructor(width: number, height: number) {
		this.hitBox = new Rectangle(width, height);
	}

	move(translation_vec: Vector2): void {
		this.pos.x += translation_vec.x
		this.pos.y += translation_vec.y

		this.alreadyTranslated = false;
	}
	moveDirection(degrees: number, distance: number): void {
		const rad = Util.math.convert.DegToRad(degrees)
		const dx = Math.cos(rad) * distance;
		const dy = Math.sin(rad) * distance;
		this.pos.x += dx;
		this.pos.y += dy;

		this.alreadyTranslated = false;
	}

	rotate(degrees: number) {
		this.orientation += degrees;
		this.orientation %= 360;

		this.alreadyTranslated = false;
	}

	translatedPoints: Vector2[] = [];
	alreadyTranslated: boolean = false;

	translatePoints(): Vector2[] {
		if (this.alreadyTranslated) return this.translatedPoints;

		this.hitBox.setScale(1 / this.zoom.currentZoom);
		this.translatedPoints = this.hitBox.translatePoints(this.pos, this.orientation);
		this.alreadyTranslated = true
		return this.translatedPoints;
	}

	isCollidingWith(other: ICollideable): boolean {
		return Collision.testCollision(this, other);
	}
}
