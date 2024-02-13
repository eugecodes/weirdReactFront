import type { Id } from "@/src/common/utils/types";
import { createProvider } from "@/src/common/utils/zustand";
import type { CreateClientModel } from "@/src/core/client/domain/models/create_client_model";
import ClientController from "@/src/ui/pages/client/controllers/client_controller";
import { getMutationInitialState } from "@/src/ui/provider/mutation.slice";
import type { MutationState } from "@/src/ui/view_models/mutation_state";
import type { DetailClientModel } from "@/src/core/client/domain/models/detail_client_model";

export const useMutationClientProvider = createProvider<MutationState<DetailClientModel, CreateClientModel>>(() => (set) => ({
  async edit(input: CreateClientModel, id: Id) {
    const response = await ClientController.edit(input, id);
    set({ item: response });
    return response;
  },
  ...getMutationInitialState(set, new ClientController())
}));
