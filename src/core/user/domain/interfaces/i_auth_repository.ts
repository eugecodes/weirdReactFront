import type { LoginModel } from "@/src/core/user/domain/models/login_model";
import type { ResetPasswordModel } from "@/src/core/user/domain/models/reset_password_model";
import type { ForgotPasswordModel } from "@/src/core/user/domain/models/forgot_password_model";
import type { LoginSessionModel } from "@/src/core/user/domain/models/session_model";
import type { ChangePasswordModel } from "@/src/core/user/domain/models/change_password_model";
import type { UserModel } from "../models/user_model";

export interface IAuthRepository {
  login(input: LoginModel): Promise<LoginSessionModel>;
  logout(): Promise<void>;
  forgotPassword(input: ForgotPasswordModel): Promise<void>;
  resetPassword(input: ResetPasswordModel): Promise<void>;
  changePassword(input: ChangePasswordModel): Promise<void>;
  me(): Promise<UserModel>;
}
