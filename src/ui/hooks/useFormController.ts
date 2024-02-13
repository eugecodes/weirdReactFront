import type { Id } from "@/src/common/utils/types";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import type { FormikErrors } from "formik";
import { useMemo } from "react";

interface Props<T extends { id?: Id }> {
  formik: {
    values: T;
    setValues: (values: React.SetStateAction<T>, shouldValidate?: boolean | undefined) => Promise<FormikErrors<T>> | Promise<void>;
  };
  id?: Id;
  initialValues: T;
}

export default function useFormController<T extends { id?: Id }>({ formik, id, initialValues }: Props<T>) {
  const isFormEmpty = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => Object.values(formik.values).reduce((isEmpty, value: any) => isEmpty && (!value || !value.length), true),
    [formik.values]
  );

  useEffectRunOnce(() => {
    if (!isFormEmpty && id !== formik.values.id && initialValues) {
      formik.setValues(initialValues);
    }
  }, [id, initialValues]);

  /* In this case, formik should never be in the useEffect. https://stackoverflow.com/questions/70904217/useformik-cause-too-many-re-renders */
  useEffectRunOnce(() => {
    if (isFormEmpty) {
      formik.setValues(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, isFormEmpty]);

  return {
    isFormEmpty: Boolean(isFormEmpty)
  };
}
