import { createProvider } from "@/src/common/utils/zustand";
import CostController from "@/src/ui/pages/cost/controllers/cost_controller";
import type { MutationState } from "@/src/ui/view_models/mutation_state";
import { getMutationInitialState } from "@/src/ui/provider/mutation.slice";
import type { Id } from "@/src/common/utils/types";
import type { CreateCostModel } from "@/src/core/cost/domain/models/create_cost_model";
import type { DetailCostModel } from "@/src/core/cost/domain/models/detail_cost_model";

export const useMutationCostProvider = createProvider<MutationState<DetailCostModel, CreateCostModel>>(() => (set) => ({
  async edit(input: CreateCostModel, id: Id) {
    const response = await CostController.edit(input, id);
    set({ item: response });
    return response;
  },
  ...getMutationInitialState(set, new CostController())
}));
