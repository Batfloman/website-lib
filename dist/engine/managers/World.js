export class World {
    constructor() {
        this.objects = new Set();
    }
    addObject(obj) {
        this.objects.add(obj);
    }
    update(dt) {
        for (const obj of this.objects)
            obj.update(dt);
    }
    render(renderer) {
        for (const obj of this.objects)
            obj.render(renderer);
    }
}
