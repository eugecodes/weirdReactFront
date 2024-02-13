import type { CreateContactModel } from "@/src/core/contact/domain/models/create_contact_model";
import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import useFormController from "@/src/ui/hooks/useFormController";
import type { Id } from "@/src/common/utils/types";
import { removeNullishValuesFromAnObject } from "@/src/common/utils";
import type { ObjectShape } from "yup/lib/object";
import { yupRequiredBoolean, yupRequiredEmailField, yupRequiredField, yupRequiredPhoneField } from "@/src/ui/utils/yup";

export interface FormEditContactValues {
  id?: Id;
  clientId?: Id;
  name: string;
  email: string;
  phone: string;
  isMainContact?: boolean;
}

const formValues: FormEditContactValues = {
  id: undefined,
  clientId: undefined,
  name: "",
  email: "",
  phone: "",
  isMainContact: false
};

const nameRequired = yupRequiredField();
const emailRequired = yupRequiredEmailField();
const phoneRequired = yupRequiredPhoneField();
const isMainContactRequired = yupRequiredBoolean();

interface Props {
  onSubmitForm: (input: CreateContactModel) => Promise<void>;
  initialValues?: FormEditContactValues;
  id?: Id;
  enableReinitialize?: boolean;
}

export default function useCreateContactForm({ onSubmitForm, initialValues = formValues, id, enableReinitialize = false }: Props) {
  const [firstSubmit] = useState(false);

  const validationSchema = useMemo(() => {
    const requiredValues: ObjectShape = {
      name: nameRequired,
      email: emailRequired,
      phone: phoneRequired,
      isMainContact: isMainContactRequired
    };

    return yup.object().shape(requiredValues);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    enableReinitialize,
    onSubmit: async (values: FormEditContactValues, { setSubmitting }: FormikHelpers<FormEditContactValues>) => {
      setSubmitting(false);
      await onSubmitForm(removeNullishValuesFromAnObject(values) as CreateContactModel);
    }
  });

  const { isFormEmpty } = useFormController({ formik, id, initialValues });

  return { formSchema: formik, isFormEmpty };
}
