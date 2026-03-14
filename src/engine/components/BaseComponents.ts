import type { PhysicsComponent } from "./PhysicsComponent";
import type { TransformComponent } from "./TransformComponent";

export interface BaseComponents {
  transform?: TransformComponent;
  physics?: PhysicsComponent;
}
