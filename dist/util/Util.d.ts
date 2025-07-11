import { Camara } from "../display/Camara";
import { Polygon2 } from "../physic/boundingBox/Polygon2";
import { Vector2 } from "../math/Vector2";
export type staticPosition = "center";
export declare const Util: {
    array: {
        getItem<T>(arr: T[], index: number): T;
        getLastItem<T>(arr: T[]): T;
        getRandomItem<T>(arr: T[]): T;
        removeItemAtIndex<T>(arr: T[], index: number): T;
        removeItem<T>(arr: T[], item: T): T | undefined;
        sum(arr: number[]): number;
        isEmpty<T>(arr: T[]): boolean;
        copyOf<T>(arr: T[]): T[];
        connectArrays<T>(arrays: T[]): T[];
    };
    map: {
        copyOf<K, V>(map: Map<K, V>): Map<K, V>;
    };
    math: {
        random: {
            between(start: number, end: number, num_decimals?: number): number;
            mathSign(): number;
        };
        convert: {
            DegToRad(degree: number): number;
            RadToDeg(rad: number): number;
            percent(percent: number | string, value?: number): number;
        };
        trigonomitry: {
            cos(degree: number): number;
            arccos(num: number): number;
        };
        round(number: number, num_decimals?: number): number;
        floor(number: number, num_decimals?: number): number;
        ceil(number: number, num_decimals?: number): number;
    };
    shapes: {
        circle: {
            area(radius: number): number;
            radius(volume: number): number;
        };
        polygon: {
            area(polygon: Polygon2): number;
        };
    };
    object: {
        findClassName(clas: Object | Function): string;
        findSuperClassName(clas: Object | Function): string;
        findClass(clas: Object | Function): Function;
        findSuperClass(clas: Object | Function): Function;
        findAllClassNames(clas: Object | Function): string[];
        findAllClasses(clas: Object | Function): Function[];
        findAllSuperClassNames(clas: Object | Function): string[];
        findAllSuperClasses(clas: Object | Function): Function[];
    };
    position: {
        worldPos_to_staticPos(worldPos: Vector2, camara: Camara): Vector2;
        staticPos_to_worldPos(staticPos: Vector2, camara: Camara): Vector2;
        convertStaticPosInValue(pos: staticPosition, camara: Camara): Vector2;
        convertPercentInValue(canvas: Canvas, widthPercent: string, heightPercent: string): Vector2;
        convertWidthPercentInValue(canvas: Canvas, percent: string): number;
        convertHeightPercentInValue(canvas: Canvas, percent: string): number;
    };
    toVector(angle: number, lenght: number): Vector2;
    findAngleLine(startPoint: Vector2, endPoint: Vector2): number;
    calcHypothenuse(side1: number, side2: number): number;
    distance(point1: Vector2, point2: Vector2): number;
    closestPoint(mainPoint: Vector2, points: Vector2[], exclude?: Vector2 | Vector2[]): Vector2;
    farthestPoint(mainPoint: Vector2, points: Vector2[], exclude?: Vector2 | Vector2[]): Vector2;
    moveDirection(start: Vector2, direction: number, distance: number): Vector2;
    rotateAroundCenter(center: Vector2, point: Vector2, angle: number): Vector2;
};
