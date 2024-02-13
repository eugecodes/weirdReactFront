import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IEnergyCostRepository } from "@/src/core/energy_cost/domain/interfaces/i_energy_cost_repository";
import type { FilterEnergyCostModel } from "@/src/core/energy_cost/domain/models/filter_energy_cost_model";
import type { SortEnergyCost } from "@/src/core/energy_cost/domain/interfaces/sort_energy_cost";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

@injectable()
export class ExportEnergyCostsUseCase {
  @inject(TYPES.IEnergyCostRepository) private readonly provider!: IocProvider<IEnergyCostRepository>;

  async execute(filter: ExportArgumentsModel<FilterEnergyCostModel, SortEnergyCost>) {
    const repository = await this.provider();
    return repository.exportToFile(filter);
  }
}
