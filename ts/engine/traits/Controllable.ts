import { inputKey } from "input"

type AnyConstructor<T = {}> = abstract new (...args: any[]) => T;

// --- Type definition ---
export type Control = {
	func: Function,
	max_activation_Interval: number,
	time_since_last_activation: number,
}

export interface Controllable {
	controlls: Map<inputKey, Control[]>;
	addControl(key: inputKey, func: Function, max_activation_Interval: number): void;
}

// --- Mixin function ---
export function ControllableTrait(Base: AnyConstructor) {
	abstract class ControllableImpl extends Base implements Controllable {
		// Hidden runtime marker for trait detection
		readonly [ControllableTrait.tag] = true;

		controlls: Map<inputKey, Control[]> = new Map();

		addControl(key: inputKey, func: Function, max_activation_Interval: number = 0) {
			let control: Control = {
				func,
				max_activation_Interval,
				time_since_last_activation: 0,
			}
			const prev = this.controlls.get(key) || [];
			prev.push(control);
			this.controlls.set(key, prev);
		}
	};
	return ControllableImpl;
}

ControllableTrait.tag = Symbol("Controllable");

ControllableTrait.is = function(obj: any): obj is Controllable {
	return !!obj?.[ControllableTrait.tag];
}
