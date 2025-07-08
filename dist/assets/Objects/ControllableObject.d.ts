import { HitBox } from "../../physic/boundingBox/HitBox";
import { WorldObject } from "./WorldObject";
export declare abstract class ControllableObject<HitBoxType extends HitBox> extends WorldObject<HitBoxType> {
    private controlles;
    private timeOuts;
    update(dt: number): void;
    abstract update2(dt: number): void;
    addControll(key: inputKey, func: Function, timeout?: number): void;
}
