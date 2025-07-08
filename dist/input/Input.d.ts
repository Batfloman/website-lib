import { Vector2 } from "../math/Vector2";
export declare class Input {
    static eventListener: Map<string, Listener[]>;
    static pressedKeys: inputKey[];
    static mPos: Vector2;
    static staticConstructor(): void;
    static newEventListener<K extends keyof WindowEventMap>(event: K, obj: Object, func: Function): void;
    static removeEventListener<K extends keyof WindowEventMap>(event: K, obj: Object): void;
    private static notifyOfEvent;
    private static keyDown;
    private static keyUp;
    static getInputKey(key: string): inputKey | undefined;
    static isLeftClick(): boolean;
    static isPressed(key: inputKey): boolean;
}
declare class Listener {
    obj: Object;
    func: Function;
    constructor(obj: Object, func: Function);
}
export {};
