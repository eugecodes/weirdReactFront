import type { Id, Optional } from "@/src/common/utils/types";

export interface MutationState<Model, EditModel> {
  item: Optional<Model>;
  edit(input: EditModel, id: Id): Promise<Optional<Model>>;
  getById(id: Id): Promise<Optional<Model>>;
}
