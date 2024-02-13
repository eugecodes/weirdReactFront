import type { Id } from "@/src/common/utils/types";
import type { Order, OrderBy } from "@/src/core/app/domain/models/order";
import { ASCENDING, DESCENDING } from "@/src/core/app/domain/models/order";
import { useCallback } from "react";
import { useState } from "react";
import type { IColumn, Key } from "../types";
import { Skeleton, TableCell, TableRow } from "@mui/material";
import { DETAIL_PAGE_PATH } from "@/src/ui/router/paths";
import { useNavigate } from "react-router-dom";

interface Props<T extends Key> {
  rows: T[];
  columns: Array<IColumn<T>>;
  onChangePage: (newPage: number) => void;
  onChangeRowsPerPage: (newRows: number) => void;
  rowsPerPage: number;
  onChangeSort: (newSortBy: OrderBy<T>) => void;
  sortBy?: OrderBy<T>;
}

export default function useTableUtils<T extends Key>({
  rows,
  columns,
  onChangePage,
  onChangeRowsPerPage,
  rowsPerPage,
  onChangeSort,
  sortBy
}: Props<T>) {
  const [selected, setSelected] = useState<Id[]>([]);
  const navigate = useNavigate();

  const handleRequestSort = useCallback(
    (property: keyof T) => {
      if (!sortBy) {
        return;
      }
      const actualOrder = sortBy[property];
      let sort: Record<keyof T, Order | undefined>;

      if (actualOrder) {
        sort = { [property]: actualOrder !== ASCENDING ? ASCENDING : DESCENDING } as Record<keyof T, Order | undefined>;
      } else {
        sort = { [property]: ASCENDING } as Record<keyof T, Order | undefined>;
      }

      onChangeSort(sort);
    },
    [onChangeSort, sortBy]
  );

  const handleSelectAllClick = useCallback(() => {
    if (selected.length !== rows.length) {
      setSelected(rows.map((innerItem) => innerItem.id));
      return;
    }
    setSelected([]);
  }, [rows, selected.length]);

  const isSelected = useCallback((item: T) => selected.findIndex((id) => item.id === id) !== -1, [selected]);

  const handleRowClick = useCallback(
    (event: React.MouseEvent<unknown>, selectedItem: T) => {
      const invalidTagsNames = ["svg", "BUTTON", "circle"];
      const tagName = (event.target as HTMLElement).tagName;
      if (invalidTagsNames.includes(tagName)) {
        return;
      }

      if (tagName === "TD") {
        navigate(DETAIL_PAGE_PATH + selectedItem.id);
        return;
      }

      const isAlreadySelected = isSelected(selectedItem);

      if (isAlreadySelected) {
        const selectedItems = selected.filter((id) => id !== selectedItem.id);
        setSelected(selectedItems);
        return;
      }

      const selectedItems = Array.from(selected);
      selectedItems.push(selectedItem.id);
      setSelected(selectedItems);
    },
    [isSelected, selected, navigate]
  );

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      onChangePage(newPage + 1);
    },
    [onChangePage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeRowsPerPage(parseInt(event.target.value, 10));
    },
    [onChangeRowsPerPage]
  );

  const getItem = useCallback(
    (id: Id) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return rows.find((innerItem) => innerItem.id === id)!;
    },
    [rows]
  );

  const renderLoaderRow = useCallback(
    (rowIndex: number) => {
      const cells = [];

      for (let columnIndex = 0; columnIndex <= columns.length; columnIndex++) {
        const cell = (
          <TableCell key={`${rowIndex}_${columnIndex}`}>
            <Skeleton animation="wave" height={25} />
          </TableCell>
        );
        cells.push(cell);
      }

      return cells;
    },
    [columns.length]
  );

  const renderLoader = useCallback(() => {
    const skeletons = [];

    for (let rowIndex = 0; rowIndex < rowsPerPage; rowIndex++) {
      const row = <TableRow key={rowIndex}>{renderLoaderRow(rowIndex)}</TableRow>;
      skeletons.push(row);
    }

    return skeletons;
  }, [rowsPerPage, renderLoaderRow]);

  return {
    handleRequestSort,
    handleSelectAllClick,
    handleRowClick,
    handleChangePage,
    handleChangeRowsPerPage,
    isSelected,
    getItem,
    renderLoader,
    selected
  };
}
