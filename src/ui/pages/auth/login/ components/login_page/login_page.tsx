import { Eye, Hide } from "@/src/ui/assets/icons";
import { InputFormik } from "@/src/ui/components/input/input";
import { yup } from "@front_web_mrmilu/utils";
import { Button } from "@mui/material";
import type { FormikHelpers } from "formik";
import { FormikProvider } from "formik";
import { Form } from "formik";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import AuthStyled from "@/src/ui/pages/auth/components/auth_form/auth_form.styled";
import AuthPage from "@/src/ui/pages/auth/components/auth_page/auth_page";
import Styled from "./login_page.styled";
import { yupRequiredEmailField, yupRequiredField } from "@/src/ui/utils/yup";
import { useUserProvider } from "@/src/ui/provider/user.slice";
import paths from "@/src/ui/router/paths";

interface FormLoginValues {
  email: string;
  password: string;
}

const formValues: FormLoginValues = {
  email: "",
  password: ""
};

const emailRequired = yupRequiredEmailField();
const passwordRequired = yupRequiredField();

export default function LoginPage() {
  const { t } = useTranslation("login");
  const navigate = useNavigate();
  const [readonly, setReadonly] = useState(true);
  const [firstSubmit] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const user = useUserProvider((state) => state.user);
  const login = useUserProvider((state) => state.login);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: emailRequired,
        password: passwordRequired
      }),
    []
  );

  const onLogin = async () => {
    const { resetForm, values } = formik;
    try {
      await login(values);
      setLoginSuccess(true);
      navigate(paths.home);
    } catch (err: unknown) {
      console.error(err);
      resetForm();
      setErrorMessage(t("loginError.badCredentials"));
    }
  };

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    onSubmit: async (values: FormLoginValues, { setSubmitting }: FormikHelpers<FormLoginValues>) => {
      setSubmitting(false);
      handleLogin();
    }
  });

  const handleLogin = async () => {
    await onLogin();
  };

  const onClickIcon = useCallback(() => {
    setIsPasswordShown((prevState) => !prevState);
  }, []);

  useEffect(() => {
    /* This is not the best solution ever but fixes the following bug: https://mrmilu-jira.atlassian.net/browse/VIV-259
      which occurs by the following one: https://github.com/mui/material-ui/issues/35923. 
      The solution is inspired by this one: https://stackoverflow.com/questions/2530/how-do-you-disable-browser-autocomplete-on-web-form-field-input-tags
    */
    setTimeout(() => {
      setReadonly(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (formik.dirty) {
      setErrorMessage("");
    }
  }, [formik.dirty]);

  return (
    <AuthPage>
      <AuthStyled.AuthForm>
        {!loginSuccess ? (
          <FormikProvider value={formik}>
            <h1>{t("loginTitle")}</h1>
            <Form>
              <InputFormik name="email" label={t("loginForm.fields.email.placeholder")} data-cy="login-email" readonly={readonly} />
              <InputFormik
                onClickIcon={onClickIcon}
                type={isPasswordShown ? "text" : "password"}
                name="password"
                label={t("loginForm.fields.password.placeholder")}
                icon={isPasswordShown ? <Hide /> : <Eye />}
                readonly={readonly}
              />
              {errorMessage && <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>}
              <Button type="submit" variant="contained" disabled={formik.isSubmitting} data-cy="login-submit">
                {t("loginForm.submit")}
              </Button>
            </Form>
            <Styled.FormFooter>
              <Link to={paths.auth.forgotPassword} className="forgot-password">
                {t("loginFooter.supportMsg")}
              </Link>
            </Styled.FormFooter>
          </FormikProvider>
        ) : (
          <Styled.SuccessWrapper>
            <h1>{t("loginSuccess.welcomeMsg", { name: user?.name })}</h1>
            <p>{t("loginSuccess.connect")}</p>
          </Styled.SuccessWrapper>
        )}
      </AuthStyled.AuthForm>
    </AuthPage>
  );
}
