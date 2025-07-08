import { Input } from "../../input/Input.js";
import { HitBox } from "../../physic/boundingBox/HitBox.js";
import { Util } from "../../util/Util.js";
import { WorldObject } from "./WorldObject.js";

export abstract class ControllableObject<HitBoxType extends HitBox> extends WorldObject<HitBoxType> {
  private controlles: Map<inputKey, Function> = new Map();
  private timeOuts: Map<inputKey, { timeOut: number; timeElapsed: number }> = new Map();

  update(dt: number): void {
    for (let key of Array.from(this.controlles.keys())) {
      const timeout = this.timeOuts.get(key);
      if (!timeout) throw new Error("Timeout not defined for key " + key);
      
      timeout.timeElapsed += dt;
      if (timeout.timeElapsed >= timeout.timeOut) {
        if (Input.isPressed(key)) {
          timeout.timeElapsed = 0;
          const func = this.controlles.get(key);
          if (!func) throw new Error("Function not definded for key " + key);

          func.call(this, dt);
        }
      }
    }

    // normal update
    this.update2(dt);
  }

  abstract update2(dt: number): void;

  addControll(key: inputKey, func: Function, timeout: number = 0) {
    this.controlles.set(key, func);
    this.timeOuts.set(key, {
      timeOut: timeout,
      timeElapsed: 0,
    });
  }
}
