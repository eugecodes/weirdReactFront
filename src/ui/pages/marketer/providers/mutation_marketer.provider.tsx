import { createProvider } from "@/src/common/utils/zustand";
import type { EditMarketerModel } from "@/src/core/marketer/domain/models/edit_marketer_model";
import type { DetailMarketerModel } from "@/src/core/marketer/domain/models/detail_marketer_model";
import MarketerController from "@/src/ui/pages/marketer/controllers/marketer_controller";
import type { MutationState } from "@/src/ui/view_models/mutation_state";
import { getMutationInitialState } from "@/src/ui/provider/mutation.slice";
import type { Id } from "@/src/common/utils/types";

export const useMutationMarketerProvider = createProvider<MutationState<DetailMarketerModel, EditMarketerModel>>(() => (set) => ({
  async edit(input: EditMarketerModel, id: Id) {
    const response = await MarketerController.edit(input, id);
    set({ item: response });
    return response;
  },
  ...getMutationInitialState(set, new MarketerController())
}));
