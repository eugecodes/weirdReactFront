import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import useFormController from "@/src/ui/hooks/useFormController";
import type { Id } from "@/src/common/utils/types";
import { removeNullishValuesFromAnObject } from "@/src/common/utils";
import type { ObjectShape } from "yup/lib/object";
import { yupRequiredField } from "@/src/ui/utils/yup";
import type { ContractStatus } from "@/src/core/app/enums/contract_status";
import type { PatchContractModel } from "@/src/core/contract/domain/models/patch_contract_model";

export interface FormEditStatusContractValues {
  id?: Id;
  status?: ContractStatus;
  statusMessage?: string;
}

const formValues: FormEditStatusContractValues = {
  id: undefined,
  status: undefined,
  statusMessage: ""
};

const required = yupRequiredField();

interface Props {
  onSubmitForm: (input: PatchContractModel) => Promise<void>;
  initialValues?: FormEditStatusContractValues;
  id?: Id;
  enableReinitialize?: boolean;
}

export default function useEditStatusContractForm({ onSubmitForm, initialValues = formValues, id, enableReinitialize = false }: Props) {
  const [firstSubmit] = useState(false);

  const validationSchema = useMemo(() => {
    const requiredValues: ObjectShape = {
      status: required
    };

    return yup.object().shape(requiredValues);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    enableReinitialize,
    onSubmit: async (values: FormEditStatusContractValues, { setSubmitting }: FormikHelpers<FormEditStatusContractValues>) => {
      setSubmitting(false);
      await onSubmitForm(removeNullishValuesFromAnObject(values) as PatchContractModel);
    }
  });

  const { isFormEmpty } = useFormController({ formik, id, initialValues });

  return { formSchema: formik, isFormEmpty };
}
