import { inject, injectable } from "inversify";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IAuthRepository } from "@/src/core/user/domain/interfaces/i_auth_repository";
import type { ResetPasswordModel } from "@/src/core/user/domain/models/reset_password_model";
import type { ChangePasswordModel } from "@/src/core/user/domain/models/change_password_model";

@injectable()
export class ResetPasswordUseCase {
  @inject(TYPES.IAuthRepository) private readonly provider!: IocProvider<IAuthRepository>;

  async execute(input: ResetPasswordModel) {
    const repository = await this.provider();
    return repository.resetPassword(input);
  }

  async changePassword(input: ChangePasswordModel) {
    const repository = await this.provider();
    return repository.changePassword(input);
  }
}
