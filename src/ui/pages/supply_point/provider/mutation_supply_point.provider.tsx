import type { Id } from "@/src/common/utils/types";
import { createProvider } from "@/src/common/utils/zustand";
import type { CreateSupplyPointModel } from "@/src/core/supply_point/domain/models/create_supply_point_model";
import SupplyPointController from "@/src/ui/pages/supply_point/controllers/supply_point_controller";
import { getMutationInitialState } from "@/src/ui/provider/mutation.slice";
import type { MutationState } from "@/src/ui/view_models/mutation_state";
import type { DetailSupplyPointModel } from "@/src/core/supply_point/domain/models/detail_supply_point_model";

export const useMutationSupplyPointProvider = createProvider<MutationState<DetailSupplyPointModel, CreateSupplyPointModel>>(() => (set) => ({
  async edit(input: CreateSupplyPointModel, id: Id) {
    const response = await SupplyPointController.edit(input, id);
    set({ item: response });
    return response;
  },
  ...getMutationInitialState(set, new SupplyPointController())
}));
