import { inject, injectable } from "inversify";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { LoginModel } from "@/src/core/user/domain/models/login_model";
import type { IAuthRepository } from "@/src/core/user/domain/interfaces/i_auth_repository";
import type { IAuthTokenService } from "@/src/core/app/domain/interfaces/i_auth_token_service";

@injectable()
export class LoginUseCase {
  @inject(TYPES.IAuthRepository) private readonly authRepositoryProvider!: IocProvider<IAuthRepository>;
  @inject(TYPES.IAuthTokenService) private authTokenServiceProvider!: IocProvider<IAuthTokenService>;

  async execute(input: LoginModel) {
    const repository = await this.authRepositoryProvider();
    const [session, authTokenService] = await Promise.all([repository.login(input), this.authTokenServiceProvider()]);
    authTokenService.set(session.token);
    return session;
  }
}
