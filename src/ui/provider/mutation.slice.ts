import type { StoreApi } from "zustand";
import type { MutationController } from "@/src/common/interfaces/mutation_controller";
import type { MutationState } from "../view_models/mutation_state";
import type { Id } from "@/src/common/utils/types";

export function getMutationInitialState<Model, Update>(
  set: StoreApi<MutationState<Model, Update>>["setState"],
  controller: MutationController<Model>
) {
  return {
    item: null,
    async getById(id: Id) {
      try {
        const response = await controller.getOneById(id);
        set({ item: response });
        return response;
      } catch (error) {
        console.error(error);
        set({ item: null });
        return null;
      }
    }
  };
}
