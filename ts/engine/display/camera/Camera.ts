import { Collision, HitBox, Rectangle } from "engine/physic";
import { CollideableBehaviour, ICollideable, IMoveable, RotateBehaviour, TranslationBehavior } from "engine/propertys";
import { Vector2 } from "math";
import { Util } from "util";
import { Zoom } from "./Zoom";

export class Camera implements ICollideable<HitBox>, IMoveable {
	pos: Vector2 = new Vector2();
	hitBox: Rectangle;
	orientation: number = 0;
	collider: CollideableBehaviour = new CollideableBehaviour(this);
	mover: TranslationBehavior = new TranslationBehavior(this);
	rotator: RotateBehaviour = new RotateBehaviour(this);

	lockMovement: boolean = false;

	protected zoom = new Zoom()

	constructor(width: number, height: number) {
		this.hitBox = new Rectangle(width, height);
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

		this.hitBox.scaler.setScale(1 / this.zoom.currentZoom);
		this.translatedPoints = this.hitBox.translatePoints(this.pos, this.orientation);
		this.alreadyTranslated = true
		return this.translatedPoints;
	}

	isCollidingWith(other: ICollideable): boolean {
		return Collision.testCollision(this, other);
	}
}
