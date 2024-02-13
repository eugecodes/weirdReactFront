/* eslint-disable @typescript-eslint/no-explicit-any */
import { createProvider } from "@/src/common/utils/zustand";
import type { FilterMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/filter_marketer_margin_model";
import MarketerMarginController from "@/src/ui/pages/marketer_margin/controllers/marketer_margin_controller";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import type { MarketerMarginModel } from "@/src/core/marketer_margin/domain/models/marketer_margin_model";
import type { SortMarketerMargin } from "@/src/core/marketer_margin/domain/interfaces/sort_marketer_margin";
import { getListInitialState } from "@/src/ui/provider/list.slice";
import type { ListState } from "@/src/ui/view_models/list_state";

interface MarketerMarginProviderBuilderProps {
  filters: FilterMarketerMarginModel;
}

export const useListMarketerMarginProvider = createProvider<
  ListState<MarketerMarginModel, FilterMarketerMarginModel, SortMarketerMargin>,
  MarketerMarginProviderBuilderProps
>(({ filters }) => {
  return (set, get) => ({
    filters: {
      marketerId: undefined,
      rate: [],
      rateType: [],
      minConsume: undefined,
      maxConsume: undefined,
      minMargin: undefined,
      maxMargin: undefined,
      ...filters
    },
    setOrderBy(newOrderBy: OrderBy<MarketerMarginModel>) {
      set({ orderBy: newOrderBy });
      get().getAll(get().filters);
    },
    ...getListInitialState(get, set, new MarketerMarginController())
  });
});
