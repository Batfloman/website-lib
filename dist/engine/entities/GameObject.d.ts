import { Renderer } from "../display/Renderer";
export declare abstract class GameObject {
    update(deltaTime: number): void;
    render(renderer: Renderer): void;
}
