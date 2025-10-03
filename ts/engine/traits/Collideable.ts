import { HitBox } from "engine/physic";
import { Positionable } from "./Positionable";
import { Vector2 } from "math";

type AnyConstructor<T = {}> = abstract new (...args: any[]) => T;

// --- Type definition ---
export interface Collideable<THitBox extends HitBox> extends Positionable {
	hitbox: THitBox;

	position: Vector2;
	rotation: number;
	scale: number;
}

// --- Mixin function ---
export function CollideableTrait<THitBox extends HitBox>(Base: AnyConstructor) {
	abstract class CollideableImpl extends Base implements Collideable<THitBox> {
		readonly [CollideableTrait.tag] = true;

		abstract hitbox: THitBox;

		abstract position: Vector2;
		rotation: number = 0;
		scale: number = 1;
	}

	return CollideableImpl;
}

CollideableTrait.tag = Symbol("Collideable");

CollideableTrait.is = function <THitBox extends HitBox>(obj: any): obj is Collideable<THitBox> {
	return !!obj?.[CollideableTrait.tag];
};
