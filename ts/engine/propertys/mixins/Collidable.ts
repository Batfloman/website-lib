import { HitBox } from "engine/physic"
import { IScaleable } from "./Scaleable"

type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;

export function Collidable<TBase extends AbstractConstructor>(Base: TBase) {
	abstract class CollidableMixin extends Base {
		abstract get hitbox(): HitBox;

		collidesWith(other: CollidableMixin): boolean {
			if (this instanceof IScaleable)

				return this.hitbox.intersects(other.hitbox);
		}
	}
	return CollidableMixin;
}

