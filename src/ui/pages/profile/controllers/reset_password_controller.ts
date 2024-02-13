import type { ChangePasswordModel } from "@/src/core/user/domain/models/change_password_model";
import type { ResetPasswordModel } from "@/src/core/user/domain/models/reset_password_model";
import { yupRequiredField, yupRequiredPasswordField } from "@/src/ui/utils/yup";
import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface FormResetPasswordValues {
  currentPassword?: string;
  password: string;
  confirmPassword: string;
}

const formValues: FormResetPasswordValues = {
  currentPassword: "",
  password: "",
  confirmPassword: ""
};

interface Props {
  onSubmitForm: (input: ResetPasswordModel | ChangePasswordModel) => Promise<void>;
  showCurrentPasswordInput: boolean;
}

const currentPasswordRequired = yupRequiredField();
const passwordRequired = yupRequiredPasswordField();

export default function useResetPasswordController({ onSubmitForm, showCurrentPasswordInput = false }: Props) {
  const { t } = useTranslation("reset_password");
  const [firstSubmit] = useState(false);

  const onSubmit = useCallback(
    async (values: FormResetPasswordValues, { setSubmitting }: FormikHelpers<FormResetPasswordValues>) => {
      setSubmitting(false);
      let valuesToSubmit = {};
      if (!showCurrentPasswordInput) {
        onSubmitForm({ password: values.password } as ResetPasswordModel);
      } else {
        valuesToSubmit = { old_password: values.currentPassword, new_password: values.password };
        onSubmitForm(valuesToSubmit as ChangePasswordModel);
      }
    },
    [onSubmitForm, showCurrentPasswordInput]
  );

  const validationSchema = useMemo(() => {
    if (showCurrentPasswordInput) {
      return yup.object({
        currentPassword: currentPasswordRequired,
        password: passwordRequired,
        confirmPassword: yup
          .string()
          .required(t("form.errors.required"))
          .test("password.notMatch", t("form.errors.password.notMatch"), (value, context) => value === context.parent.password)
      });
    }

    return yup.object({
      password: passwordRequired,
      confirmPassword: yup
        .string()
        .required(t("form.errors.required"))
        .test("password.notMatch", t("form.errors.password.notMatch"), (value, context) => value === context.parent.password)
    });
  }, [t, showCurrentPasswordInput]);

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    onSubmit
  });

  const isFormEmpty = useMemo(() => Object.values(formik.values).reduce((isEmpty, value) => isEmpty && !value.length, true), [formik.values]);

  return { formSchema: formik, isFormEmpty };
}
