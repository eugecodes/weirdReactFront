import type { Id } from "@/src/common/utils/types";
import { createProvider } from "@/src/common/utils/zustand";
import type { CreateSavingStudyModel } from "@/src/core/saving_study/domain/models/create_saving_study_model";
import SavingStudyController from "@/src/ui/pages/saving_study/controllers/saving_study_controller";
import { getMutationInitialState } from "@/src/ui/provider/mutation.slice";
import type { MutationState } from "@/src/ui/view_models/mutation_state";
import type { DetailSavingStudyModel } from "@/src/core/saving_study/domain/models/detail_saving_study_model";

export const useMutationSavingStudyProvider = createProvider<MutationState<DetailSavingStudyModel, CreateSavingStudyModel>>(() => (set) => ({
  async edit(input: CreateSavingStudyModel, id: Id) {
    const response = await SavingStudyController.edit(input, id);
    set({ item: response });
    return response;
  },
  ...getMutationInitialState(set, new SavingStudyController())
}));
