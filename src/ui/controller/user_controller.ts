import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { ChangePasswordModel } from "@/src/core/user/domain/models/change_password_model";
import type { ForgotPasswordModel } from "@/src/core/user/domain/models/forgot_password_model";
import type { LoginModel } from "@/src/core/user/domain/models/login_model";
import type { ResetPasswordModel } from "@/src/core/user/domain/models/reset_password_model";
import type { ForgotPasswordUseCase } from "@/src/core/user/domain/use_cases/forgot_password_use_case";
import type { LoginUseCase } from "@/src/core/user/domain/use_cases/login_use_case";
import type { LogoutUseCase } from "@/src/core/user/domain/use_cases/logout_use_case";
import type { MeUseCase } from "@/src/core/user/domain/use_cases/me_use_case";
import type { ResetPasswordUseCase } from "@/src/core/user/domain/use_cases/reset_password_use_case";

export default class UserController {
  static async me() {
    try {
      const meUserCase = await locator.get<IocProvider<MeUseCase>>(TYPES.MeUseCase)();
      return await meUserCase.execute();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async logout() {
    const logoutUseCase = await locator.get<IocProvider<LogoutUseCase>>(TYPES.LogoutUseCase)();
    await logoutUseCase.execute();
  }

  static async login(values: LoginModel) {
    const loginUseCase = await locator.get<IocProvider<LoginUseCase>>(TYPES.LoginUseCase)();
    const session = await loginUseCase.execute(values);
    return session;
  }

  static async resetPassword(values: ResetPasswordModel) {
    const resetPasswordUseCase = await locator.get<IocProvider<ResetPasswordUseCase>>(TYPES.ResetPasswordUseCase)();

    await resetPasswordUseCase.execute(values);
  }

  static async changePassword(values: ChangePasswordModel) {
    const resetPasswordUseCase = await locator.get<IocProvider<ResetPasswordUseCase>>(TYPES.ResetPasswordUseCase)();
    await resetPasswordUseCase.changePassword(values);
  }

  static async forgotPassword(values: ForgotPasswordModel) {
    try {
      const forgotPasswordUseCase = await locator.get<IocProvider<ForgotPasswordUseCase>>(TYPES.ForgotPasswordUseCase)();
      forgotPasswordUseCase.execute(values);
    } catch (err) {
      console.error(err);
    }
  }
}
