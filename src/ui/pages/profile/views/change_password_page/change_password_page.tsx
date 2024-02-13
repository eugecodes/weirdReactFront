import type { ChangePasswordModel } from "@/src/core/user/domain/models/change_password_model";
import type { ResetPasswordModel } from "@/src/core/user/domain/models/reset_password_model";
import { Assignment, Copy, Eye, Hide } from "@/src/ui/assets/icons";
import Alert from "@/src/ui/components/alert/alert";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import { InputFormik } from "@/src/ui/components/input/input";
import PasswordChecker from "@/src/ui/components/password_checker/password_checker";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import useShowToast from "@/src/ui/hooks/useShowToast";
import { Button, IconButton } from "@mui/material";
import { Form, FormikProvider } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ProfileController from "@/src/ui/pages/profile/controllers/profile_controller";
import useResetPasswordController from "@/src/ui/pages/profile/controllers/reset_password_controller";
import { useMutationProfileProvider } from "@/src/ui/pages/profile/provider/mutation_profile.provider";
import Styled from "./change_password_page.styled";

export default function ChangePasswordPage() {
  const { t } = useTranslation(["reset_password", "common"]);
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const { showToast } = useShowToast();
  const getProfileById = useMutationProfileProvider((state) => state.getById);
  const profile = useMutationProfileProvider((state) => state.item);

  const onSubmitForm = useCallback(
    async (input: ResetPasswordModel | ChangePasswordModel) => {
      try {
        const password = (input as ResetPasswordModel).password;
        await ProfileController.changePassword(Number(profileId), password);
        showToast({ message: t("reset_password:passwordReseted") });
        navigate(-1);
      } catch (e) {
        console.error(e);
        showToast({ message: t("common:errors.default"), variant: "error" });
      }
    },
    [profileId, navigate, showToast, t]
  );

  const { formSchema, isFormEmpty } = useResetPasswordController({ onSubmitForm, showCurrentPasswordInput: false });
  const { showModal, onCloseModal, onCancel, cancelAction } = useCancelButton({ condition: isFormEmpty });

  const onClickPasswordIcon = useCallback(() => {
    setIsPasswordShown((prevState) => !prevState);
  }, []);

  const onClickConfirmPasswordIcon = useCallback(() => {
    setIsConfirmPasswordShown((prevState) => !prevState);
  }, []);

  const getProfile = useCallback(async () => {
    if (profileId) {
      const id = Number(profileId);
      await getProfileById(id);
    }
  }, [getProfileById, profileId]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const onCopyPassword = useCallback(() => {
    navigator.clipboard.writeText(formSchema.values.password);
    showToast({ message: t("common:actions.copied") });
  }, [formSchema.values.password, showToast, t]);

  return (
    <>
      <DetailPageHeader
        Icon={Assignment}
        headerText={profile ? profile.fullName() : ""}
        actions={cancelAction}
        showModal={showModal}
        modalPrimaryButtonText={t("common:keepEditing")}
        modalDescription={t("common:cancelDescription")}
        onSecondaryButtonClick={onCancel}
        onPrimaryButtonClick={onCloseModal}
      />
      <Styled.Header>
        <h2>{t("common:auth.changePassword")}</h2>
        <p>{t("reset_password:changePasswordAdminDescription")}</p>
      </Styled.Header>
      <Styled.Alert>
        <Alert text={t("reset_password:changePasswordAlert")} />
      </Styled.Alert>
      <FormikProvider value={formSchema}>
        <Form>
          <Styled.Form>
            <InputFormik
              onClickIcon={onClickPasswordIcon}
              type={isPasswordShown ? "text" : "password"}
              name="password"
              label={t("reset_password:form.fields.password.placeholder")}
              icon={isPasswordShown ? <Hide /> : <Eye />}
            />
            <InputFormik
              onClickIcon={onClickConfirmPasswordIcon}
              type={isConfirmPasswordShown ? "text" : "password"}
              name="confirmPassword"
              label={t("reset_password:form.fields.confirmPassword.placeholder")}
              icon={isConfirmPasswordShown ? <Hide /> : <Eye />}
            />
            <IconButton onClick={onCopyPassword}>
              <img alt={t("common:actions.copy")} src={Copy} />
            </IconButton>
          </Styled.Form>
          <Styled.PasswordCheckerWrapper>
            <PasswordChecker password={formSchema.values.password} />
          </Styled.PasswordCheckerWrapper>
          <Styled.Button>
            <Button type="submit" variant="contained" disabled={formSchema.isSubmitting || isFormEmpty}>
              {t("common:actions.save")}
            </Button>
          </Styled.Button>
        </Form>
      </FormikProvider>
    </>
  );
}
