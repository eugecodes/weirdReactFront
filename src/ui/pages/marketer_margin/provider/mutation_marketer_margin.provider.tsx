import { createProvider } from "@/src/common/utils/zustand";
import type { MarketerMarginModel } from "@/src/core/marketer_margin/domain/models/marketer_margin_model";
import MarketerMarginController from "@/src/ui/pages/marketer_margin/controllers/marketer_margin_controller";
import type { MutationState } from "@/src/ui/view_models/mutation_state";
import { getMutationInitialState } from "@/src/ui/provider/mutation.slice";
import type { Id } from "@/src/common/utils/types";
import type { CreateMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/create_marketer_margin_model";

export const useMutationMarketerMarginProvider = createProvider<MutationState<MarketerMarginModel, CreateMarketerMarginModel>>(() => (set) => ({
  async edit(input: CreateMarketerMarginModel, id: Id) {
    const response = await MarketerMarginController.edit(input, id);
    set({ item: response });
    return response;
  },
  ...getMutationInitialState(set, new MarketerMarginController())
}));
