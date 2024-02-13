import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IClientRepository } from "@/src/core/client/domain/interfaces/i_client_repository";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class GetClientDetailUseCase {
  @inject(TYPES.IClientRepository) private readonly provider!: IocProvider<IClientRepository>;

  async execute(rateTypeId: Id) {
    const repository = await this.provider();
    return repository.detailClient(rateTypeId);
  }
}
