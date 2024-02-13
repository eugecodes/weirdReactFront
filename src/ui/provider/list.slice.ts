import { PAGINATION_SIZES } from "@/src/common/utils/table";
import type { StoreApi } from "zustand";
import type { ListState } from "@/src/ui/view_models/list_state";
import { Filters } from "@/src/core/app/domain/models/filters";
import type { Id } from "@/src/common/utils/types";
import type { ListController } from "@/src/common/interfaces/list_controller";

export const TABLE_FILTERS_INITIAL_PROPS = {
  isLoading: true,
  page: 1,
  size: PAGINATION_SIZES[0],
  total: 0,
  rows: [],
  orderBy: {}
};

export function getListInitialState<Model, Filter, Sort>(
  get: StoreApi<ListState<Model, Filter, Sort>>["getState"],
  set: StoreApi<ListState<Model, Filter, Sort>>["setState"],
  controller: ListController<Model, Filter, Sort>
) {
  return {
    ...TABLE_FILTERS_INITIAL_PROPS,
    async getAll(profileFilter: Filter, page = 1) {
      set({ isLoading: true, filters: profileFilter });
      try {
        const orderBy = get().orderBy;
        const filter = new Filters<Filter, Sort>({ page: get().page, size: get().size, item: profileFilter, orderBy });
        const response = await controller.getAll(filter);
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
    },
    async handleDownloadAll() {
      set({ isLoading: true });
      const orderBy = get().orderBy;
      const filter = new Filters<Filter, Sort>({ item: get().filters, orderBy });
      try {
        const response = await controller.export({ filters: filter });
        response.download();
      } finally {
        set({ isLoading: false });
      }
    },
    async handleDeleteSelected(ids: Id[]) {
      set({ isLoading: true });
      try {
        await controller.deleteMany(ids);
      } finally {
        set({ isLoading: false });
      }
      get().getAll(get().filters);
    },
    async handleDownloadSelected(ids: Id[]) {
      set({ isLoading: true });
      try {
        const response = await controller.export({ ids });
        response.download();
      } finally {
        set({ isLoading: false });
      }
    }
  };
}
