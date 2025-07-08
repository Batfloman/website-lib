import { Util } from "../util/Util.js";
import { Vector2 } from "../util/Vector2.js";

const keys: Map<string, inputKey> = new Map([
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
  static eventListener: Map<string, Listener[]> = new Map();

  static pressedKeys: inputKey[] = new Array();

  static mPos = new Vector2();

  /** updates the most important changes for easier access */
  static staticConstructor() {
    // Mouse
    window.addEventListener("mousedown", (event: MouseEvent) => {
      Input.keyDown(Input.getInputKey("mouse" + event.button));
      Input.mPos.x = event.offsetX;
      Input.mPos.y = event.offsetY;
    });
    window.addEventListener("mouseup", (event: MouseEvent) => {
      Input.keyUp(Input.getInputKey("mouse" + event.button));
    });
    window.addEventListener("mousemove", (event: MouseEvent) => {
      Input.mPos.x = event.offsetX;
      Input.mPos.y = event.offsetY;
    });

    // Keys
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      Input.keyDown(Input.getInputKey(event.key));
    });
    window.addEventListener("keyup", (event: KeyboardEvent) => {
      Input.keyUp(Input.getInputKey(event.key));
    });

    // Window changes
    window.addEventListener("blur", () => {
      this.pressedKeys = new Array();
    });
  }

  static newEventListener<K extends keyof WindowEventMap>(event: K, obj: Object, func: Function) {
    if (!Input.eventListener.has(event)) window.addEventListener(event, Input.notifyOfEvent);

    let listener = Input.eventListener.get(event);
    if (!listener) listener = new Array();

    listener.push(new Listener(obj, func));
    Input.eventListener.set(event, listener);
  }

  static removeEventListener<K extends keyof WindowEventMap>(event: K, obj: Object) {
    const listener = Input.eventListener.get(event);
    if (!listener) return;

    for (let lis of listener) {
      if (lis.obj == obj) Util.array.removeItem(listener, lis);
    }
  }

  private static notifyOfEvent(event: Event) {
    let listener = Input.eventListener.get(event.type);
    if (!listener) return;

    if (event instanceof MouseEvent) Input.mPos = new Vector2(event.offsetX, event.offsetY);

    listener.forEach((listener) => {
      listener.func.call(listener.obj, event);
    });
  }

  private static keyDown(key: inputKey | undefined) {
    if (!key) return;

    if (!this.pressedKeys.includes(key)) {
      this.pressedKeys.push(key);
    }
  }

  private static keyUp(key: inputKey | undefined) {
    if (!key) return;

    if (this.pressedKeys.includes(key)) {
      Util.array.removeItem(this.pressedKeys, key);
    }
  }

  static getInputKey(key: string): inputKey | undefined {
    key = key.toLowerCase();
    if (!keys.has(key)) console.warn(key + " has no InputKey!");
    return keys.get(key);
  }

  static isLeftClick(): boolean {
    return Input.pressedKeys.includes("leftclick");
  }

  static isPressed(key: inputKey): boolean {
    return Input.pressedKeys.includes(key);
  }
}

class Listener {
  obj: Object;
  func: Function;

  constructor(obj: Object, func: Function) {
    this.obj = obj;
    this.func = func;
  }
}

// call static Constructor
Input.staticConstructor();

// ===================


const input = {
  listener: new Map(),

  pressedKey: [],

  mPos: new Vector2(),
}