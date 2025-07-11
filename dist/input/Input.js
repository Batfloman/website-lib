import { Util } from "../util/Util";
import { Vector2 } from "../math/Vector2";
const keys = new Map([
    ["a", "a"],
    ["b", "b"],
    ["c", "c"],
    ["d", "d"],
    ["e", "e"],
    ["f", "f"],
    ["g", "g"],
    ["h", "h"],
    ["i", "i"],
    ["j", "j"],
    ["k", "k"],
    ["l", "l"],
    ["m", "m"],
    ["n", "n"],
    ["o", "o"],
    ["p", "p"],
    ["q", "q"],
    ["r", "r"],
    ["s", "s"],
    ["t", "t"],
    ["u", "u"],
    ["v", "v"],
    ["w", "w"],
    ["x", "x"],
    ["y", "y"],
    ["z", "z"],
    ["0", "0"],
    ["1", "1"],
    ["2", "2"],
    ["3", "3"],
    ["4", "4"],
    ["5", "5"],
    ["6", "6"],
    ["7", "7"],
    ["8", "8"],
    ["9", "9"],
    ["mouse0", "leftclick"],
    ["mouse2", "rightclick"],
    ["mouse1", "middleclick"],
    ["tab", "tab"],
    ["shift", "shift"],
    [" ", "space"],
    ["control", "strg"],
    ["altgraph", "altRight"],
    ["alt", "alt"],
    ["arrowleft", "left"],
    ["arrowright", "right"],
    ["arrowup", "up"],
    ["arrowdown", "down"],
]);
export class Input {
    static staticConstructor() {
        window.addEventListener("mousedown", (event) => {
            Input.keyDown(Input.getInputKey("mouse" + event.button));
            Input.mPos.x = event.offsetX;
            Input.mPos.y = event.offsetY;
        });
        window.addEventListener("mouseup", (event) => {
            Input.keyUp(Input.getInputKey("mouse" + event.button));
        });
        window.addEventListener("mousemove", (event) => {
            Input.mPos.x = event.offsetX;
            Input.mPos.y = event.offsetY;
        });
        window.addEventListener("keydown", (event) => {
            Input.keyDown(Input.getInputKey(event.key));
        });
        window.addEventListener("keyup", (event) => {
            Input.keyUp(Input.getInputKey(event.key));
        });
        window.addEventListener("blur", () => {
            this.pressedKeys = new Array();
        });
    }
    static newEventListener(event, obj, func) {
        if (!Input.eventListener.has(event))
            window.addEventListener(event, Input.notifyOfEvent);
        let listener = Input.eventListener.get(event);
        if (!listener)
            listener = new Array();
        listener.push(new Listener(obj, func));
        Input.eventListener.set(event, listener);
    }
    static removeEventListener(event, obj) {
        const listener = Input.eventListener.get(event);
        if (!listener)
            return;
        for (let lis of listener) {
            if (lis.obj == obj)
                Util.array.removeItem(listener, lis);
        }
    }
    static notifyOfEvent(event) {
        let listener = Input.eventListener.get(event.type);
        if (!listener)
            return;
        if (event instanceof MouseEvent)
            Input.mPos = new Vector2(event.offsetX, event.offsetY);
        listener.forEach((listener) => {
            listener.func.call(listener.obj, event);
        });
    }
    static keyDown(key) {
        if (!key)
            return;
        if (!this.pressedKeys.includes(key)) {
            this.pressedKeys.push(key);
        }
    }
    static keyUp(key) {
        if (!key)
            return;
        if (this.pressedKeys.includes(key)) {
            Util.array.removeItem(this.pressedKeys, key);
        }
    }
    static getInputKey(key) {
        key = key.toLowerCase();
        if (!keys.has(key))
            console.warn(key + " has no InputKey!");
        return keys.get(key);
    }
    static isLeftClick() {
        return Input.pressedKeys.includes("leftclick");
    }
    static isPressed(key) {
        return Input.pressedKeys.includes(key);
    }
}
Input.eventListener = new Map();
Input.pressedKeys = new Array();
Input.mPos = new Vector2();
class Listener {
    constructor(obj, func) {
        this.obj = obj;
        this.func = func;
    }
}
Input.staticConstructor();
const input = {
    listener: new Map(),
    pressedKey: [],
    mPos: new Vector2(),
};
