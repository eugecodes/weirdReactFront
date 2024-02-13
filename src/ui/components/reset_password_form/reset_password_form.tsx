import { Eye, Hide } from "@/src/ui/assets/icons";
import { InputFormik } from "@/src/ui/components/input/input";
import { Button } from "@mui/material";
import { FormikProvider } from "formik";
import { Form } from "formik";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import PasswordChecker from "../password_checker/password_checker";
import Styled from "./reset_password_form.styled";
import type { ResetPasswordModel } from "@/src/core/user/domain/models/reset_password_model";
import type { ChangePasswordModel } from "@/src/core/user/domain/models/change_password_model";
import useResetPasswordController from "../../pages/profile/controllers/reset_password_controller";

interface Props {
  title: string;
  subtitle: string;
  submitText: string;
  isUserLogedIn?: boolean;
  onSubmitForm: (input: ResetPasswordModel | ChangePasswordModel) => Promise<void>;
}

export default function ResetPasswordForm({ title, subtitle, submitText, onSubmitForm, isUserLogedIn = false }: Props) {
  const { t } = useTranslation("reset_password");
  const { formSchema } = useResetPasswordController({ onSubmitForm, showCurrentPasswordInput: isUserLogedIn });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isCurrentPasswordShown, setIsCurrentPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);

  const onClickPasswordIcon = useCallback(() => {
    setIsPasswordShown((prevState) => !prevState);
  }, []);

  const onClickCurrentPasswordIcon = useCallback(() => {
    setIsCurrentPasswordShown((prevState) => !prevState);
  }, []);

  const onClickConfirmPasswordIcon = useCallback(() => {
    setIsConfirmPasswordShown((prevState) => !prevState);
  }, []);

  return (
    <>
      <FormikProvider value={formSchema}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <Form>
          {isUserLogedIn && (
            <>
              <InputFormik
                onClickIcon={onClickCurrentPasswordIcon}
                type={isCurrentPasswordShown ? "text" : "password"}
                name="currentPassword"
                label={t("form.fields.currentPassword.placeholder")}
                icon={isCurrentPasswordShown ? <Hide /> : <Eye />}
              />
              <Styled.ChangePasswordText>
                <p>{t("changePassowrdText")}</p>
              </Styled.ChangePasswordText>
            </>
          )}
          <InputFormik
            onClickIcon={onClickPasswordIcon}
            type={isPasswordShown ? "text" : "password"}
            name="password"
            label={t("form.fields.password.placeholder")}
            icon={isPasswordShown ? <Hide /> : <Eye />}
          />
          <InputFormik
            onClickIcon={onClickConfirmPasswordIcon}
            type={isConfirmPasswordShown ? "text" : "password"}
            name="confirmPassword"
            label={t("form.fields.confirmPassword.placeholder")}
            icon={isConfirmPasswordShown ? <Hide /> : <Eye />}
          />
          <Styled.ButtonWrapper>
            <Button type="submit" variant="contained" disabled={formSchema.isSubmitting}>
              {submitText}
            </Button>
          </Styled.ButtonWrapper>
        </Form>
      </FormikProvider>
      <PasswordChecker password={formSchema.values.password} />
    </>
  );
}
