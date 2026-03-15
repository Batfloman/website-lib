import type { InputSnapshot, InputSource } from "../InputSource";

export interface InputActionBinding {
  key: string;
}

export interface InputAxisKeyBinding {
  key: string;
  scale: number;
}

export interface InputAxisWheelBinding {
  wheel: "x" | "y";
  scale?: number;
}

export interface BrowserInputBindings {
  actions?: Record<string, readonly InputActionBinding[]>;
  axes?: Record<string, readonly (InputAxisKeyBinding | InputAxisWheelBinding)[]>;
}

export interface BrowserInputSourceOptions {
  target?: Window | HTMLElement | Document;
  bindings?: BrowserInputBindings;
}

class BrowserInputSnapshot implements InputSnapshot {
  constructor(
    private readonly pressedActions: ReadonlySet<string>,
    private readonly axisValues: ReadonlyMap<string, number>,
  ) { }

  isPressed(action: string): boolean {
    return this.pressedActions.has(action);
  }

  getAxis(name: string): number {
    return this.axisValues.get(name) ?? 0;
  }
}

export class BrowserInputSource implements InputSource {
  private readonly target: Window | HTMLElement | Document;
  private readonly actionBindings: Map<string, readonly InputActionBinding[]>;
  private readonly axisBindings: Map<
    string,
    readonly (InputAxisKeyBinding | InputAxisWheelBinding)[]
  >;
  private readonly pressedKeys = new Set<string>();
  private readonly wheelDelta = { x: 0, y: 0 };

  constructor(options: BrowserInputSourceOptions = {}) {
    this.target = options.target ?? window;
    this.actionBindings = new Map(Object.entries(options.bindings?.actions ?? {}));
    this.axisBindings = new Map(Object.entries(options.bindings?.axes ?? {}));

    this.target.addEventListener("keydown", this.handleKeyDown as EventListener);
    this.target.addEventListener("keyup", this.handleKeyUp as EventListener);
    this.target.addEventListener("wheel", this.handleWheel as EventListener, {
      passive: true,
    });
  }

  sample(): InputSnapshot {
    const pressedActions = new Set<string>();
    const axisValues = new Map<string, number>();

    for (const [actionName, bindings] of this.actionBindings.entries()) {
      if (bindings.some((binding) => this.pressedKeys.has(binding.key))) {
        pressedActions.add(actionName);
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

        const wheelValue =
          binding.wheel === "x" ? this.wheelDelta.x : this.wheelDelta.y;
        value += wheelValue * (binding.scale ?? 1);
      }

      axisValues.set(axisName, value);
    }

    this.wheelDelta.x = 0;
    this.wheelDelta.y = 0;

    return new BrowserInputSnapshot(pressedActions, axisValues);
  }

  destroy(): void {
    this.target.removeEventListener("keydown", this.handleKeyDown as EventListener);
    this.target.removeEventListener("keyup", this.handleKeyUp as EventListener);
    this.target.removeEventListener("wheel", this.handleWheel as EventListener);
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    this.pressedKeys.add(event.code);
  };

  private handleKeyUp = (event: KeyboardEvent): void => {
    this.pressedKeys.delete(event.code);
  };

  private handleWheel = (event: WheelEvent): void => {
    this.wheelDelta.x += event.deltaX;
    this.wheelDelta.y += event.deltaY;
  };
}
