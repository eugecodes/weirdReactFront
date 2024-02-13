import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { CreateEnergyCostModel } from "@/src/core/energy_cost/domain/models/create_energy_cost_model";
import type { IEnergyCostRepository } from "@/src/core/energy_cost/domain/interfaces/i_energy_cost_repository";

@injectable()
export class CreateEnergyCostUseCase {
  @inject(TYPES.IEnergyCostRepository) private readonly provider!: IocProvider<IEnergyCostRepository>;

  async execute(input: CreateEnergyCostModel) {
    const repository = await this.provider();
    return repository.create(input);
  }
}
