import { createProvider } from "@/src/common/utils/zustand";
import type { EnergyCostFilterValues } from "@/src/ui/pages/energy_cost/views/energy_cost_page/view_models/energy_cost_filter_values";
import type { FilterEnergyCostModel } from "@/src/core/energy_cost/domain/models/filter_energy_cost_model";
import type { SortEnergyCost } from "@/src/core/energy_cost/domain/interfaces/sort_energy_cost";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import type { ListState } from "@/src/ui/view_models/list_state";
import type { EnergyCostModel } from "@/src/core/energy_cost/domain/models/energy_cost_model";
import { getListInitialState } from "@/src/ui/provider/list.slice";
import EnergyCostController from "../../../controllers/energy_cost_controller";

const FILTER_INITIAL_VALUES: EnergyCostFilterValues = {
  concept: "",
  amount: "",
  enabled: undefined,
  createdAt: "",
  responsible: ""
};

export const useListEnergyCostProvider = createProvider<ListState<EnergyCostModel, FilterEnergyCostModel, SortEnergyCost>>(() => (set, get) => ({
  filters: FILTER_INITIAL_VALUES,
  setOrderBy(newOrderBy: OrderBy<SortEnergyCost>) {
    set({ orderBy: newOrderBy });
    get().getAll(get().filters);
  },
  ...getListInitialState(get, set, new EnergyCostController())
}));
