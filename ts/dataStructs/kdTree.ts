// Hilfstyp: Tupel der Länge L mit Typ T
type TupleOfLength<L extends number, T, R extends unknown[] = []> =
  R['length'] extends L ? R : TupleOfLength<L, T, [T, ...R]>;

export class KDTree<
  D extends number,
  T,
  Point extends readonly number[] = TupleOfLength<D, number>
> {
  constructor(protected getPoint: (item: T) => Point, ...items: T[]) {
    this.build(items);
  }

  protected build(items: T[]) {
    // Baum bauen
  }

  protected rebalance() {
    // Balancieren
  }

  public addObject(item: T) {
    // Hinzufügen
  }

  public removeObject(item: T) {
    // Entfernen
  }
}

interface KDNode<T, Point extends readonly number[]> {
  item: T;
  axis: number;
  left: KDNode<T, Point> | null;
  right: KDNode<T, Point> | null;
}
