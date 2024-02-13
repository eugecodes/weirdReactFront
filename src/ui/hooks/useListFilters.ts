import { useCallback, useMemo } from "react";

interface Props<T> {
  formik: {
    dirty: boolean;
    resetForm: () => void;
  };
  orderBy: T;
  setOrderBy(newOrderBy: T): void;
}

export default function useListFilters<T>({ formik, setOrderBy, orderBy }: Props<T>) {
  const isClearButtonDisabled = useMemo(() => !formik.dirty && !Object.keys(orderBy as Record<string, unknown>).length, [formik.dirty, orderBy]);

  const resetFilters = useCallback(() => {
    formik.resetForm();
    setOrderBy({} as T);
  }, [formik, setOrderBy]);

  return {
    resetFilters,
    isClearButtonDisabled
  };
}
