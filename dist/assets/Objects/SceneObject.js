export class SceneObject {
    constructor() {
        this.zIndex = 0;
    }
    init(game, canvas) {
        this.game = game;
        this.camara = game.getCamara();
        this.canvas = canvas;
    }
    calc_valueChangeForDT(perSecond, dt) {
        let value = (perSecond * dt) / 1000;
        return Number.isNaN(value) ? 0 : value;
    }
}
