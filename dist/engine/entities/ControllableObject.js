import { Input } from "../../input/Input";
import { WorldObject } from "./WorldObject";
export class ControllableObject {
}
export class ControllableObject extends WorldObject {
    constructor() {
        super(...arguments);
        this.controlles = new Map();
        this.timeOuts = new Map();
    }
    update(dt) {
        for (let key of Array.from(this.controlles.keys())) {
            const timeout = this.timeOuts.get(key);
            if (!timeout)
                throw new Error("Timeout not defined for key " + key);
            timeout.timeElapsed += dt;
            if (timeout.timeElapsed >= timeout.timeOut) {
                if (Input.isPressed(key)) {
                    timeout.timeElapsed = 0;
                    const func = this.controlles.get(key);
                    if (!func)
                        throw new Error("Function not definded for key " + key);
                    func.call(this, dt);
                }
            }
        }
        this.update2(dt);
    }
    addControll(key, func, timeout = 0) {
        this.controlles.set(key, func);
        this.timeOuts.set(key, {
            timeOut: timeout,
            timeElapsed: 0,
        });
    }
}
