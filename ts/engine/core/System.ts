import { Renderer } from "engine/renderer";

export interface System {
	fixedUpdate?(dt: number): void;
	update?(dt: number): void;
	render?(renderer: Renderer): void;
}

export type SystemPhases = {
	fixed?: boolean;
	update?: boolean;
	render?: boolean;
};
