import type { EditMarketerModel } from "@/src/core/marketer/domain/models/edit_marketer_model";
import { yupCifField, yupEmailField, yupNumberWithMaxDecimals, yupPositiveNumberWithMaxDecimals, yupRequiredField } from "@/src/ui/utils/yup";
import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import type { AddressModel } from "@/src/core/app/domain/models/address";
import useFormController from "@/src/ui/hooks/useFormController";
import type { Id } from "@/src/common/utils/types";
import { removeNullishValuesFromAnObject } from "@/src/common/utils";

interface FormCreateMarketerValues {
  id?: Id;
  name: string;
  fiscalName?: string;
  cif?: string;
  email?: string;
  fee?: string;
  maxConsume?: string;
  consumeRange?: string;
  address?: AddressModel;
}

const formValues: FormCreateMarketerValues = {
  id: undefined,
  name: "",
  fiscalName: "",
  cif: "",
  email: "",
  fee: "",
  maxConsume: "",
  consumeRange: "",
  address: {
    type: "",
    name: "",
    number: "",
    subdivision: "",
    others: "",
    postalCode: "",
    city: "",
    province: ""
  }
};

interface Props {
  onSubmitForm: (input: EditMarketerModel) => Promise<void>;
  initialValues?: FormCreateMarketerValues;
  id?: Id;
}

const nameRequired = yupRequiredField();
const cifValidator = yupCifField();
const emailValidator = yupEmailField();
const feeValidator = yupNumberWithMaxDecimals(6);
const maxConsumeValidator = yupPositiveNumberWithMaxDecimals(2);

export default function useCreateEditMarketerForm({ onSubmitForm, initialValues = formValues, id }: Props) {
  const [firstSubmit] = useState(false);

  const validationSchema = useMemo(
    () =>
      yup.object({
        name: nameRequired,
        cif: cifValidator,
        email: emailValidator,
        fee: feeValidator,
        maxConsume: maxConsumeValidator
      }),
    []
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    onSubmit: async (values: FormCreateMarketerValues, { setSubmitting }: FormikHelpers<FormCreateMarketerValues>) => {
      setSubmitting(false);
      onSubmitForm(removeNullishValuesFromAnObject({ ...values, maxConsume: Number(values.maxConsume), fee: Number(values.fee) }));
    }
  });

  const { isFormEmpty } = useFormController({ formik, id, initialValues });

  return { formSchema: formik, isFormEmpty };
}
