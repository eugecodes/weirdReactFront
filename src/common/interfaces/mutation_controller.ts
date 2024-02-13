import type { Id, Optional } from "../utils/types";

export interface MutationController<Model> {
  getOneById(id: Id): Promise<Optional<Model>>;
}
