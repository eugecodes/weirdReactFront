import type { Id } from "@/src/common/utils/types";

export interface ListState<Model, Filter, Sort> {
  page: number;
  setPage(newPage: number): void;
  isLoading: boolean;
  rows: Model[];
  size: number;
  setSize(newSize: number): void;
  total: number;
  getAll(filter: Filter, page?: number): Promise<void>;
  filters: Filter;
  orderBy: Sort;
  setOrderBy(newOrderBy: Sort): void;
  handleDownloadSelected(ids: Id[]): Promise<void>;
  handleDeleteSelected(ids: Id[]): Promise<void>;
  handleDownloadAll(): Promise<void>;
}
