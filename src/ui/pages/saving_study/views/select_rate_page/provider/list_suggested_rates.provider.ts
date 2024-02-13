import { createProvider } from "@/src/common/utils/zustand";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import { TABLE_FILTERS_INITIAL_PROPS } from "@/src/ui/provider/list.slice";
import SavingStudyController from "@/src/ui/pages/saving_study/controllers/saving_study_controller";
import type { SelectedRateModel } from "@/src/core/saving_study/domain/models/selected_rate/selected_rate_model";
import type { FilterSelectedRateModel } from "@/src/core/saving_study/domain/models/selected_rate/filter_selected_rate_model";
import type { SortSelectedRate } from "@/src/core/saving_study/domain/models/selected_rate/sort_selected_rate";
import { Filters } from "@/src/core/app/domain/models/filters";
import type { Id } from "@/src/common/utils/types";
import type { SuggestedRateModel } from "@/src/core/saving_study/domain/models/selected_rate/suggested_rate_model";

const controller = new SavingStudyController();

interface ListSelectedRateState {
  page: number;
  setPage(newPage: number): void;
  isLoading: boolean;
  rows: SuggestedRateModel[];
  size: number;
  setSize(newSize: number): void;
  total: number;
  getAll(filter: FilterSelectedRateModel, page?: number): Promise<void>;
  filters: FilterSelectedRateModel;
  orderBy: SortSelectedRate;
  setOrderBy(newOrderBy: SortSelectedRate): void;
  savingStudyId?: Id;
  setSavingStudyId(savingStudyId: Id): void;
}

export const useListSuggestedRatesProvider = createProvider<ListSelectedRateState>(() => (set, get) => ({
  filters: {
    marketerName: "",
    rateName: "",
    hasContractualCommitment: undefined,
    renewable: undefined,
    netMetering: undefined
  },
  setOrderBy(newOrderBy: OrderBy<SelectedRateModel>) {
    set({ orderBy: newOrderBy });
    get().getAll(get().filters);
  },
  savingStudyId: undefined,
  setSavingStudyId(savingStudyId) {
    set({ savingStudyId });
  },
  ...TABLE_FILTERS_INITIAL_PROPS,
  async getAll(profileFilter: FilterSelectedRateModel, page = 1) {
    if (!get().savingStudyId) {
      return;
    }
    set({ isLoading: true, filters: profileFilter });
    try {
      const orderBy = get().orderBy;
      const filter = new Filters<FilterSelectedRateModel, SortSelectedRate>({ page: get().page, size: get().size, item: profileFilter, orderBy });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const response = await controller.getSuggestedRates(filter, get().savingStudyId!);
      set({ rows: response.items, total: response.total, page });
    } finally {
      set({ isLoading: false });
    }
  },
  setPage(newPage: number) {
    set({ page: newPage });
    get().getAll(get().filters, newPage);
  },
  setSize(newSize: number) {
    set({ size: newSize, page: 1 });
    get().getAll(get().filters);
  }
}));
