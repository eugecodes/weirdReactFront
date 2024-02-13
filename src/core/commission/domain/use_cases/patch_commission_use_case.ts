import type { AtLeast, Id } from "@/src/common/utils/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { ICommissionRepository } from "@/src/core/commission/domain/interfaces/i_commission_repository";
import type { PatchCommissionModel } from "@/src/core/commission/domain/models/patch_commission_model";

@injectable()
export class PatchCommissionUseCase {
  @inject(TYPES.ICommissionRepository) private readonly provider!: IocProvider<ICommissionRepository>;

  async execute(input: AtLeast<PatchCommissionModel, "id">) {
    const repository = await this.provider();
    return repository.patchCommission(input);
  }

  async delete(id: Id) {
    const repository = await this.provider();
    return repository.deleteCommission(id);
  }
}
