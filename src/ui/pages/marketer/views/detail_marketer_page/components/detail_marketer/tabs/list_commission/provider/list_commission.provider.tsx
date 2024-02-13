import { createProvider } from "@/src/common/utils/zustand";
import type { FilterCommissionModel } from "@/src/core/commission/domain/models/filter_commission_model";
import CommissionController from "@/src/ui/pages/commission/controllers/commission_controller";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import type { CommissionModel } from "@/src/core/commission/domain/models/commission_model";
import type { SortCommission } from "@/src/core/commission/domain/interfaces/sort_commission";
import { getListInitialState } from "@/src/ui/provider/list.slice";
import type { ListState } from "@/src/ui/view_models/list_state";

interface CommissionProviderBuilderProps {
  filters: FilterCommissionModel;
}

export const useListCommissionProvider = createProvider<
  ListState<CommissionModel, FilterCommissionModel, SortCommission>,
  CommissionProviderBuilderProps
>(({ filters }) => {
  return (set, get) => ({
    filters: {
      ...filters,
      name: "",
      rateType: [],
      rates: [],
      energyType: undefined,
      minPower: "",
      maxPower: "",
      minConsumption: "",
      maxConsumption: "",
      percentagetestCommission: "",
      testCommission: ""
    },
    setOrderBy(newOrderBy: OrderBy<CommissionModel>) {
      set({ orderBy: newOrderBy });
      get().getAll(get().filters);
    },
    ...getListInitialState(get, set, new CommissionController())
  });
});
