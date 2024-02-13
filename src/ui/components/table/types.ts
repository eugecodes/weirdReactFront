import type { Id } from "@/src/common/utils/types";
import type { OrderBy } from "@/src/core/app/domain/models/order";

export interface IColumn<T extends Key> {
  key: keyof T;
  render?: (value: T[keyof T], item: T) => JSX.Element;
}

export interface IAction<T> {
  text?: string;
  onClick: (selectedItem: T) => void;
  render?: (item: T) => JSX.Element;
  isDisabled?: (item: T) => boolean;
  hideButton?: (item: T) => boolean;
}

export interface HeadCell<T> {
  key: keyof T;
  label: string;
  filterElement?: JSX.Element;
}

export type Key = {
  id: Id;
};

export interface TableProps<T extends Key> {
  rows: T[];
  columns: Array<IColumn<T>>;
  headCells: Array<HeadCell<T>>;
  actions: Array<IAction<T>>;
  tableTitle?: string;
  onResetFilters?: () => void;
  isClearFiltersButtonDisabled?: boolean;
  onChangePage?: (newPage: number) => void;
  page: number;
  onChangeRowsPerPage?: (newRows: number) => void;
  rowsPerPage: number;
  totalItems: number;
  isLoading?: boolean;
  onChangeSort?: (newSortBy: OrderBy<T>) => void;
  sortBy?: OrderBy<T>;
  handleDownloadAll?: () => void;
  handleDownloadSelected?: (ids: Id[]) => void;
  handleDeleteSelected?: (ids: Id[]) => void;
}

export interface EnhancedTableProps<T> {
  selected: Id[];
  onRequestSort: (property: keyof T) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  headCells: HeadCell<T>[];
  onResetFilters?: () => void;
  isClearFiltersButtonDisabled?: boolean;
  sortBy?: OrderBy<T>;
  handleDownloadAll: () => void;
  isLoading?: boolean;
  handleDownloadSelected: (ids: Id[]) => void;
  handleDeleteSelected: (ids: Id[]) => void;
}
