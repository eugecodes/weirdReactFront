import type { Id } from "@/src/common/utils/types";
import { createProvider } from "@/src/common/utils/zustand";
import type { CreateContactModel } from "@/src/core/contact/domain/models/create_contact_model";
import ContactController from "@/src/ui/pages/contact/controllers/contact_controller";
import { getMutationInitialState } from "@/src/ui/provider/mutation.slice";
import type { MutationState } from "@/src/ui/view_models/mutation_state";
import type { DetailContactModel } from "@/src/core/contact/domain/models/detail_contact_model";

export const useMutationContactProvider = createProvider<MutationState<DetailContactModel, CreateContactModel>>(() => (set) => ({
  async edit(input: CreateContactModel, id: Id) {
    const response = await ContactController.edit(input, id);
    set({ item: response });
    return response;
  },
  ...getMutationInitialState(set, new ContactController())
}));
