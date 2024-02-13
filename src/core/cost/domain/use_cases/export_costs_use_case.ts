import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { ICostRepository } from "@/src/core/cost/domain/interfaces/i_cost_repository";
import type { FilterCostModel } from "@/src/core/cost/domain/models/filter_cost_model";
import type { SortCost } from "@/src/core/cost/domain/interfaces/sort_cost";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

@injectable()
export class ExportCostsUseCase {
  @inject(TYPES.ICostRepository) private readonly provider!: IocProvider<ICostRepository>;

  async execute(filter: ExportArgumentsModel<FilterCostModel, SortCost>) {
    const repository = await this.provider();
    return repository.exportToFile(filter);
  }
}
