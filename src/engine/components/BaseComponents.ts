import type { PhysicsBodyComponent } from "../physics";
import type { TransformComponent } from "./TransformComponent";

export interface BaseComponents {
  transform?: TransformComponent;
  physicsBody?: PhysicsBodyComponent;
}
