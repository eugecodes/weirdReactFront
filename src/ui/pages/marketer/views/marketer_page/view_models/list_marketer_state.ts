import type { MarketerModel } from "@/src/core/marketer/domain/models/marketer_model";
import type { SortMarketer } from "@/src/core/marketer/domain/interfaces/sort_marketer";
import type { MarketerFilterValues } from "./marketer_filter_values";

export interface ListMarketerState {
  page: number;
  setPage(newPage: number): void;
  isLoading: boolean;
  rows: MarketerModel[];
  size: number;
  setSize(newSize: number): void;
  total: number;
  getAll(filter: MarketerFilterValues): Promise<void>;
  filters: MarketerFilterValues;
  orderBy?: SortMarketer;
  setOrderBy(newOrderBy: SortMarketer): void;
}
