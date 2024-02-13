import { inject, injectable } from "inversify";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { ForgotPasswordModel } from "@/src/core/user/domain/models/forgot_password_model";
import type { IAuthRepository } from "@/src/core/user/domain/interfaces/i_auth_repository";

@injectable()
export class ForgotPasswordUseCase {
  @inject(TYPES.IAuthRepository) private readonly provider!: IocProvider<IAuthRepository>;

  async execute(input: ForgotPasswordModel) {
    const repository = await this.provider();
    return repository.forgotPassword(input);
  }
}
