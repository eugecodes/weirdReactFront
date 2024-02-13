import { createProvider } from "@/src/common/utils/zustand";
import type { RateModel } from "@/src/core/rate/domain/models/rate_model";
import RateController from "@/src/ui/pages/rate/controllers/rate_controller";
import type { MutationState } from "@/src/ui/view_models/mutation_state";
import { getMutationInitialState } from "@/src/ui/provider/mutation.slice";
import type { Id } from "@/src/common/utils/types";
import type { CreateRateModel } from "@/src/core/rate/domain/models/create_rate_model";

export const useMutationRateProvider = createProvider<MutationState<RateModel, CreateRateModel>>(() => (set) => ({
  async edit(input: CreateRateModel, id: Id) {
    const response = await RateController.edit(input, id);
    set({ item: response });
    return response;
  },
  ...getMutationInitialState(set, new RateController())
}));
