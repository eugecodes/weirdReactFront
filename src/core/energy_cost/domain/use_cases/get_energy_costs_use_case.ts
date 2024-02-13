import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { IEnergyCostRepository } from "@/src/core/energy_cost/domain/interfaces/i_energy_cost_repository";
import type { FilterEnergyCostModel } from "@/src/core/energy_cost/domain/models/filter_energy_cost_model";
import type { SortEnergyCost } from "../interfaces/sort_energy_cost";

@injectable()
export class GetEnergyCostsUseCase {
  @inject(TYPES.IEnergyCostRepository) private readonly provider!: IocProvider<IEnergyCostRepository>;

  async execute(input: Filters<FilterEnergyCostModel, SortEnergyCost>) {
    const repository = await this.provider();
    return repository.energyCosts(input);
  }
}
