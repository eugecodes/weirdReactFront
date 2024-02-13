import type { ChangePasswordModel } from "@/src/core/user/domain/models/change_password_model";
import type { ResetPasswordModel } from "@/src/core/user/domain/models/reset_password_model";
import ResetPasswordForm from "@/src/ui/components/reset_password_form/reset_password_form";
import UserController from "@/src/ui/controller/user_controller";
import useShowToast from "@/src/ui/hooks/useShowToast";
import { useTranslation } from "react-i18next";
import Styled from "./reset_password_page.styled";
import { withErrorHandler } from "@/src/common/utils/errors";

export default function ResetPassword() {
  const { t } = useTranslation(["reset_password", "common"]);
  const { showToast } = useShowToast();

  const onResetPassword = async (formData: ChangePasswordModel | ResetPasswordModel) => {
    await withErrorHandler(UserController.changePassword(formData as ChangePasswordModel));
    showToast({ message: t("reset_password:passwordReseted") });
  };

  return (
    <Styled.FormWrapper>
      <ResetPasswordForm
        onSubmitForm={onResetPassword}
        isUserLogedIn
        title={t("reset_password:changePasswordTitle")}
        subtitle={t("reset_password:changePasswordSubitle")}
        submitText={t("reset_password:changePasswordSubmit")}
      />
    </Styled.FormWrapper>
  );
}
