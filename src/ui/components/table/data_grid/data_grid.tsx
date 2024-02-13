import type {
  GridColDef,
  GridCellParams,
  GridValidRowModel,
  GridRowModel,
  GridPaginationModel,
  GridSortModel,
  GridInputRowSelectionModel
} from "@mui/x-data-grid";

import Styled from "./data_grid.styled";
import type { Key } from "../types";
import { emptyFunction, emptyFunctionWithReturn, getUUID } from "@/src/common/utils";
import { useCallback, useState } from "react";
import useShowToast from "@/src/ui/hooks/useShowToast";
import { PAGINATION_SIZES } from "@/src/common/utils/table";
import { ASCENDING, DESCENDING, type Order, type OrderBy } from "@/src/core/app/domain/models/order";
import { useTranslation } from "react-i18next";

interface Props<T extends Key> {
  rows: T[];
  columns: GridColDef[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isCellEditable?: (params: GridCellParams<any, GridValidRowModel, any>) => boolean;
  onEditRow?: (newRow: GridRowModel, oldRow: GridRowModel) => GridRowModel | Promise<GridRowModel>;
  onChangePage?: (newPage: number) => void;
  page: number;
  onChangePageSize?: (newRows: number) => void;
  pageSize: number;
  totalItems: number;
  isLoading?: boolean;
  onChangeSort?: (newSortBy: OrderBy<T>) => void;
  sortBy?: OrderBy<T>;
  selected: GridInputRowSelectionModel;
  onChangeSelected: (newSelected: T | undefined) => void;
}

export default function DataGrid<T extends Key>({
  rows,
  columns,
  isCellEditable = emptyFunctionWithReturn,
  totalItems,
  onEditRow,
  page,
  pageSize,
  sortBy,
  onChangePageSize = emptyFunction,
  onChangePage = emptyFunction,
  onChangeSort = emptyFunction,
  onChangeSelected,
  selected
}: Props<T>) {
  const { t } = useTranslation("common");
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const { showErrorToast } = useShowToast();

  const handleProcessRowUpdateError = useCallback(() => {
    showErrorToast({ id: getUUID(), message: "Error updating row" });
  }, [showErrorToast]);

  const onPaginationChange = useCallback(
    (paginationModel: GridPaginationModel) => {
      if (paginationModel.pageSize !== pageSize) {
        onChangePageSize(paginationModel.pageSize);
      }
      // Plus one because the pagination starts at 0
      const newPage = paginationModel.page + 1;
      if (newPage !== page) {
        onChangePage(newPage);
      }
    },
    [onChangePage, onChangePageSize, page, pageSize]
  );

  const handleRequestSort = useCallback(
    (newSortValue: GridSortModel) => {
      if (!sortBy) {
        return;
      }

      const property = newSortValue[0].field as keyof T;
      const actualOrder = sortBy[property];
      let sort: Record<keyof T, Order | undefined>;

      if (actualOrder) {
        sort = { [property]: actualOrder !== ASCENDING ? ASCENDING : DESCENDING } as Record<keyof T, Order | undefined>;
      } else {
        sort = { [property]: ASCENDING } as Record<keyof T, Order | undefined>;
      }

      setSortModel([{ field: newSortValue[0].field, sort: actualOrder !== ASCENDING ? ASCENDING : DESCENDING }]);
      onChangeSort(sort);
    },
    [onChangeSort, sortBy]
  );

  return (
    <Styled.Wrapper>
      <Styled.DataGrid
        rows={rows}
        columns={columns}
        isCellEditable={isCellEditable}
        processRowUpdate={(newRow, oldRow) => (onEditRow ? onEditRow(newRow, oldRow) : newRow)}
        disableColumnMenu
        onProcessRowUpdateError={handleProcessRowUpdateError}
        pageSizeOptions={PAGINATION_SIZES}
        rowCount={totalItems}
        paginationMode="server"
        initialState={{
          pagination: { paginationModel: { pageSize: PAGINATION_SIZES[0] } }
        }}
        onPaginationModelChange={onPaginationChange}
        /* Page - 1 because the component pagination starts at 0 */
        paginationModel={{ pageSize, page: page - 1 }}
        sortModel={sortModel}
        onSortModelChange={handleRequestSort}
        localeText={{
          noRowsLabel: t("table.empty")
        }}
        onRowSelectionModelChange={(selectedIds) => {
          const id = selectedIds[0];
          const selectedRow = rows.find((row) => row.id === id);
          onChangeSelected(selectedRow);
        }}
        rowSelectionModel={selected}
      />
    </Styled.Wrapper>
  );
}
