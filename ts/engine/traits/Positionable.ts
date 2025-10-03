import { Vector2 } from "math";

type AnyConstructor<T = {}> = abstract new (...args: any[]) => T;

// --- Type definition ---
export interface Positionable {
	position: Vector2
}

// --- Mixin function ---
export function PositionableTrait<TBase extends AnyConstructor>(Base: TBase) {
	abstract class PositionableImpl extends Base implements Positionable {
		readonly [PositionableTrait.tag] = true;

		abstract position: Vector2;
	};
	return PositionableImpl;
}

// attach a unique tag symbol
PositionableTrait.tag = Symbol("Moveable");

// and a type guard
PositionableTrait.is = function(obj: any): obj is Positionable {
	return !!obj?.[PositionableTrait.tag];
};
