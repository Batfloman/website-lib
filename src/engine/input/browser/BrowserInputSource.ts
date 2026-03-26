import { Vec2 } from "../../math";
import type { AppAction, AppAxis } from "../AppInput";
import type {
  InputSnapshot,
  InputSource,
  PointerButton,
} from "../InputSource";
import type {
  InputActionBinding,
  InputAxisBinding,
} from "./BrowserInputBindings";

function getMouseButton(button: PointerButton): number {
  switch (button) {
    case "Left":
      return 0;
    case "Middle":
      return 1;
    case "Right":
      return 2;
    default:
      throw new Error(`Unsupported mouse button "${button}".`);
  }
}

export interface BrowserInputSourceOptions {
  target?: Window | HTMLElement | Document;
}

class BrowserInputSnapshot<
  TAction extends string = AppAction,
  TAxis extends string = AppAxis,
> implements InputSnapshot<TAction, TAxis> {
  constructor(
    private readonly pressedActions: ReadonlySet<TAction>,
    private readonly newlyPressedActions: ReadonlySet<TAction>,
    private readonly releasedActions: ReadonlySet<TAction>,
    private readonly axisValues: ReadonlyMap<TAxis, number>,
    private readonly pointerPosition: Vec2,
    private readonly pointerDelta: Vec2,
    private readonly pressedMouseButtons: ReadonlySet<number>,
    private readonly newlyPressedMouseButtons: ReadonlySet<number>,
    private readonly releasedMouseButtons: ReadonlySet<number>,
  ) { }

  isPressed(action: TAction): boolean {
    return this.pressedActions.has(action);
  }

  wasPressed(action: TAction): boolean {
    return this.newlyPressedActions.has(action);
  }

  wasReleased(action: TAction): boolean {
    return this.releasedActions.has(action);
  }

  getAxis(name: TAxis): number {
    return this.axisValues.get(name) ?? 0;
  }

  getPointerPosition(): Vec2 {
    return this.pointerPosition.clone();
  }

  getPointerDelta(): Vec2 {
    return this.pointerDelta.clone();
  }

  isPointerDown(button: PointerButton = "Left"): boolean {
    return this.pressedMouseButtons.has(getMouseButton(button));
  }

  wasPointerPressed(button: PointerButton = "Left"): boolean {
    return this.newlyPressedMouseButtons.has(getMouseButton(button));
  }

  wasPointerReleased(button: PointerButton = "Left"): boolean {
    return this.releasedMouseButtons.has(getMouseButton(button));
  }
}

export class BrowserInputSource<
  TAction extends string = AppAction,
  TAxis extends string = AppAxis,
> implements InputSource<TAction, TAxis> {
  private readonly target: Window | HTMLElement | Document;
  private readonly actionBindings = new Map<TAction, InputActionBinding[]>();
  private readonly axisBindings = new Map<TAxis, InputAxisBinding[]>();
  private readonly pressedKeys = new Set<string>();
  private readonly previousPressedKeys = new Set<string>();
  private readonly pressedMouseButtons = new Set<number>();
  private readonly previousPressedMouseButtons = new Set<number>();
  private readonly wheelDelta = { x: 0, y: 0 };
  private readonly pointerPosition = new Vec2();
  private readonly pointerDelta = new Vec2();

  constructor(options: BrowserInputSourceOptions = {}) {
    this.target = options.target ?? window;

    this.target.addEventListener("keydown", this.handleKeyDown as EventListener);
    this.target.addEventListener("keyup", this.handleKeyUp as EventListener);
    this.target.addEventListener("mousedown", this.handleMouseDown as EventListener);
    this.target.addEventListener("mouseup", this.handleMouseUp as EventListener);
    this.target.addEventListener("mousemove", this.handleMouseMove as EventListener);
    this.target.addEventListener("wheel", this.handleWheel as EventListener, {
      passive: true,
    });
  }

  bindAction(name: TAction): BrowserActionBindingBuilder {
    const bindings = this.actionBindings.get(name) ?? [];
    this.actionBindings.set(name, bindings);
    return new BrowserActionBindingBuilder(bindings);
  }

  bindAxis(name: TAxis): BrowserAxisBindingBuilder {
    const bindings = this.axisBindings.get(name) ?? [];
    this.axisBindings.set(name, bindings);
    return new BrowserAxisBindingBuilder(bindings);
  }

  sample(): InputSnapshot<TAction, TAxis> {
    const pressedActions = new Set<TAction>();
    const newlyPressedActions = new Set<TAction>();
    const releasedActions = new Set<TAction>();
    const axisValues = new Map<TAxis, number>();
    const newlyPressedMouseButtons = new Set<number>();
    const releasedMouseButtons = new Set<number>();
    const previousMouseButtons = new Set(this.previousPressedMouseButtons);

    for (const [actionName, bindings] of this.actionBindings.entries()) {
      const isPressed = bindings.some((binding) => {
        if (binding.key) {
          return this.pressedKeys.has(binding.key);
        }

        if (binding.mouseButton !== undefined) {
          return this.pressedMouseButtons.has(binding.mouseButton);
        }

        return false;
      });

      const wasPressed = bindings.some((binding) => {
        if (binding.key) {
          return this.previousPressedKeys.has(binding.key);
        }

        if (binding.mouseButton !== undefined) {
          return this.previousPressedMouseButtons.has(binding.mouseButton);
        }

        return false;
      });

      if (isPressed) {
        pressedActions.add(actionName);
      }
      if (isPressed && !wasPressed) {
        newlyPressedActions.add(actionName);
      }
      if (!isPressed && wasPressed) {
        releasedActions.add(actionName);
      }
    }

    for (const [axisName, bindings] of this.axisBindings.entries()) {
      let value = 0;

      for (const binding of bindings) {
        if ("key" in binding) {
          if (this.pressedKeys.has(binding.key)) {
            value += binding.scale;
          }
          continue;
        }

        if ("wheel" in binding) {
          const wheelValue =
            binding.wheel === "x" ? this.wheelDelta.x : this.wheelDelta.y;
          value += wheelValue * (binding.scale ?? 1);
        }
      }

      axisValues.set(axisName, value);
    }

    const pointerPosition = this.pointerPosition.clone();
    const pointerDelta = this.pointerDelta.clone();

    this.wheelDelta.x = 0;
    this.wheelDelta.y = 0;
    this.pointerDelta.set(0, 0);
    this.previousPressedKeys.clear();
    this.previousPressedMouseButtons.clear();

    for (const key of this.pressedKeys) {
      this.previousPressedKeys.add(key);
    }

    for (const button of this.pressedMouseButtons) {
      if (!previousMouseButtons.has(button)) {
        newlyPressedMouseButtons.add(button);
      }
      this.previousPressedMouseButtons.add(button);
    }

    for (const button of previousMouseButtons) {
      if (!this.pressedMouseButtons.has(button)) {
        releasedMouseButtons.add(button);
      }
    }

    return new BrowserInputSnapshot<TAction, TAxis>(
      pressedActions,
      newlyPressedActions,
      releasedActions,
      axisValues,
      pointerPosition,
      pointerDelta,
      this.pressedMouseButtons,
      newlyPressedMouseButtons,
      releasedMouseButtons,
    );
  }

  destroy(): void {
    this.target.removeEventListener("keydown", this.handleKeyDown as EventListener);
    this.target.removeEventListener("keyup", this.handleKeyUp as EventListener);
    this.target.removeEventListener("mousedown", this.handleMouseDown as EventListener);
    this.target.removeEventListener("mouseup", this.handleMouseUp as EventListener);
    this.target.removeEventListener("mousemove", this.handleMouseMove as EventListener);
    this.target.removeEventListener("wheel", this.handleWheel as EventListener);
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    this.pressedKeys.add(event.code);
  };

  private handleKeyUp = (event: KeyboardEvent): void => {
    this.pressedKeys.delete(event.code);
  };

  private handleMouseDown = (event: MouseEvent): void => {
    this.pressedMouseButtons.add(event.button);
  };

  private handleMouseUp = (event: MouseEvent): void => {
    this.pressedMouseButtons.delete(event.button);
  };

  private handleMouseMove = (event: MouseEvent): void => {
    this.pointerPosition.set(event.clientX, event.clientY);
    this.pointerDelta.add(new Vec2(event.movementX, event.movementY));
  };

  private handleWheel = (event: WheelEvent): void => {
    this.wheelDelta.x += event.deltaX;
    this.wheelDelta.y += event.deltaY;
  };
}

export class BrowserActionBindingBuilder {
  constructor(private readonly bindings: InputActionBinding[]) {}

  key(code: string): this {
    this.bindings.push({ key: code });
    return this;
  }

  mouse(button: PointerButton): this {
    this.bindings.push({
      mouseButton: getMouseButton(button),
    });
    return this;
  }
}

export class BrowserAxisBindingBuilder {
  constructor(private readonly bindings: InputAxisBinding[]) {}

  key(code: string, scale: number): this {
    this.bindings.push({ key: code, scale });
    return this;
  }

  keys(
    negativeKey: string,
    negativeScale: number,
    positiveKey: string,
    positiveScale: number,
  ): this {
    return this.key(negativeKey, negativeScale).key(positiveKey, positiveScale);
  }

  wheelX(scale = 1): this {
    this.bindings.push({ wheel: "x", scale });
    return this;
  }

  wheelY(scale = 1): this {
    this.bindings.push({ wheel: "y", scale });
    return this;
  }
}
