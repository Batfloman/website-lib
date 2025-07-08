var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Camara } from "../display/Camara";
import { Renderer } from "../display/Renderer";
import { Input } from "../input/Input";
import { World } from "../assets/worlds/World";
import { Util } from "../util/Util";
import { Vector2 } from "../util/Vector2";
const maxDTPerTick = 75;
export class Game {
    constructor(canvas) {
        this.isStopped = true;
        this.stoppedBecauseBlur = false;
        this.timeElapsedBeforeStop = 0;
        this.worlds = new Map();
        this.lastTickTime = Date.now();
        this.canvas = canvas;
        this.camara = new Camara(this.canvas);
        this.renderer = new Renderer(this.canvas, this.camara);
        this.setWorld("main", new World());
        Input.newEventListener("blur", this, () => {
            if (!this.isStopped) {
                this.stop();
                this.stoppedBecauseBlur = true;
            }
        });
        Input.newEventListener("focus", this, () => {
            if (this.stoppedBecauseBlur)
                this.start();
        });
        Input.newEventListener("resize", this, this.renderObjects);
        Input.newEventListener("mouseup", this, this.registerClick);
        Input.newEventListener("touchcancel", this, this.registerClick);
        Input.newEventListener("touchend", this, this.registerClick);
        Game.gameLoop(this);
    }
    registerClick(event) {
        const canvasClicked = Array.from(event.composedPath()).includes(this.canvas.htmlCanvas);
        if (!canvasClicked)
            return;
        const clickPos = event instanceof TouchEvent
            ? Game.getRelativeTouchPos(event)
            : new Vector2(event.offsetX, event.offsetY);
        const worldPos = Util.position.staticPos_to_worldPos(clickPos, this.camara);
        for (let world of Array.from(this.worlds.values())) {
            if (!world.isInsideWorld(worldPos))
                continue;
            world.clicked(worldPos);
        }
    }
    static getRelativeTouchPos(event) {
        const touch = event.touches[0] || event.changedTouches[0];
        const clientPos = new Vector2(touch.clientX, touch.clientY);
        const target = touch.target;
        const targetOffset = new Vector2(touch.target.offsetLeft, touch.target.offsetTop);
        const topLeft = targetOffset.subtract(new Vector2(touch.target.width / 2, touch.target.height / 2));
        return clientPos.subtract(topLeft);
    }
    static gameLoop(game) {
        game.tick();
        window.requestAnimationFrame(() => {
            Game.gameLoop(game);
        });
    }
    tick() {
        this.updateObjects();
        this.renderObjects();
    }
    updateObjects() {
        return __awaiter(this, void 0, void 0, function* () {
            let dt = this.calc_dt();
            this.lastTickTime = Date.now();
            if (this.isStopped)
                dt = 0;
            if (dt > maxDTPerTick)
                dt = maxDTPerTick;
            const worlds = Array.from(this.worlds.values());
            for (let world of Util.array.copyOf(worlds)) {
                world.putObjectsInCunks();
                for (let obj of world.objects) {
                    if (obj.shouldUpdate())
                        obj.update(dt);
                }
            }
        });
    }
    renderObjects() {
        return __awaiter(this, void 0, void 0, function* () {
            this.renderer.clear();
            const worlds = Array.from(this.worlds.values());
            for (let world of worlds) {
                world.objects.sort((a, b) => (a.zIndex <= b.zIndex ? -1 : 1));
                world.render(this.renderer);
            }
            for (let world of worlds) {
                for (let obj of world.objects) {
                    if (obj.shouldRender())
                        obj.render(this.renderer);
                }
            }
        });
    }
    addObject(obj, worldName = "main") {
        const world = this.worlds.get(worldName);
        if (!world)
            throw new Error(`${worldName} is no World!`);
        world.addObject(obj);
        obj.init(this, this.canvas);
    }
    removeObject(obj, worldName = "main") {
        const world = this.worlds.get(worldName);
        if (!world)
            throw new Error(`${worldName} is no World`);
        return world.removeObject(obj);
    }
    findObjects(clas, exclude) {
        let found = [];
        const worlds = Array.from(this.worlds.values());
        for (let world of worlds) {
            found = found.concat(world.findObjects(clas.name, exclude));
        }
        return Util.array.copyOf(found);
    }
    setWorld(name, world) {
        this.worlds.set(name, world);
        world.init(this);
    }
    getWorld(name = "main") {
        return this.worlds.get(name);
    }
    setWorldBackground(color, name = "main") {
        const map = this.worlds.get(name);
        if (map)
            map.setBackground(color);
    }
    setWorldChunkSize(size, name = "main") {
        const map = this.worlds.get(name);
        if (map)
            map.setChunkSize(size);
    }
    calc_dt() {
        return Date.now() - this.lastTickTime;
    }
    start() {
        if (!this.isStopped)
            return;
        this.lastTickTime = Date.now() - this.timeElapsedBeforeStop;
        this.isStopped = false;
    }
    stop() {
        if (this.isStopped)
            return;
        this.timeElapsedBeforeStop = Date.now() - this.lastTickTime;
        this.isStopped = true;
    }
    getCamara() {
        return this.camara;
    }
    getRenderer() {
        return this.renderer;
    }
    getCanvas() {
        return this.canvas;
    }
    setCamaraScaleLock(b) {
        this.camara.setLockScaling(b);
    }
    setCamaraMovementLock(b) {
        this.camara.setLockMovement(b);
    }
}
