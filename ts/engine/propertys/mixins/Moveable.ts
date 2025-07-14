import { Translateable } from "./Translateable"
import { Rotateable } from "./Rotateable"

type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;

export function Moveable<TBase extends AbstractConstructor>(Base: TBase) {
	return Translateable(Rotateable(Base));
}
