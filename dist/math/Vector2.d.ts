export declare class Vector2 {
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
