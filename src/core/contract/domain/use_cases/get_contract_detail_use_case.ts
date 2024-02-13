import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IContractRepository } from "@/src/core/contract/domain/interfaces/i_contract_repository";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class GetContractDetailUseCase {
  @inject(TYPES.IContractRepository) private readonly provider!: IocProvider<IContractRepository>;

  async execute(contractId: Id) {
    const repository = await this.provider();
    return repository.detailContract(contractId);
  }
}
