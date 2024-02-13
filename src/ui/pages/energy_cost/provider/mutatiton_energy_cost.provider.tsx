import type { AtLeast, Id } from "@/src/common/utils/types";
import { createProvider } from "@/src/common/utils/zustand";
import type { CreateEnergyCostModel } from "@/src/core/energy_cost/domain/models/create_energy_cost_model";
import type { EnergyCostModel } from "@/src/core/energy_cost/domain/models/energy_cost_model";
import type { PatchEnergyCostModel } from "@/src/core/energy_cost/domain/models/patch_energy_cost_model";
import EnergyCostController from "@/src/ui/pages/energy_cost/controllers/energy_cost_controller";
import { getMutationInitialState } from "@/src/ui/provider/mutation.slice";
import type { MutationState } from "@/src/ui/view_models/mutation_state";

export const useMutationEnergyCostProvider = createProvider<MutationState<EnergyCostModel, CreateEnergyCostModel>>(() => (set) => ({
  async edit(input: CreateEnergyCostModel, id: Id) {
    const data: AtLeast<PatchEnergyCostModel, "id"> = { ...input, id };
    return await EnergyCostController.patch(data);
  },
  ...getMutationInitialState(set, new EnergyCostController())
}));
