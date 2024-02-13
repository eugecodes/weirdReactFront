import type { IAuthRepository } from "@/src/core/user/domain/interfaces/i_auth_repository";
import type { LoginSessionModel } from "@/src/core/user/domain/models/session_model";
import type { LoginModel } from "@/src/core/user/domain/models/login_model";
import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { toJson, fromJson } from "@/src/common/utils/transformers";
import type { ForgotPasswordModel } from "@/src/core/user/domain/models/forgot_password_model";
import type { ResetPasswordModel } from "@/src/core/user/domain/models/reset_password_model";
import type { testApiService } from "@/src/core/app/data/services/test_api_service";
import type { ChangePasswordModel } from "@/src/core/user/domain/models/change_password_model";
import { LoginSessionDataModel } from "@/src/core/user/data/models/login_session_data_model";
import { ResetPasswordDataModel } from "@/src/core/user/data/models/reset_password_data_model";
import type { UserModel } from "@/src/core/user/domain/models/user_model";
import { UserDataModel } from "@/src/core/user/data/models/user_data_model";

@injectable()
export class AuthRepository implements IAuthRepository {
  @inject(TYPES.testApiService) private apiServiceProvider!: IocProvider<testApiService>;

  baseUrl = "/api/users";

  async login(input: LoginModel): Promise<LoginSessionModel> {
    const apiService = await this.apiServiceProvider();
    const data = toJson(input);
    const response = await apiService.post(this.baseUrl + "/login", { data });
    const responseAsData = fromJson(LoginSessionDataModel, response);
    const session = responseAsData.toDomain();
    return session;
  }
  async logout(): Promise<void> {
    const apiService = await this.apiServiceProvider();
    await apiService.post(this.baseUrl + "/logout");
  }

  async forgotPassword(data: ForgotPasswordModel): Promise<void> {
    const apiService = await this.apiServiceProvider();
    await apiService.post(this.baseUrl + "/forgot-password", { data });
  }

  async resetPassword(input: ResetPasswordModel): Promise<void> {
    const dataModel = new ResetPasswordDataModel();
    dataModel.fromDomain(input);
    const data = toJson(dataModel);
    const apiService = await this.apiServiceProvider();
    await apiService.post(this.baseUrl + "/reset-password", { data });
  }

  async changePassword(data: ChangePasswordModel): Promise<void> {
    const apiService = await this.apiServiceProvider();
    await apiService.post(this.baseUrl + "/change-password", { data });
  }

  async me(): Promise<UserModel> {
    const service = await this.apiServiceProvider();
    const response = await service.get(this.baseUrl + "/me");
    return fromJson(UserDataModel, response).toDomain();
  }
}
