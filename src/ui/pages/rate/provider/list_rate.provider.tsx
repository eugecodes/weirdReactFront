/* eslint-disable @typescript-eslint/no-explicit-any */
import { createProvider } from "@/src/common/utils/zustand";
import type { FilterRateModel } from "@/src/core/rate/domain/models/filter_rate_model";
import RateController from "@/src/ui/pages/rate/controllers/rate_controller";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import type { RateModel } from "@/src/core/rate/domain/models/rate_model";
import type { SortRate } from "@/src/core/rate/domain/interfaces/sort_rate";
import { getListInitialState } from "@/src/ui/provider/list.slice";
import type { ListState } from "@/src/ui/view_models/list_state";

interface RateProviderBuilderProps {
  filters: FilterRateModel;
}

export const useListRateProvider = createProvider<ListState<RateModel, FilterRateModel, SortRate>, RateProviderBuilderProps>(({ filters }) => {
  return (set, get) => ({
    filters: {
      marketerId: undefined,
      name: "",
      energyType: undefined,
      priceType: undefined,
      clientTypes: [],
      rateType: [],
      permanency: undefined,
      length: "",
      isFullRenewable: undefined,
      compensationSurplus: undefined,
      compensationSurplusValue: undefined,
      minPower: "",
      maxPower: "",
      energyPrice1: "",
      energyPrice2: "",
      energyPrice3: "",
      energyPrice4: "",
      energyPrice5: "",
      energyPrice6: "",
      powerPrice1: "",
      powerPrice2: "",
      powerPrice3: "",
      powerPrice4: "",
      powerPrice5: "",
      powerPrice6: "",
      fixedTermPrice: "",
      ...filters
    },
    setOrderBy(newOrderBy: OrderBy<RateModel>) {
      set({ orderBy: newOrderBy });
      get().getAll(get().filters);
    },
    ...getListInitialState(get, set, new RateController())
  });
});
