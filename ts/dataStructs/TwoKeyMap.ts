export class TwoKeyMap<K, K2, V> {
  private map: Map<K, Map<K2, V>>;

  constructor() {
    this.map = new Map<K, Map<K2, V>>();
  }

  get(key: K, key2: K2): V | undefined {
    const firstMapContent = this.map.get(key);
    const nestedMapContent = firstMapContent?.get(key2);
    if (!firstMapContent || !nestedMapContent) return;

    return nestedMapContent;
  }

  set(key: K, key2: K2, value: V): void {
    const nestedMap = this.map.get(key);
    if (!nestedMap) this.map.set(key, new Map([[key2, value]]));
    else nestedMap.set(key2, value);
  }

  clear(): void {
    this.map.clear();
  }

  delete(key: K, key2: K2) {
    const nestedMap = this.map.get(key);
    if (!nestedMap) return;
    else nestedMap.delete(key2);
  }
}
