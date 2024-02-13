import type { Id } from "@/src/common/utils/types";
import type { CreateProfileModel } from "@/src/core/profile/domain/models/create_profile_model";
import useFormController from "@/src/ui/hooks/useFormController";
import { yupRequiredEmailField, yupRequiredField } from "@/src/ui/utils/yup";
import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useMemo, useState } from "react";

interface FormCreateProfileValues {
  id?: Id;
  name: string;
  surname: string;
  email: string;
}

const formValues: FormCreateProfileValues = {
  id: undefined,
  name: "",
  surname: "",
  email: ""
};

interface Props {
  onSubmitForm: (input: CreateProfileModel) => Promise<void>;
  initialValues?: FormCreateProfileValues;
  id?: Id;
}

const firstNameRequired = yupRequiredField();
const lastNameRequired = yupRequiredField();
const emailRequired = yupRequiredEmailField();

export default function useCreateEditProfileForm({ onSubmitForm, initialValues = formValues, id }: Props) {
  const [firstSubmit] = useState(false);

  const validationSchema = useMemo(
    () =>
      yup.object({
        name: firstNameRequired,
        surname: lastNameRequired,
        email: emailRequired
      }),
    []
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    onSubmit: async (values: FormCreateProfileValues, { setSubmitting }: FormikHelpers<FormCreateProfileValues>) => {
      setSubmitting(false);
      onSubmitForm(values);
    }
  });

  const { isFormEmpty } = useFormController({ formik, id, initialValues });

  return { formSchema: formik, isFormEmpty };
}
