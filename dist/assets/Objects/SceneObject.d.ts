import { Camara } from "../../display/Camara";
import { Canvas } from "../../display/Canvas";
import { IRenderable } from "../../display/IRenderable";
import { Renderer } from "../../display/Renderer";
import { Game } from "../../games/Game";
export declare abstract class SceneObject implements IRenderable {
    game: Game;
    canvas: Canvas;
    camara: Camara;
    zIndex: number;
    init(game: Game, canvas: Canvas): void;
    abstract update(dt: number): void;
    abstract render(renderer: Renderer): void;
    abstract shouldUpdate(): boolean;
    abstract shouldRender(): boolean;
    calc_valueChangeForDT(perSecond: number, dt: number): number;
}
