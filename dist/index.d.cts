declare class TwoKeyMap<K, K2, V> {
    private map;
    constructor();
    get(key: K, key2: K2): V | undefined;
    set(key: K, key2: K2, value: V): void;
    clear(): void;
    delete(key: K, key2: K2): void;
}

declare class Color {
    static none: Color;
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r: number, g: number, b: number, a?: number);
    getRGBString(): string;
    setR(r: number): void;
    setG(g: number): void;
    setB(b: number): void;
    setA(a: number): void;
    static getRandom(): Color;
    static getRandomNamedColor(): Color;
    static get(color: colors): Color;
}
declare const colors: Map<colors, Color>;
type colors = "aliceblue" | "antiquewhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedalmond" | "blue" | "blueviolet" | "brown" | "burlywood" | "cadetblue" | "chartreuse" | "chocolate" | "coral" | "cornflowerblue" | "cornsilk" | "crimson" | "cyan" | "darkblue" | "darkcyan" | "darkgoldenrod" | "darkgray" | "darkgreen" | "darkkhaki" | "darkmagenta" | "darkolivegreen" | "darkorange" | "darkorchid" | "darkred" | "darksalmon" | "darkseagreen" | "darkslateblue" | "darkslategray" | "darkturquoise" | "darkviolet" | "deeppink" | "deepskyblue" | "dimgray" | "dodgerblue" | "firebrick" | "floralwhite" | "forestgreen" | "fuchsia" | "gainsboro" | "ghostwhite" | "gold" | "goldenrod" | "gray" | "green" | "greenyellow" | "honeydew" | "hotpink" | "indianred" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderblush" | "lawngreen" | "lemonchiffon" | "lightblue" | "lightcoral" | "lightcyan" | "lightgoldenrodyellow" | "lightgray" | "lightgreen" | "lightpink" | "lightsalmon" | "lightseagreen" | "lightskyblue" | "lightslategray" | "lightsteelblue" | "lightyellow" | "lime" | "limegreen" | "linen" | "magenta" | "maroon" | "mediumaquamarine" | "mediumblue" | "mediumorchid" | "mediumpurple" | "mediumseagreen" | "mediumslateblue" | "mediumspringgreen" | "mediumturquoise" | "mediumvioletred" | "midnightblue" | "mintcream" | "mistyrose" | "moccasin" | "navajowhite" | "navy" | "oldlace" | "olive" | "olivedrab" | "orange" | "orangered" | "orchid" | "palegoldenrod" | "palegreen" | "paleturquoise" | "palevioletred" | "papayawhip" | "peachpuff" | "peru" | "pink" | "plum" | "powderblue" | "purple" | "red" | "rosybrown" | "royalblue" | "saddlebrown" | "salmon" | "sandybrown" | "seagreen" | "seashell" | "sienna" | "silver" | "skyblue" | "slateblue" | "slategray" | "snow" | "springgreen" | "steelblue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whitesmoke" | "yellow" | "yellowgreen";

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
    static add(vec1: Vector2, vec2: Vector2): Vector2;
    static moveInDirectionFromPoint(start: Vector2, direction: number, distance: number): Vector2;
    static rotateAroundCenter(center: Vector2, vec: Vector2, angle: number): Vector2;
    static setAngleAroundCenter(center: Vector2, vec: Vector2, angle: number): Vector2;
}

type RenderArgs = {
    color?: Color;
    rotation?: number;
    fill?: string;
    borderStyle?: string;
};
declare abstract class Renderer {
    static defaultArgs: RenderArgs;
    abstract renderLine(pos1: Vector2, pos2: Vector2, args?: RenderArgs): void;
    abstract renderCircle(pos: Vector2, radius: number, args?: RenderArgs): void;
    abstract renderRectangle(pos: Vector2, pos2: Vector2, args?: RenderArgs): void;
}

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

declare namespace math {
    function round(x: number, num_decimals?: number): number;
    function floor(x: number, num_decimals?: number): number;
    function ceil(x: number, num_decimals?: number): number;
    namespace random {
        function between(start: number, end: number, num_decimals?: number): number;
        function sign(): number;
    }
    namespace trigonometry {
        function cos(degree: number): number;
        function arccos(num: number): number;
    }
    namespace convert {
        function DegToRad(degree: number): number;
        function RadToDeg(rad: number): number;
        function percent(percent: number | string, value?: number): number;
    }
}

declare namespace vector {
    function distance(vec1: Vector2, vec2: Vector2): number;
}

interface ITranslateable {
    pos: Vector2;
    mover: TranslationBehavior;
}
declare class TranslationBehavior {
    private host;
    constructor(host: {
        pos: Vector2;
    });
    moveDirection(degrees: number, distance: number): void;
    move(vec: Vector2): void;
}

interface IRotateable {
    orientation: number;
    rotator: RotateBehaviour;
}
declare class RotateBehaviour {
    private host;
    constructor(host: IRotateable);
    rotate(degrees: number): void;
    setRotation(degrees: number): void;
}

interface IMoveable extends ITranslateable, IRotateable {
}

interface ICollideable<Box extends HitBox = HitBox> extends IMoveable {
    hitBox: Box;
    collider: CollideableBehaviour;
}
declare class CollideableBehaviour {
    private host;
    translatedPoints: Vector2[];
    alreadyTranslated: boolean;
    constructor(host: ICollideable);
    isCollidingWith(other: ICollideable): boolean;
    translatePoints(): Vector2[];
}

interface IUpdateable {
    update(deltaTime: number): void;
    shouldUpdate?(): boolean;
    fixedUpdate?(dt: number): void;
}

interface IPreUpdateable extends IUpdateable {
    preUpdate(deltaTime: number): void;
}

interface IRenderable {
    render(renderer: Renderer): void;
    shouldRender?(): boolean;
}

interface IScaleable {
    scale: number;
    scaler: ScaleBehavior;
}
declare class ScaleBehavior {
    private host;
    constructor(host: {
        scale: number;
    });
    scale(scalar: number): void;
    setScale(scale: number): void;
}

declare namespace Collision {
    function testCollision(obj1: ICollideable, obj2: ICollideable): boolean;
    function isPointInside(obj: ICollideable, worldPoint: Vector2): boolean;
    function potentialCollision(obj1: ICollideable, obj2: ICollideable): boolean;
    function circleCollision(c1: Vector2, r1: number, c2: Vector2, r2: number): boolean;
}

declare class SAT {
    static testCollision(obj1: ICollideable, obj2: ICollideable): boolean;
    private static areColliding;
}

declare class Triangulation {
    static triangulate(obj: ICollideable): ICollideable[];
    private static isPointInTriangle;
}

declare abstract class HitBox implements IScaleable {
    boundingRadius: number;
    isConvex: boolean;
    scale: number;
    scaler: ScaleBehavior;
    abstract translatePoints(pos: Vector2, orientation: number): Vector2[];
    abstract isPointInside(point: Vector2): boolean;
}

declare class Circle extends HitBox {
    radius: number;
    readonly boundingRadius: number;
    readonly isConvex: boolean;
    constructor(radius?: number);
    translatePoints(pos: Vector2, orientation: number): Vector2[];
    isPointInside(point: Vector2): boolean;
}

type PolygonWinding = "clockwise" | "counterclockwise";
declare class Polygon2 extends HitBox {
    model: Vector2[];
    boundingRadius: number;
    isConvex: boolean;
    constructor(model: Vector2[]);
    private updateBoundingRadius;
    private findCenter;
    centerModel(): void;
    translatePoints(pos: Vector2, orientation: number): Vector2[];
    isPointInside(point: Vector2): boolean;
    static findArea(polygon: Polygon2): number;
    static findWinding(polygon: Polygon2): PolygonWinding;
    static testConvex(polygon: Polygon2): boolean;
    static isConvex(windung: PolygonWinding, crossProduct: number): boolean;
    static isPointIndside(polygon: Polygon2, point: Vector2): boolean;
}

declare class Rectangle extends Polygon2 {
    width: number;
    height: number;
    constructor(width: number, height: number);
}

declare class Triangle extends Polygon2 {
    constructor(p1: Vector2, p2: Vector2, p3: Vector2);
}

declare class Zoom {
    activated: boolean;
    faktor: number;
    minZoom: number;
    maxZoom: number;
    currentZoom: number;
    constructor(faktor?: number, minZoom?: number, maxZoom?: number);
    zoomIn(): number | null;
    zoomOut(): number | null;
    setZoom(zoom?: number): void;
    setActivated(value: boolean): void;
    enable(): void;
    disable(): void;
}

declare class Camera implements ICollideable<HitBox>, IMoveable {
    pos: Vector2;
    hitBox: Rectangle;
    orientation: number;
    collider: CollideableBehaviour;
    mover: TranslationBehavior;
    rotator: RotateBehaviour;
    lockMovement: boolean;
    protected zoom: Zoom;
    constructor(width: number, height: number);
    rotate(degrees: number): void;
    translatedPoints: Vector2[];
    alreadyTranslated: boolean;
    translatePoints(): Vector2[];
    isCollidingWith(other: ICollideable): boolean;
}

declare class Canvas {
    private htmlCanvas;
    width: number;
    height: number;
    constructor(htmlCanvas: HTMLCanvasElement | null);
    updateSize(): void;
}

declare class CanvasCamera extends Camera {
    constructor(canvas: Canvas);
    private mouseWheel;
    private mouseMove;
    private previousTouchPos;
    private touchMove;
}

declare class CanvasRenderer extends Renderer {
    protected canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement);
    renderLine(pos1: Vector2, pos2: Vector2, args?: RenderArgs): void;
    renderCircle(pos: Vector2, radius: number, args?: RenderArgs): void;
    renderRectangle(pos: Vector2, pos2: Vector2, args?: RenderArgs): void;
}

declare class GameLoop {
    private game;
    private renderer;
    private lastTickTime;
    private isStopped;
    private accumulator;
    private readonly fixedDelta;
    constructor(game: {
        fixedUpdate: (fixedDt: number) => void;
        update: (dt: number) => void;
        render: (renderer: Renderer) => void;
    }, renderer: Renderer);
    start(): void;
    stop(): void;
    private loop;
}

declare abstract class Scene implements IUpdateable, IRenderable {
    onLoad?(): void;
    onUnload?(): void;
    abstract fixedUpdate(dt: number): void;
    abstract update(dt: number): void;
    abstract render(renderer: Renderer): void;
}

declare abstract class SceneObject implements IUpdateable {
    abstract update(deltaTime: number): void;
    abstract shouldUpdate(): boolean;
}

declare abstract class GameObject extends SceneObject implements IMoveable, IRenderable {
    abstract pos: Vector2;
    mover: TranslationBehavior;
    orientation: number;
    rotator: RotateBehaviour;
    abstract fixedUpdate(dt: number): void;
    abstract update(deltaTime: number): void;
    shouldUpdate(): boolean;
    abstract render(renderer: Renderer): void;
    shouldRender(): boolean;
}

declare class World implements Scene {
    private objects;
    addObject(obj: GameObject): void;
    fixedUpdate(dt: number): void;
    update(dt: number): void;
    render(renderer: Renderer): void;
}

declare class SceneManager {
    private sceneMap;
    private activeScenes;
    addScene(name: string, scene: Scene): void;
    enableScene(name: string): void;
    disableScene(name: string): void;
    clearScenes(): void;
    fixedUpdate(dt: number): void;
    update(dt: number): void;
    render(renderer: Renderer): void;
}

declare abstract class GameManager {
    readonly gameLoop: GameLoop;
    readonly sceneManager: SceneManager;
    constructor(renderer: Renderer);
    fixedUpdate(dt: number): void;
    update(dt: number): void;
    render(renderer: Renderer): void;
}

declare class RealTimeManager extends GameManager {
    update(dt: number): void;
}

declare class TurnBasedManager extends GameManager {
    update(dt: number): void;
}

type inputKey = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "shift" | "space" | "tab" | "alt" | "strg" | "altRight" | "leftclick" | "rightclick" | "middleclick" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "up" | "left" | "down" | "right";

declare class Input {
    static eventListener: Map<string, Listener[]>;
    static pressedKeys: inputKey[];
    static mPos: Vector2;
    static staticConstructor(): void;
    static newEventListener<K extends keyof WindowEventMap>(event: K, obj: Object, func: Function): void;
    static removeEventListener<K extends keyof WindowEventMap>(event: K, obj: Object): void;
    private static notifyOfEvent;
    private static keyDown;
    private static keyUp;
    static getInputKey(key: string): inputKey | undefined;
    static isLeftClick(): boolean;
    static isPressed(key: inputKey): boolean;
}
declare class Listener {
    obj: Object;
    func: Function;
    constructor(obj: Object, func: Function);
}

declare abstract class ControllableObject extends GameObject implements IPreUpdateable {
    private controls;
    preUpdate(deltaTime: number): void;
    addControl(key: inputKey, func: Function, max_activation_Interval?: number): void;
}

declare class Thread {
    blobURL: string;
    worker: Worker;
    constructor(workerFunc: Function, receiveFunc: Function);
    postMessage(message: any): void;
    terminate(): void;
}

declare namespace array {
    function getItemCyclic<T>(arr: T[], index: number): T;
    function getLastItem<T>(arr: T[]): T;
    function getRandomItem<T>(arr: T[]): T;
    function removeItemAtIndex<T>(arr: T[], index: number): T;
    function removeItem<T>(arr: T[], item: T): T | undefined;
    function sum(arr: number[]): number;
    function isEmpty<T>(arr: T[]): boolean;
    function copyOf<T>(arr: T[]): T[];
    function connectArrays<T>(arrays: T[]): T[];
}
declare namespace map {
    function copyOf<K, V>(map: Map<K, V>): Map<K, V>;
}
declare namespace object {
    function findClassName(clas: Object | Function): string;
    function findSuperClassName(clas: Object | Function): string;
    function findClass(clas: Object | Function): Function;
    function findSuperClass(clas: Object | Function): Function;
    function findAllClassNames(clas: Object | Function): string[];
    function findAllClasses(clas: Object | Function): Function[];
    function findAllSuperClassNames(clas: Object | Function): string[];
    function findAllSuperClasses(clas: Object | Function): Function[];
}

declare const Util: {
    vector: typeof vector;
    math: typeof math;
    array: typeof array;
    map: typeof map;
    object: typeof object;
};

export { Camera, Canvas, CanvasCamera, CanvasRenderer, Circle, CollideableBehaviour, Collision, Color, ControllableObject, GameLoop, GameManager, GameObject, HitBox, type ICollideable, type IMoveable, type IPreUpdateable, type IRenderable, type IRotateable, type IScaleable, type ITranslateable, type IUpdateable, Input, Matrix2, Polygon2, type PolygonWinding, RealTimeManager, Rectangle, type RenderArgs, Renderer, RotateBehaviour, SAT, ScaleBehavior, Scene, SceneManager, SceneObject, Thread, TranslationBehavior, Triangle, Triangulation, TurnBasedManager, TwoKeyMap, Util, Vector2, World, Zoom, type inputKey, math, vector };
