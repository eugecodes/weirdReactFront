import { createProvider } from "@/src/common/utils/zustand";
import type { FilterCostModel } from "@/src/core/cost/domain/models/filter_cost_model";
import CostController from "@/src/ui/pages/cost/controllers/cost_controller";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import type { CostModel } from "@/src/core/cost/domain/models/cost_model";
import type { SortCost } from "@/src/core/cost/domain/interfaces/sort_cost";
import { getListInitialState } from "@/src/ui/provider/list.slice";
import type { ListState } from "@/src/ui/view_models/list_state";

interface CostProviderBuilderProps {
  filters: FilterCostModel;
}

export const useListCostProvider = createProvider<ListState<CostModel, FilterCostModel, SortCost>, CostProviderBuilderProps>(({ filters }) => {
  return (set, get) => ({
    filters: {
      ...filters,
      name: "",
      clientTypes: [],
      rates: [],
      quantity: "",
      minPower: "",
      maxPower: ""
    },
    setOrderBy(newOrderBy: OrderBy<CostModel>) {
      set({ orderBy: newOrderBy });
      get().getAll(get().filters);
    },
    ...getListInitialState(get, set, new CostController())
  });
});
