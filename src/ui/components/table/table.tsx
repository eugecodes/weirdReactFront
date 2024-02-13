import Box from "@mui/material/Box";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { DESCENDING } from "@/src/core/app/domain/models/order";
import { PAGINATION_SIZES } from "@/src/common/utils/table";
import Styled from "./table.styled";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Download } from "../../assets/icons";
import { useTranslation } from "react-i18next";
import { emptyFunction, fromValueToString } from "@/src/common/utils";
import IconWithTooltip from "../icon_with_tooltip/icon_with_tooltip";
import type { EnhancedTableProps, Key, TableProps } from "./types";
import { ElementActions } from "./element_actions";
import useTableUtils from "./hooks/useTable";
import { useMemo } from "react";

export default function Table<T extends Key>({
  rows,
  columns,
  headCells,
  actions,
  tableTitle,
  isClearFiltersButtonDisabled = false,
  onResetFilters = emptyFunction,
  onChangePage = emptyFunction,
  onChangeRowsPerPage = emptyFunction,
  totalItems,
  page,
  rowsPerPage,
  isLoading = false,
  onChangeSort = emptyFunction,
  sortBy,
  handleDownloadAll = emptyFunction,
  handleDownloadSelected = emptyFunction,
  handleDeleteSelected = emptyFunction
}: TableProps<T>) {
  const { t } = useTranslation("common");

  const {
    handleRequestSort,
    selected,
    isSelected,
    handleSelectAllClick,
    renderLoader,
    handleRowClick,
    getItem,
    handleChangePage,
    handleChangeRowsPerPage
  } = useTableUtils({ onChangeSort, sortBy, rows, columns, onChangePage, onChangeRowsPerPage, rowsPerPage });

  return (
    <Box>
      <Styled.Table>
        <MuiTable aria-labelledby={tableTitle || "tableTitle"}>
          <EnhancedTableHead
            selected={selected}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={headCells}
            isClearFiltersButtonDisabled={isClearFiltersButtonDisabled}
            onResetFilters={onResetFilters}
            sortBy={sortBy}
            handleDownloadAll={handleDownloadAll}
            handleDownloadSelected={handleDownloadSelected}
            handleDeleteSelected={handleDeleteSelected}
          />
          <TableBody>
            {isLoading
              ? renderLoader()
              : rows.map((row) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${row.id || 0}`;

                  return (
                    <Styled.Row
                      hover
                      onClick={(event) => handleRowClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId
                          }}
                        />
                      </TableCell>
                      {columns.map((column) => {
                        const value = row[column.key];
                        const valueAsString = fromValueToString(value);

                        const key = row.id + "-" + String(column.key);
                        return column.render ? (
                          <Styled.CellWrapper key={key}>{column.render(value, getItem(row.id))}</Styled.CellWrapper>
                        ) : (
                          <Styled.CellWrapper key={key}>
                            <Tooltip title={valueAsString}>
                              <Styled.TextCell>{valueAsString}</Styled.TextCell>
                            </Tooltip>
                          </Styled.CellWrapper>
                        );
                      })}
                      <ElementActions selectedItem={getItem(row.id)} actions={actions} />
                    </Styled.Row>
                  );
                })}
          </TableBody>
        </MuiTable>
      </Styled.Table>
      {rows.length || isLoading ? (
        <TablePagination
          rowsPerPageOptions={PAGINATION_SIZES}
          component="div"
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        <Styled.NoResultsText>{t("table.empty")}</Styled.NoResultsText>
      )}
    </Box>
  );
}

const NUMBER_SELECTED_ACTIONS = 2;

function EnhancedTableHead<T>({
  onSelectAllClick,
  selected,
  rowCount,
  onRequestSort,
  headCells,
  sortBy,
  handleDownloadAll,
  isLoading,
  handleDeleteSelected,
  handleDownloadSelected,
  isClearFiltersButtonDisabled,
  onResetFilters
}: EnhancedTableProps<T>) {
  const { t } = useTranslation("common");
  const numSelected = useMemo(() => selected.length, [selected]);

  return (
    <Styled.TableHead>
      <TableRow>
        <Styled.TheadCell />
        {headCells.map((headCell) => {
          const headCellFromSortBy = sortBy ? sortBy[headCell.key] : undefined;
          const isActive = !!headCellFromSortBy;
          const direction = headCellFromSortBy;
          return (
            <Styled.TheadCell key={headCell.label}>
              <TableSortLabel active={isActive} direction={direction} onClick={() => onRequestSort(headCell.key)}>
                {headCell.label}
                {isActive ? (
                  <Box component="span" sx={visuallyHidden}>
                    {direction === DESCENDING ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </Styled.TheadCell>
          );
        })}
        <Styled.TheadCell />
      </TableRow>
      <TableRow>
        <Styled.TheadCell>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount && rowCount > 0}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all"
            }}
          />
        </Styled.TheadCell>
        {headCells.map((cell) => (
          <Styled.FilterCell key={cell.label}>{cell.filterElement ? cell.filterElement : null}</Styled.FilterCell>
        ))}
        <Styled.TheadCell>
          <Button variant="text" disabled={isClearFiltersButtonDisabled} onClick={onResetFilters}>
            {t("table.clean")}
          </Button>
        </Styled.TheadCell>
      </TableRow>
      <TableRow>
        {Boolean(numSelected) && (
          <>
            <Styled.SelectedActions colSpan={NUMBER_SELECTED_ACTIONS + 1}>
              <span>{t("table.selected", { count: numSelected })}</span>
              <IconButton onClick={() => handleDeleteSelected(selected)} disabled={isLoading}>
                <IconWithTooltip tooltip={t("table.deleteSelected")}>
                  <Delete />
                </IconWithTooltip>
              </IconButton>
              <IconButton onClick={() => handleDownloadSelected(selected)} disabled={isLoading}>
                <IconWithTooltip tooltip={t("table.downloadSelected")}>
                  <Download />
                </IconWithTooltip>
              </IconButton>
            </Styled.SelectedActions>
          </>
        )}
        <TableCell colSpan={Boolean(numSelected) ? headCells.length - NUMBER_SELECTED_ACTIONS : headCells.length + 1} />
        <Styled.IconCell>
          <IconButton onClick={handleDownloadAll} disabled={isLoading}>
            <IconWithTooltip tooltip={t("table.downloadAll")}>
              <Download />
            </IconWithTooltip>
          </IconButton>
        </Styled.IconCell>
      </TableRow>
    </Styled.TableHead>
  );
}
