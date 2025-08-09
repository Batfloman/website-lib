import { IPreUpdateable } from "engine/propertys/IPreUpdateable";
import { GameObject } from "./GameObject";
import { Input, inputKey } from "input";
import { SceneContext } from "engine/core";

type Control = {
	func: Function,
	max_activation_Interval: number,
	time_since_last_activation: number,
}

export abstract class ControllableObject extends GameObject {
	private controls: Map<inputKey, Control[]> = new Map();

	update(deltaTime: number, context: SceneContext): void {
		this.controls.forEach((controls, key) => {
			if (!Input.isPressed(key)) return;

			for (const control of controls) {
				control.time_since_last_activation += deltaTime;

				if (control.time_since_last_activation >= control.max_activation_Interval) {
					control.func.call(this, deltaTime);
					control.time_since_last_activation -= control.max_activation_Interval;
				}
			}
		})
	}

	addControl(key: inputKey, func: Function, max_activation_Interval: number = 0) {
		let control: Control = {
			func,
			max_activation_Interval,
			time_since_last_activation: 0,
		}
		const prev = this.controls.get(key) ?? [];
		prev.push(control);
		this.controls.set(key, prev);
	}
}
