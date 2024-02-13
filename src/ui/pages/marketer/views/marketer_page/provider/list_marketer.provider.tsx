import { createProvider } from "@/src/common/utils/zustand";
import type { FilterMarketerModel } from "@/src/core/marketer/domain/models/filter_marketer_model";
import MarketerController from "@/src/ui/pages/marketer/controllers/marketer_controller";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import type { MarketerModel } from "@/src/core/marketer/domain/models/marketer_model";
import type { SortMarketer } from "@/src/core/marketer/domain/interfaces/sort_marketer";
import type { ListState } from "@/src/ui/view_models/list_state";
import { getListInitialState } from "@/src/ui/provider/list.slice";

export const useListMarketerProvider = createProvider<ListState<MarketerModel, FilterMarketerModel, SortMarketer>>(() => (set, get) => ({
  filters: {
    name: "",
    fiscalName: "",
    cif: "",
    email: "",
    enabled: undefined,
    createdAt: "",
    responsible: ""
  },
  setOrderBy(newOrderBy: OrderBy<MarketerModel>) {
    set({ orderBy: newOrderBy });
    get().getAll(get().filters);
  },
  ...getListInitialState(get, set, new MarketerController())
}));
