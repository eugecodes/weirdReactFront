import type { Id } from "@/src/common/utils/types";
import { createProvider } from "@/src/common/utils/zustand";
import type { CreateProfileModel } from "@/src/core/profile/domain/models/create_profile_model";
import type { ProfileModel } from "@/src/core/profile/domain/models/profile_model";
import ProfileController from "@/src/ui/pages/profile/controllers/profile_controller";
import { getMutationInitialState } from "@/src/ui/provider/mutation.slice";
import type { MutationState } from "@/src/ui/view_models/mutation_state";

export const useMutationProfileProvider = createProvider<MutationState<ProfileModel, CreateProfileModel>>(() => (set) => ({
  async edit(input: CreateProfileModel, id: Id) {
    const response = await ProfileController.edit(input, id);
    set({ item: response });
    return response;
  },
  ...getMutationInitialState(set, new ProfileController())
}));
