import { GameObject } from "../entities/GameObject";
export declare class World {
    private objects;
    addObject(obj: GameObject): void;
    update(dt: number): void;
    render(renderer: Renderer): void;
}
