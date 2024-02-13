import { createProvider } from "@/src/common/utils/zustand";
import type { FilterSupplyPointModel } from "@/src/core/supply_point/domain/models/filter_supply_point_model";
import SupplyPointController from "@/src/ui/pages/supply_point/controllers/supply_point_controller";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import type { SupplyPointModel } from "@/src/core/supply_point/domain/models/supply_point_model";
import type { SortSupplyPoint } from "@/src/core/supply_point/domain/interfaces/sort_supply_point";
import { getListInitialState } from "@/src/ui/provider/list.slice";
import type { ListState } from "@/src/ui/view_models/list_state";

interface SupplyPointProviderBuilderProps {
  filters: FilterSupplyPointModel;
}

export const useListSupplyPointProvider = createProvider<
  ListState<SupplyPointModel, FilterSupplyPointModel, SortSupplyPoint>,
  SupplyPointProviderBuilderProps
>(({ filters }) => {
  return (set, get) => ({
    filters: {
      ...filters
    },
    setOrderBy(newOrderBy: OrderBy<SupplyPointModel>) {
      set({ orderBy: newOrderBy });
      get().getAll(get().filters);
    },
    ...getListInitialState(get, set, new SupplyPointController())
  });
});
