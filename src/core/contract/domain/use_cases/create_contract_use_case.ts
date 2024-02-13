import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IContractRepository } from "@/src/core/contract/domain/interfaces/i_contract_repository";
import type { CreateContractModel } from "@/src/core/contract/domain/models/create_contract_model";

@injectable()
export class CreateContractUseCase {
  @inject(TYPES.IContractRepository) private readonly provider!: IocProvider<IContractRepository>;

  async execute(input: CreateContractModel) {
    const repository = await this.provider();
    return repository.create(input);
  }
}
