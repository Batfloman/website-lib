declare class Matrix2<T> {
    private cells;
    private xSize;
    private ySize;
    constructor(x: number, y: number);
    isCellEmpty(x: number, y: number): boolean;
    clearCell(x: number, y: number): void;
    get(x: number, y: number): T | string;
    set(x: number, y: number, content: string | T): void;
    getSizeX(): number;
    getSizeY(): number;
}

declare class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    add(vec2: Vector2): Vector2;
    subtract(vec2: Vector2): Vector2;
    scale(scalar: number): Vector2;
    dotProduct(vec2: Vector2): number;
    crossProduct(vec2: Vector2): number;
    vectorTo(point: Vector2): Vector2;
    getNormal(): Vector2;
    getMagnitude(): number;
    angle(vec2: Vector2): number;
}

export { Matrix2, Vector2 };
