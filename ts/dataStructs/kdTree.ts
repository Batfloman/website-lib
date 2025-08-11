export interface KDNode<T> {
  item: T;
  axis: number;
  left: KDNode<T> | null;
  right: KDNode<T> | null;
}

export interface KDTreeOptions<T> {
  getPoint: (item: T) => number[];
  distance?: (a: number[], b: number[]) => number;
}

export class KDTree<T> {
  private root: KDNode<T> | null = null;
  private dim: number;
  private getPoint: (item: T) => number[];
  private distance: (a: number[], b: number[]) => number;

  // for rebuilding
  private items: T[];
  private modificationsSinceRebuild = 0;

  constructor(options: KDTreeOptions<T>, items: T[]) {
    this.getPoint = options.getPoint;
    this.distance = options.distance ?? KDTree.euclidean;
    this.dim = items.length > 0 ? this.getPoint(items[0]).length : 0;

    this.items = [...items];
    this.root = this.build(items, 0);
  }

  public insert(item: T): void {
    this.root = this.insertRec(this.root, item, 0);

    // rebuilding
    this.items.push(item);
    this.modificationsSinceRebuild++;
    if (this.shouldRebuild()) this.rebuild();
  }

  public remove(item: T): void {
    this.root = this.removeRec(this.root, item, 0);

    // rebuilding
    // Remove from array (using getPoint to find exact match)
    const idx = this.items.findIndex(x =>
      this.getPoint(x).every((v, i) => v === this.getPoint(item)[i])
    );
    if (idx !== -1) this.items.splice(idx, 1);

    this.modificationsSinceRebuild++;
    if (this.shouldRebuild()) this.rebuild();
  }

  public clear(): void {
    this.root = null;
    this.items = [];
    this.modificationsSinceRebuild = 0;
  }

  public nearest(query: number[], k = 1): { item: T; dist: number }[] {
    const best: { item: T; dist: number }[] = [];

    const search = (node: KDNode<T> | null) => {
      if (!node) return;

      const point = this.getPoint(node.item);
      const dist = this.distance(query, point);

      // Add to best list if better than worst
      if (best.length < k) {
        best.push({ item: node.item, dist });
        best.sort((a, b) => a.dist - b.dist);
      } else if (dist < best[best.length - 1].dist) {
        best[best.length - 1] = { item: node.item, dist };
        best.sort((a, b) => a.dist - b.dist);
      }

      const axis = node.axis;
      const diff = query[axis] - point[axis];

      // Pick side to explore first
      const first = diff < 0 ? node.left : node.right;
      const second = diff < 0 ? node.right : node.left;

      search(first);

      // Check if the other side could have closer points
      if (best.length < k || Math.abs(diff) < best[best.length - 1].dist) {
        search(second);
      }
    };

    search(this.root);
    return best;
  }

  public range(query: number[], radius: number): T[] {
    const results: T[] = [];

    const search = (node: KDNode<T> | null) => {
      if (!node) return;

      const point = this.getPoint(node.item);
      const dist = this.distance(query, point);

      if (dist <= radius) {
        results.push(node.item);
      }

      const axis = node.axis;
      const diff = query[axis] - point[axis];

      if (diff <= radius) search(node.left);
      if (diff >= -radius) search(node.right);
    };

    search(this.root);
    return results;
  }

  public queryRange(min: number[], max: number[]): T[] {
    const results: T[] = [];

    const search = (node: KDNode<T> | null) => {
      if (!node) return;

      const point = this.getPoint(node.item);
      let inside = true;
      for (let i = 0; i < this.dim; i++) {
        if (point[i] < min[i] || point[i] > max[i]) {
          inside = false;
          break;
        }
      }
      if (inside) {
        results.push(node.item);
      }

      // Check subtrees
      const axis = node.axis;
      if (min[axis] <= point[axis]) {
        search(node.left);
      }
      if (max[axis] >= point[axis]) {
        search(node.right);
      }
    };

    search(this.root);
    return results;
  }

  // -------------------- rebuilding --------------------
  // since balancing a kdtree is hard we periodically rebuild

  private shouldRebuild(): boolean {
    return this.modificationsSinceRebuild > this.items.length / 2;
  }

  private rebuild(): void {
    this.root = this.build(this.items, 0);
    this.modificationsSinceRebuild = 0;
  }

  // -------------------- helper --------------------

  private insertRec(node: KDNode<T> | null, item: T, depth: number = 0): KDNode<T> {
    if (!node) {
      return { item, axis: depth % this.dim, left: null, right: null };
    }

    const axis = node.axis;
    const point = this.getPoint(item);
    const nodePoint = this.getPoint(node.item);

    if (point[axis] < nodePoint[axis]) {
      node.left = this.insertRec(node.left, item, depth + 1);
    } else {
      node.right = this.insertRec(node.right, item, depth + 1);
    }
    return node;
  }

  private removeRec(node: KDNode<T> | null, item: T, depth: number = 0): KDNode<T> | null {
    if (!node) return null;

    const axis = node.axis;
    const point = this.getPoint(item);
    const nodePoint = this.getPoint(node.item);

    const isSamePoint = point.every((v, i) => v === nodePoint[i]);

    if (isSamePoint) {
      // If right subtree exists, replace with min in right subtree along this axis
      if (node.right) {
        const minNode = this.findMin(node.right, axis, depth + 1);
        node.item = minNode.item;
        node.right = this.removeRec(node.right, minNode.item, depth + 1);
      } else if (node.left) {
        const maxNode = this.findMax(node.left, axis, depth + 1);
        node.item = maxNode.item;
        node.right = this.removeRec(node.left, maxNode.item, depth + 1);
      } else {
        return null; // leaf
      }
    } else if (point[axis] < nodePoint[axis]) {
      node.left = this.removeRec(node.left, item, depth + 1);
    } else {
      node.right = this.removeRec(node.right, item, depth + 1);
    }
    return node;
  }

  private findMin(node: KDNode<T>, searchAxis: number, depth: number): KDNode<T> {
    if (!node) throw new Error("Empty subtree");

    const axis = node.axis;
    if (axis === searchAxis) {
      return node.left ? this.findMin(node.left, searchAxis, depth + 1) : node;
    }

    const leftMin = node.left ? this.findMin(node.left, searchAxis, depth + 1) : node;
    const rightMin = node.right ? this.findMin(node.right, searchAxis, depth + 1) : node;
    const minNode = [node, leftMin, rightMin].reduce((best, cur) =>
      this.getPoint(cur.item)[searchAxis] < this.getPoint(best.item)[searchAxis]
        ? cur
        : best
    );
    return minNode;
  }

  private findMax(node: KDNode<T>, searchAxis: number, depth: number): KDNode<T> {
    if (!node) throw new Error("Empty subtree");

    const axis = node.axis;
    if (axis === searchAxis) {
      return node.left ? this.findMax(node.left, searchAxis, depth + 1) : node;
    }

    const leftMax = node.left ? this.findMax(node.left, searchAxis, depth + 1) : node;
    const rightMax = node.right ? this.findMax(node.right, searchAxis, depth + 1) : node;
    const maxNode = [node, leftMax, rightMax].reduce((best, cur) =>
      this.getPoint(cur.item)[searchAxis] > this.getPoint(best.item)[searchAxis]
        ? cur
        : best
    );
    return maxNode;
  }

  private build(items: T[], depth: number): KDNode<T> | null {
    if (items.length === 0) return null;

    const axis = depth % this.dim;
    const sorted = [...items].sort(
      (a, b) => this.getPoint(a)[axis] - this.getPoint(b)[axis]
    );
    const mid = Math.floor(sorted.length / 2);

    return {
      item: sorted[mid],
      axis,
      left: this.build(sorted.slice(0, mid), depth + 1),
      right: this.build(sorted.slice(mid + 1), depth + 1)
    };
  }

  private static euclidean(a: number[], b: number[]): number {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      const d = a[i] - b[i];
      sum += d * d;
    }
    return Math.sqrt(sum);
  }
}
