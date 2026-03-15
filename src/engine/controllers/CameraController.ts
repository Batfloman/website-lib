import type { Camera } from "../render";
import type { Controller, ControllerContext } from "./Controller";

export interface CameraControllerOptions {
  moveSpeed?: number;
  zoomSpeed?: number;
  horizontalAxis?: string;
  verticalAxis?: string;
  zoomInAction?: string;
  zoomOutAction?: string;
}

export class CameraController implements Controller {
  readonly moveSpeed: number;
  readonly zoomSpeed: number;
  readonly horizontalAxis: string;
  readonly verticalAxis: string;
  readonly zoomInAction: string;
  readonly zoomOutAction: string;

  constructor(
    private readonly camera: Camera,
    options: CameraControllerOptions = {},
  ) {
    this.moveSpeed = options.moveSpeed ?? 500;
    this.zoomSpeed = options.zoomSpeed ?? 1;
    this.horizontalAxis = options.horizontalAxis ?? "camera-horizontal";
    this.verticalAxis = options.verticalAxis ?? "camera-vertical";
    this.zoomInAction = options.zoomInAction ?? "camera-zoom-in";
    this.zoomOutAction = options.zoomOutAction ?? "camera-zoom-out";
  }

  update(context: ControllerContext): void {
    if (!context.input) {
      return;
    }

    const moveX = context.input.getAxis(this.horizontalAxis);
    const moveY = context.input.getAxis(this.verticalAxis);
    if (moveX !== 0 || moveY !== 0) {
      this.camera.translate(
        moveX * this.moveSpeed * context.dt,
        moveY * this.moveSpeed * context.dt,
      );
    }

    let zoomDirection = 0;
    if (context.input.isPressed(this.zoomInAction)) {
      zoomDirection += 1;
    }
    if (context.input.isPressed(this.zoomOutAction)) {
      zoomDirection -= 1;
    }

    if (zoomDirection !== 0) {
      const nextZoom = this.camera.zoom + zoomDirection * this.zoomSpeed * context.dt;
      this.camera.zoom = Math.max(0.01, nextZoom);
    }
  }
}
