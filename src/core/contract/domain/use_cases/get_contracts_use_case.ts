import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { IContractRepository } from "@/src/core/contract/domain/interfaces/i_contract_repository";
import type { FilterContractModel } from "@/src/core/contract/domain/models/filter_contract_model";
import type { SortContract } from "../interfaces/sort_contract";

@injectable()
export class GetContractsUseCase {
  @inject(TYPES.IContractRepository) private readonly provider!: IocProvider<IContractRepository>;

  async execute(input: Filters<FilterContractModel, SortContract>) {
    const repository = await this.provider();
    return repository.contracts(input);
  }
}
