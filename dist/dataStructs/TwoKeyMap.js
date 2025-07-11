export class TwoKeyMap {
    constructor() {
        this.map = new Map();
    }
    get(key, key2) {
        const firstMapContent = this.map.get(key);
        const nestedMapContent = firstMapContent === null || firstMapContent === void 0 ? void 0 : firstMapContent.get(key2);
        if (!firstMapContent || !nestedMapContent)
            return;
        return nestedMapContent;
    }
    set(key, key2, value) {
        const nestedMap = this.map.get(key);
        if (!nestedMap)
            this.map.set(key, new Map([[key2, value]]));
        else
            nestedMap.set(key2, value);
    }
    clear() {
        this.map.clear();
    }
    delete(key, key2) {
        const nestedMap = this.map.get(key);
        if (!nestedMap)
            return;
        else
            nestedMap.delete(key2);
    }
}
