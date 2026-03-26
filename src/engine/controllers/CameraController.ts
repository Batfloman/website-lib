import { APP_ACTIONS, APP_AXES, type AppAction, type AppAxis } from "../input";
import type { Camera } from "../render";
import type { Controller, ControllerContext } from "./Controller";

export const CAMERA_AXES = {
  horizontal: APP_AXES.cameraHorizontal,
  vertical: APP_AXES.cameraVertical,
  zoom: APP_AXES.cameraZoom,
} as const satisfies Record<string, AppAxis>;

export const CAMERA_ACTIONS = {
  drag: APP_ACTIONS.cameraDrag,
  zoomIn: APP_ACTIONS.cameraZoomIn,
  zoomOut: APP_ACTIONS.cameraZoomOut,
} as const satisfies Record<string, AppAction>;

export type CameraAxisName = (typeof CAMERA_AXES)[keyof typeof CAMERA_AXES];
export type CameraActionName = (typeof CAMERA_ACTIONS)[keyof typeof CAMERA_ACTIONS];

export interface CameraControllerOptions<
  TAction extends string = CameraActionName,
  TAxis extends string = CameraAxisName,
> {
  moveSpeed?: number;
  zoomSpeed?: number;
  dragSpeed?: number;
  horizontalAxis?: TAxis;
  verticalAxis?: TAxis;
  zoomAxis?: TAxis;
  dragAction?: TAction;
  zoomInAction?: TAction;
  zoomOutAction?: TAction;
}

export class CameraController<
  TAction extends string = AppAction,
  TAxis extends string = AppAxis,
> implements Controller<TAction, TAxis> {
  readonly moveSpeed: number;
  readonly zoomSpeed: number;
  readonly dragSpeed: number;
  readonly horizontalAxis: TAxis;
  readonly verticalAxis: TAxis;
  readonly zoomAxis?: TAxis;
  readonly dragAction: TAction;
  readonly zoomInAction: TAction;
  readonly zoomOutAction: TAction;

  constructor(
    private readonly camera: Camera,
    options: CameraControllerOptions<TAction, TAxis> = {},
  ) {
    this.moveSpeed = options.moveSpeed ?? 500;
    this.zoomSpeed = options.zoomSpeed ?? 1;
    this.dragSpeed = options.dragSpeed ?? 1;
    this.horizontalAxis = (options.horizontalAxis ?? CAMERA_AXES.horizontal) as TAxis;
    this.verticalAxis = (options.verticalAxis ?? CAMERA_AXES.vertical) as TAxis;
    this.zoomAxis = options.zoomAxis ?? (CAMERA_AXES.zoom as TAxis);
    this.dragAction = (options.dragAction ?? CAMERA_ACTIONS.drag) as TAction;
    this.zoomInAction = (options.zoomInAction ?? CAMERA_ACTIONS.zoomIn) as TAction;
    this.zoomOutAction = (options.zoomOutAction ?? CAMERA_ACTIONS.zoomOut) as TAction;
  }

  update(context: ControllerContext<TAction, TAxis>): void {
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

    if (context.input.isPressed(this.dragAction)) {
      const pointerDelta = context.input.getPointerDelta();
      if (pointerDelta.x !== 0 || pointerDelta.y !== 0) {
        this.camera.translate(
          (-pointerDelta.x * this.dragSpeed) / this.camera.zoom,
          (-pointerDelta.y * this.dragSpeed) / this.camera.zoom,
        );
      }
    }

    let zoomDirection = this.zoomAxis
      ? context.input.getAxis(this.zoomAxis)
      : 0;

    if (zoomDirection === 0) {
      if (context.input.isPressed(this.zoomInAction)) {
        zoomDirection += 1;
      }
      if (context.input.isPressed(this.zoomOutAction)) {
        zoomDirection -= 1;
      }
    }

    if (zoomDirection !== 0) {
      const nextZoom = this.camera.zoom + zoomDirection * this.zoomSpeed * context.dt;
      this.camera.zoom = Math.max(0.01, nextZoom);
    }
  }
}
