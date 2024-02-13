import type { AtLeast, Id } from "@/src/common/utils/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { ICostRepository } from "@/src/core/cost/domain/interfaces/i_cost_repository";
import type { PatchCostModel } from "@/src/core/cost/domain/models/patch_cost_model";

@injectable()
export class PatchCostUseCase {
  @inject(TYPES.ICostRepository) private readonly provider!: IocProvider<ICostRepository>;

  async execute(input: AtLeast<PatchCostModel, "id">) {
    const repository = await this.provider();
    return repository.patchCost(input);
  }

  async delete(id: Id) {
    const repository = await this.provider();
    return repository.deleteCost(id);
  }

  async toggleEnable(id: Id, newActiveValue: boolean) {
    const repository = await this.provider();
    return repository.patchCost({ id, enabled: newActiveValue });
  }
}
