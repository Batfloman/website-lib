import { Vector2 } from "../../util/Vector2";
import { Util } from "../../util/Util";
import { Color } from "../../util/Color";
import { TwoKeyMap } from "../../util/TwoKeyMap";
import { Chunk } from "./Chunk";
import { WorldObject } from "../objects/WorldObject";
export class World {
    constructor(pos = new Vector2(), backgroundColor = Color.get("white")) {
        this.objects = [];
        this.objectMap = new Map();
        this.chunkSize = 100;
        this.chunks = new TwoKeyMap();
        this.pos = pos;
        this.backgroundColor = backgroundColor;
    }
    clicked(worldPos) {
        const chunkPos = this.findChunkOfPos(worldPos);
        const chunk = this.getChunk(chunkPos.x, chunkPos.y);
        if (!chunk)
            return;
        for (let obj of chunk.objects) {
            obj.notifyOfClick(worldPos);
        }
    }
    init(game) {
        this.game = game;
    }
    isInsideWorld(point) {
        return true;
    }
    shouldRender() {
        return true;
    }
    render(renderer) {
        renderer.setStrokeColor(this.backgroundColor);
        renderer.setFillColor(this.backgroundColor);
        renderer.renderStaticRectangle("center", "100%", "100%");
    }
    setBackground(color) {
        this.backgroundColor = color;
    }
    addObject(obj) {
        if (this.objects.includes(obj))
            return;
        this.objects.push(obj);
        this.addToMap(obj);
        if (obj instanceof WorldObject) {
            this.addToChunks(obj);
            obj.setWorld(this);
        }
    }
    removeObject(obj) {
        const removed = Util.array.removeItem(this.objects, obj);
        this.removeFromMap(obj);
        if (obj instanceof WorldObject) {
            const chunk = obj.getChunk();
            chunk.removeObject(obj);
        }
        return removed;
    }
    findObjects(clas, exclude) {
        const clasName = clas instanceof Function ? clas.name : clas;
        const objects = this.objectMap.get(clasName);
        if (!objects)
            return [];
        const values = Util.array.copyOf(objects);
        if (exclude instanceof Object && (values === null || values === void 0 ? void 0 : values.includes(exclude))) {
            Util.array.removeItem(values, exclude);
        }
        else if (exclude instanceof Array) {
            for (let ex of exclude) {
                Util.array.removeItem(values, ex);
            }
        }
        return values;
    }
    findObjectsInNeighbouringChunks(chunk, clas, exclude, distance = 1, rectStyle = true) {
        const neighbours = this.findNeighbourChunksOf(chunk, distance, rectStyle);
        let found = [];
        for (let chunk of neighbours) {
            found = found.concat(chunk.findObjects(clas, exclude));
        }
        return found;
    }
    addToMap(obj) {
        const classes = Util.object.findAllClassNames(obj);
        for (let clasz of classes) {
            const previousValues = this.objectMap.get(clasz);
            let values = !previousValues ? [] : previousValues;
            values.push(obj);
            this.objectMap.set(clasz, values);
        }
    }
    removeFromMap(obj) {
        const classes = Util.object.findAllClassNames(obj);
        for (let clasz of classes) {
            const values = this.objectMap.get(clasz);
            if (!values)
                continue;
            Util.array.removeItem(values, obj);
            if (Util.array.isEmpty(values))
                this.objectMap.delete(clasz);
        }
    }
    putObjectsInCunks() {
        const worldObjects = this.findObjects(WorldObject);
        for (let obj of worldObjects) {
            if (!obj.recentlyMoved)
                continue;
            this.removeFromChunks(obj);
            this.addToChunks(obj);
        }
    }
    addToChunks(obj) {
        const chunk = this.findChunkOf(obj);
        this.addToChunk(chunk.x, chunk.y, obj);
    }
    removeFromChunks(obj) {
        const chunk = obj.getChunk();
        chunk.removeObject(obj);
        if (!chunk.objects || Util.array.isEmpty(chunk.objects)) {
            this.chunks.delete(chunk.keys.x, chunk.keys.y);
        }
    }
    addToChunk(x, y, obj) {
        let content = this.chunks.get(x, y);
        if (!(content instanceof Chunk)) {
            content = new Chunk(x, y, obj);
            this.chunks.set(x, y, content);
        }
        content.addObject(obj);
        obj.setChunk(content);
    }
    findChunkOf(obj) {
        return this.findChunkOfPos(obj.pos);
    }
    findChunkOfPos(pos) {
        return new Vector2(Math.floor(pos.x / this.chunkSize), Math.floor(pos.y / this.chunkSize));
    }
    findNeighbourChunksOf(chunk, distance = 1, rectangleStlye = true) {
        if (!rectangleStlye) {
            console.warn("Circle Style not implemented!");
            return [];
        }
        const found = [];
        for (let x = -distance + chunk.keys.x; x <= distance + chunk.keys.x; x++) {
            for (let y = -distance + chunk.keys.y; y <= distance + chunk.keys.y; y++) {
                const chunk = this.chunks.get(x, y);
                if (!chunk)
                    continue;
                found.push(chunk);
            }
        }
        return found;
    }
    getChunk(x, y) {
        return this.chunks.get(x, y);
    }
    setChunkSize(size) {
        this.chunkSize = size;
    }
}
