export declare class TwoKeyMap<K, K2, V> {
    private map;
    constructor();
    get(key: K, key2: K2): V | undefined;
    set(key: K, key2: K2, value: V): void;
    clear(): void;
    delete(key: K, key2: K2): void;
}
