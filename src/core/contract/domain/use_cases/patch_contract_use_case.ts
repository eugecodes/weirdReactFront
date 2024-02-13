import type { AtLeast, Id } from "@/src/common/utils/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IContractRepository } from "@/src/core/contract/domain/interfaces/i_contract_repository";
import type { PatchContractModel } from "@/src/core/contract/domain/models/patch_contract_model";

@injectable()
export class PatchContractUseCase {
  @inject(TYPES.IContractRepository) private readonly provider!: IocProvider<IContractRepository>;

  async execute(input: AtLeast<PatchContractModel, "id">) {
    const repository = await this.provider();
    return repository.patchContract(input);
  }

  async delete(id: Id) {
    const repository = await this.provider();
    return repository.deleteContract(id);
  }
}
