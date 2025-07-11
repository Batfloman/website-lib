export declare class Matrix2<T> {
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
