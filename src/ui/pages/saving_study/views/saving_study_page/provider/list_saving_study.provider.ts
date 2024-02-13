import { createProvider } from "@/src/common/utils/zustand";
import type { FilterSavingStudyModel } from "@/src/core/saving_study/domain/models/filter_saving_study_model";
import type { SortSavingStudy } from "@/src/core/saving_study/domain/interfaces/sort_saving_study";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import type { ListState } from "@/src/ui/view_models/list_state";
import type { SavingStudyModel } from "@/src/core/saving_study/domain/models/saving_study_model";
import { getListInitialState } from "@/src/ui/provider/list.slice";
import SavingStudyController from "@/src/ui/pages/saving_study/controllers/saving_study_controller";

export const useListSavingStudyProvider = createProvider<ListState<SavingStudyModel, FilterSavingStudyModel, SortSavingStudy>>(() => (set, get) => ({
  filters: {
    id: undefined,
    cups: "",
    clientType: undefined,
    clientName: "",
    clientNif: "",
    marketer: "",
    selectedRate: "",
    rateType: "",
    status: undefined,
    createdAt: "",
    responsible: ""
  },
  setOrderBy(newOrderBy: OrderBy<SortSavingStudy>) {
    set({ orderBy: newOrderBy });
    get().getAll(get().filters);
  },
  ...getListInitialState(get, set, new SavingStudyController())
}));
