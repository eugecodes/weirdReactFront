import { createProvider } from "@/src/common/utils/zustand";
import type { FilterProfileModel } from "@/src/core/profile/domain/models/filter_profile_model";
import ProfileController from "@/src/ui/pages/profile/controllers/profile_controller";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import type { ProfileModel } from "@/src/core/profile/domain/models/profile_model";
import type { SortProfile } from "@/src/core/profile/domain/interfaces/sort_profile";
import { getListInitialState } from "@/src/ui/provider/list.slice";
import type { ListState } from "@/src/ui/view_models/list_state";

export const useListProfileProvider = createProvider<ListState<ProfileModel, FilterProfileModel, SortProfile>>(() => (set, get) => ({
  filters: {
    name: "",
    surnames: "",
    email: "",
    role: "",
    enabled: undefined,
    createdAt: "",
    responsible: ""
  },
  setOrderBy(newOrderBy: OrderBy<ProfileModel>) {
    set({ orderBy: newOrderBy });
    get().getAll(get().filters);
  },
  ...getListInitialState(get, set, new ProfileController())
}));
