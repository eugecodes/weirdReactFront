import type { AtLeast, Id } from "@/src/common/utils/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IRateTypeRepository } from "@/src/core/rate_type/domain/interfaces/i_rate_type_repository";
import type { PatchRateTypeModel } from "@/src/core/rate_type/domain/models/patch_rate_type_model";

@injectable()
export class PatchRateTypeUseCase {
  @inject(TYPES.IRateTypeRepository) private readonly provider!: IocProvider<IRateTypeRepository>;

  async execute(input: AtLeast<PatchRateTypeModel, "id">) {
    const repository = await this.provider();
    return repository.patchRateType(input);
  }

  async delete(id: Id) {
    const repository = await this.provider();
    return repository.deleteRateType(id);
  }

  async toggleEnable(id: Id, newActiveValue: boolean) {
    const repository = await this.provider();
    return repository.patchRateType({ id, enabled: newActiveValue });
  }
}
