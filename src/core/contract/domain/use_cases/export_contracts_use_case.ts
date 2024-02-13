import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IContractRepository } from "@/src/core/contract/domain/interfaces/i_contract_repository";
import type { FilterContractModel } from "@/src/core/contract/domain/models/filter_contract_model";
import type { SortContract } from "@/src/core/contract/domain/interfaces/sort_contract";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

@injectable()
export class ExportContractsUseCase {
  @inject(TYPES.IContractRepository) private readonly provider!: IocProvider<IContractRepository>;

  async execute(filter: ExportArgumentsModel<FilterContractModel, SortContract>) {
    const repository = await this.provider();
    return repository.exportToFile(filter);
  }
}
