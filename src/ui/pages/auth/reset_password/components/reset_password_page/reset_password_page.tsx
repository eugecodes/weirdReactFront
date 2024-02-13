import { withErrorHandler } from "@/src/common/utils/errors";
import type { ChangePasswordModel } from "@/src/core/user/domain/models/change_password_model";
import { ResetPasswordModel } from "@/src/core/user/domain/models/reset_password_model";
import ResetPasswordForm from "@/src/ui/components/reset_password_form/reset_password_form";
import UserController from "@/src/ui/controller/user_controller";
import Styled from "@/src/ui/pages/auth/components/auth_form/auth_form.styled";
import AuthPage from "@/src/ui/pages/auth/components/auth_page/auth_page";
import paths from "@/src/ui/router/paths";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function ResetPasswordPage() {
  const { t } = useTranslation("reset_password");
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onResetPassword = async (input: ResetPasswordModel | ChangePasswordModel) => {
    const token = searchParams.get("token");
    const timestamp = searchParams.get("timestamp")?.replace("/", "");
    if (token && timestamp) {
      const password = (input as ResetPasswordModel).password;
      const data = new ResetPasswordModel({ password, userId: Number(userId), token: token, timestamp: timestamp });
      await withErrorHandler(UserController.resetPassword(data));
      navigate(paths.auth.login);
    }
  };
  return (
    <AuthPage>
      <Styled.AuthForm>
        <ResetPasswordForm
          onSubmitForm={onResetPassword}
          isUserLogedIn={false}
          title={t("title")}
          subtitle={t("subtitle")}
          submitText={t("form.submit")}
        />
      </Styled.AuthForm>
    </AuthPage>
  );
}
