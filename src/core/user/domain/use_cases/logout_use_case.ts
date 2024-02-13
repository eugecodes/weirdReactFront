import { inject, injectable } from "inversify";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IAuthRepository } from "@/src/core/user/domain/interfaces/i_auth_repository";
import type { IAuthTokenService } from "@/src/core/app/domain/interfaces/i_auth_token_service";

@injectable()
export class LogoutUseCase {
  @inject(TYPES.IAuthRepository) private readonly authRepositoryProvider!: IocProvider<IAuthRepository>;
  @inject(TYPES.IAuthTokenService) private authTokenServiceProvider!: IocProvider<IAuthTokenService>;

  async execute() {
    const [repository, authTokenService] = await Promise.all([this.authRepositoryProvider(), this.authTokenServiceProvider()]);
    await repository.logout();
    authTokenService.remove();
  }
}
