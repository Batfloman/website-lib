export interface IUpdateable {
	update(deltatime: number): void;
	shouldUpdate(): boolean;
}
