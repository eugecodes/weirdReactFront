import { PAGINATION_SIZES } from "@/src/common/utils/table";
import { useCallback, useState } from "react";

export default function usePagination() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(PAGINATION_SIZES[0]);
  const [total, setTotal] = useState(0);

  const onChangePage = useCallback((page: number) => setPage(page), []);
  const onChangeSize = useCallback((size: number) => setSize(size), []);

  return { page, onChangePage, size, onChangeSize, total, setTotal };
}
