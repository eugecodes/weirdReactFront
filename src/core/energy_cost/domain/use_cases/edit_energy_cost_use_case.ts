import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IEnergyCostRepository } from "@/src/core/energy_cost/domain/interfaces/i_energy_cost_repository";
import type { CreateEnergyCostModel } from "@/src/core/energy_cost/domain/models/create_energy_cost_model";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class EditEnergyCostUseCase {
  @inject(TYPES.IEnergyCostRepository) private readonly provider!: IocProvider<IEnergyCostRepository>;

  async execute(input: CreateEnergyCostModel, id: Id) {
    const repository = await this.provider();
    return repository.editEnergyCost(input, id);
  }
}
