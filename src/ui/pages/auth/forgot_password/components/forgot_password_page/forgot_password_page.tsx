import { Check } from "@/src/ui/assets/icons";
import { InputFormik } from "@/src/ui/components/input/input";
import { yup } from "@front_web_mrmilu/utils";
import { Button } from "@mui/material";
import type { FormikHelpers } from "formik";
import { FormikProvider } from "formik";
import { Form } from "formik";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import AuthStyled from "@/src/ui/pages/auth/components/auth_form/auth_form.styled";

import AuthPage from "@/src/ui/pages/auth/components/auth_page/auth_page";
import AuthFormStyled from "@/src/ui/pages/auth/components/auth_page/auth_page.styled";
import Styled from "./forgot_password_page.styled";
import { yupRequiredEmailField } from "@/src/ui/utils/yup";
import paths from "@/src/ui/router/paths";
import UserController from "@/src/ui/controller/user_controller";

interface FormForgotPasswordValues {
  email: string;
}

const formValues: FormForgotPasswordValues = {
  email: ""
};
const requiredEmaill = yupRequiredEmailField();

export default function ForgotPasswordPage() {
  const { t } = useTranslation("forgot_password");
  const navigate = useNavigate();
  const [firstSubmit] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: requiredEmaill
      }),
    []
  );

  const onForgotPassword = async () => {
    const { values } = formik;
    UserController.forgotPassword(values);
  };

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    onSubmit: async (values: FormForgotPasswordValues, { setSubmitting }: FormikHelpers<FormForgotPasswordValues>) => {
      setSubmitting(false);
      handleForgotPassword();
    }
  });

  const handleForgotPassword = async () => {
    await onForgotPassword();
    setForgotPasswordSuccess(true);
  };

  const onAccept = () => {
    navigate(paths.auth.login);
  };

  return (
    <AuthPage>
      <AuthStyled.AuthForm>
        {!forgotPasswordSuccess ? (
          <FormikProvider value={formik}>
            <h1>{t("title")}</h1>
            <p>{t("subTitle")}</p>
            <Form>
              <InputFormik name="email" label={t("form.fields.email.placeholder")} data-cy="login-username" />
              <Styled.ButtonWrapper>
                <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
                  {t("form.submit")}
                </Button>
              </Styled.ButtonWrapper>
            </Form>
            <AuthFormStyled.AuthFormFooter>
              <p>{t("footer.supportMsg")}</p>
              <Link to={paths.auth.login}>{t("footer.signIn")}</Link>
            </AuthFormStyled.AuthFormFooter>
          </FormikProvider>
        ) : (
          <Styled.Success>
            <Check />
            <h1>{t("success.title")}</h1>
            <p>{t("success.recived")}</p>
            <p>{t("success.send")}</p>
            <Styled.ButtonWrapper>
              <Button type="submit" variant="contained" disabled={formik.isSubmitting} onClick={onAccept}>
                {t("success.accept")}
              </Button>
            </Styled.ButtonWrapper>
          </Styled.Success>
        )}
      </AuthStyled.AuthForm>
    </AuthPage>
  );
}
