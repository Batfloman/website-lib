export interface IUpdateable<TContext = undefined> {
	update(deltaTime: number, context: TContext): void;
	shouldUpdate?(): boolean;
	fixedUpdate?(dt: number, context: TContext): void;
}
