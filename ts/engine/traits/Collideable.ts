import { HitBox } from "engine/physic";

type Constructor<T = {}> = new (...args: any[]) => T;

// --- Type definition ---
export interface Collideable<THitBox extends HitBox> {
	hitbox: THitBox;
}

// --- Unique runtime identifier ---
const CollideableTag = Symbol("Collideable");

// --- Runtime type guard ---
export function isCollideable<THitBox extends HitBox = HitBox>(obj: any): obj is Collideable<THitBox> {
	return !!obj?.[CollideableTag];
}

// --- Mixin function ---
export function CollideableTrait<
	THitBox extends HitBox,
	TBase extends Constructor
>(Base: TBase) {
	abstract class CollideableImpl extends Base implements Collideable<THitBox> {
		[CollideableTag] = true;

		abstract hitbox: THitBox;
	}

	return CollideableImpl;
}
