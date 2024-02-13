import type { Id } from "@/src/common/utils/types";
import { createProvider } from "@/src/common/utils/zustand";
import ContractController from "@/src/ui/pages/contract/controllers/contract_controller";
import { getMutationInitialState } from "@/src/ui/provider/mutation.slice";
import type { MutationState } from "@/src/ui/view_models/mutation_state";
import type { DetailContractModel } from "@/src/core/contract/domain/models/detail_contract_model";
import type { EditContractModel } from "@/src/core/contract/domain/models/edit_contract_model";

export const useMutationContractProvider = createProvider<MutationState<DetailContractModel, EditContractModel>>(() => (set) => ({
  async edit(input: EditContractModel, id: Id) {
    const response = await ContractController.edit(input, id);
    set({ item: response });
    return response;
  },
  ...getMutationInitialState(set, new ContractController())
}));
