import type { AtLeast, Id } from "@/src/common/utils/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IEnergyCostRepository } from "@/src/core/energy_cost/domain/interfaces/i_energy_cost_repository";
import type { PatchEnergyCostModel } from "@/src/core/energy_cost/domain/models/patch_energy_cost_model";

@injectable()
export class PatchEnergyCostUseCase {
  @inject(TYPES.IEnergyCostRepository) private readonly provider!: IocProvider<IEnergyCostRepository>;

  async execute(input: AtLeast<PatchEnergyCostModel, "id">) {
    const repository = await this.provider();
    return repository.patchEnergyCost(input);
  }

  async delete(id: Id) {
    const repository = await this.provider();
    return repository.deleteEnergyCost(id);
  }

  async toggleEnable(id: Id, newActiveValue: boolean) {
    const repository = await this.provider();
    return repository.patchEnergyCost({ id, enabled: newActiveValue });
  }
}
