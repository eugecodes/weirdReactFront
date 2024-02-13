import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { ISupplyPointRepository } from "@/src/core/supply_point/domain/interfaces/i_supply_point_repository";
import type { FilterSupplyPointModel } from "@/src/core/supply_point/domain/models/filter_supply_point_model";
import type { SortSupplyPoint } from "@/src/core/supply_point/domain/interfaces/sort_supply_point";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

@injectable()
export class ExportSupplyPointsUseCase {
  @inject(TYPES.ISupplyPointRepository) private readonly provider!: IocProvider<ISupplyPointRepository>;

  async execute(filter: ExportArgumentsModel<FilterSupplyPointModel, SortSupplyPoint>) {
    const repository = await this.provider();
    return repository.exportToFile(filter);
  }
}
