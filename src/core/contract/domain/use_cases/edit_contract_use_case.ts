import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IContractRepository } from "@/src/core/contract/domain/interfaces/i_contract_repository";
import type { Id } from "@/src/common/utils/types";
import type { EditContractModel } from "@/src/core/contract/domain/models/edit_contract_model";

@injectable()
export class EditContractUseCase {
  @inject(TYPES.IContractRepository) private readonly provider!: IocProvider<IContractRepository>;

  async execute(input: EditContractModel, id: Id) {
    const repository = await this.provider();
    return repository.editContract(input, id);
  }
}
