import type { AtLeast, Id } from "@/src/common/utils/types";
import { createProvider } from "@/src/common/utils/zustand";
import type { CreateRateTypeModel } from "@/src/core/rate_type/domain/models/create_rate_type_model";
import type { PatchRateTypeModel } from "@/src/core/rate_type/domain/models/patch_rate_type_model";
import type { RateTypeModel } from "@/src/core/rate_type/domain/models/rate_type_model";
import RateTypeController from "@/src/ui/pages/rate_type/controllers/rate_type_controller";
import { getMutationInitialState } from "@/src/ui/provider/mutation.slice";
import type { MutationState } from "@/src/ui/view_models/mutation_state";

export const useMutationRateTypeProvider = createProvider<MutationState<RateTypeModel, CreateRateTypeModel>>(() => (set) => ({
  async edit(input: CreateRateTypeModel, id: Id) {
    const data: AtLeast<PatchRateTypeModel, "id"> = { ...input, id };
    return await RateTypeController.patch(data);
  },
  ...getMutationInitialState(set, new RateTypeController())
}));
