export interface IUpdateable {
	update(deltaTime: number): void;
	shouldUpdate?(): boolean;
	fixedUpdate?(dt: number): void;
}
