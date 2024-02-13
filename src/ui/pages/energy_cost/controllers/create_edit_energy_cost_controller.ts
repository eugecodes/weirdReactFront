import { removeNullishValuesFromAnObject } from "@/src/common/utils";
import type { Id } from "@/src/common/utils/types";
import type { CreateEnergyCostModel } from "@/src/core/energy_cost/domain/models/create_energy_cost_model";
import useFormController from "@/src/ui/hooks/useFormController";
import { yupRequiredField, yupRequiredPositiveNumberWithMaxDecimals } from "@/src/ui/utils/yup";
import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useMemo, useState } from "react";

interface FormCreateEnergyCostValues {
  id?: Id;
  concept: string;
  amount: number;
}

const formValues: FormCreateEnergyCostValues = {
  id: undefined,
  concept: "",
  amount: 0
};

interface Props {
  onSubmitForm: (input: CreateEnergyCostModel) => Promise<void>;
  initialValues?: FormCreateEnergyCostValues;
  id?: Id;
}

const conceptRequired = yupRequiredField();
const amountRequired = yupRequiredPositiveNumberWithMaxDecimals(6);

export default function useCreateEditEnergyCostForm({ onSubmitForm, initialValues = formValues, id }: Props) {
  const [firstSubmit] = useState(false);

  const validationSchema = useMemo(
    () =>
      yup.object({
        concept: conceptRequired,
        amount: amountRequired
      }),
    []
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    onSubmit: async (values: FormCreateEnergyCostValues, { setSubmitting }: FormikHelpers<FormCreateEnergyCostValues>) => {
      setSubmitting(false);
      onSubmitForm(removeNullishValuesFromAnObject(values));
    }
  });

  const { isFormEmpty } = useFormController({ formik, id, initialValues });

  return { formSchema: formik, isFormEmpty };
}
