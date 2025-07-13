import { IUpdateable } from "./IUpdateable";

export interface IPreUpdateable extends IUpdateable {
	preUpdate(deltaTime: number): void;
}
