import { MakeTranslateable2D } from "./Translateable2D"
import { MakeRotateable } from "./Rotateable"

type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;

export function Moveable<TBase extends AbstractConstructor>(Base: TBase) {
	return MakeTranslateable2D(MakeRotateable(Base));
}
