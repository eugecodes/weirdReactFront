import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IAuthRepository } from "@/src/core/user/domain/interfaces/i_auth_repository";

@injectable()
export class MeUseCase {
  @inject(TYPES.IAuthRepository) private readonly provider!: IocProvider<IAuthRepository>;

  async execute() {
    const repository = await this.provider();
    return repository.me();
  }
}
