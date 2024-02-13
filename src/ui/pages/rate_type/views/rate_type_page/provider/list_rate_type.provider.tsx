import { createProvider } from "@/src/common/utils/zustand";
import type { RateTypeFilterValues } from "@/src/ui/pages/rate_type/views/rate_type_page/view_models/rate_type_filters_values";
import type { SortRateType } from "@/src/core/rate_type/domain/interfaces/sort_rate_type";
import type { RateTypeModel } from "@/src/core/rate_type/domain/models/rate_type_model";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import type { ListState } from "@/src/ui/view_models/list_state";
import { getListInitialState } from "@/src/ui/provider/list.slice";
import RateTypeController from "../../../controllers/rate_type_controller";

export const useListRateTypeProvider = createProvider<ListState<RateTypeModel, RateTypeFilterValues, SortRateType>>(() => (set, get) => ({
  filters: {
    name: "",
    energyType: undefined,
    minPower: "",
    maxPower: "",
    enabled: undefined,
    createdAt: "",
    responsible: ""
  },
  setOrderBy(newOrderBy: OrderBy<RateTypeModel>) {
    set({ orderBy: newOrderBy });
    get().getAll(get().filters);
  },
  ...getListInitialState(get, set, new RateTypeController())
}));
