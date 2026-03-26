export const APP_ACTIONS = {
  cameraDrag: "camera-drag",
  cameraZoomIn: "camera-zoom-in",
  cameraZoomOut: "camera-zoom-out",
} as const;

export const APP_AXES = {
  cameraHorizontal: "camera-horizontal",
  cameraVertical: "camera-vertical",
  cameraZoom: "camera-zoom",
} as const;

export type AppAction = (typeof APP_ACTIONS)[keyof typeof APP_ACTIONS];
export type AppAxis = (typeof APP_AXES)[keyof typeof APP_AXES];
