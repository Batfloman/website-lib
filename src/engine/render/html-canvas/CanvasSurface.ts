export class CanvasSurface {
  readonly element: HTMLCanvasElement;
  width = 0;
  height = 0;
  pixelRatio = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.element = canvas;
    this.syncSize();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.syncSize);
    }
  }

  syncSize = (): void => {
    const rect = this.element.getBoundingClientRect();
    const pixelRatio = typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;

    this.width = rect.width;
    this.height = rect.height;
    this.pixelRatio = pixelRatio;

    this.element.width = Math.max(1, Math.round(rect.width * pixelRatio));
    this.element.height = Math.max(1, Math.round(rect.height * pixelRatio));
  };
}
