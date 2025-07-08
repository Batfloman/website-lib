import { ICollideable } from "../property/ICollideable";
export declare class Triangulation {
    static triangulate(obj: ICollideable): ICollideable[];
    private static isPointInTriangle;
}
