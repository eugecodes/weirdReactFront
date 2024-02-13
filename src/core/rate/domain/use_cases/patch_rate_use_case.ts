import type { AtLeast, Id } from "@/src/common/utils/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IRateRepository } from "@/src/core/rate/domain/interfaces/i_rate_repository";
import type { PatchRateModel } from "@/src/core/rate/domain/models/patch_rate_model";

@injectable()
export class PatchRateUseCase {
  @inject(TYPES.IRateRepository) private readonly provider!: IocProvider<IRateRepository>;

  async execute(input: AtLeast<PatchRateModel, "id">) {
    const repository = await this.provider();
    return repository.patchRate(input);
  }

  async delete(id: Id) {
    const repository = await this.provider();
    return repository.deleteRate(id);
  }

  async toggleEnable(id: Id, newActiveValue: boolean) {
    const repository = await this.provider();
    return repository.patchRate({ id, enabled: newActiveValue });
  }
}
