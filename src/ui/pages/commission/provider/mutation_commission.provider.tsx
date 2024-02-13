import { createProvider } from "@/src/common/utils/zustand";
import CommissionController from "@/src/ui/pages/commission/controllers/commission_controller";
import type { MutationState } from "@/src/ui/view_models/mutation_state";
import { getMutationInitialState } from "@/src/ui/provider/mutation.slice";
import type { Id } from "@/src/common/utils/types";
import type { CreateCommissionModel } from "@/src/core/commission/domain/models/create_commission_model";
import type { DetailCommissionModel } from "@/src/core/commission/domain/models/detail_commission_model";

export const useMutationCommissionProvider = createProvider<MutationState<DetailCommissionModel, CreateCommissionModel>>(() => (set) => ({
  async edit(input: CreateCommissionModel, id: Id) {
    const response = await CommissionController.edit(input, id);
    set({ item: response });
    return response;
  },
  ...getMutationInitialState(set, new CommissionController())
}));
