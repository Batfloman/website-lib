import { GameObject } from "../entities/GameObject";
export declare class Scene {
    private objects;
    readonly camera: Camera;
    addObject(obj: GameObject): void;
    update(dt: number): void;
    render(renderer: Renderer): void;
}
