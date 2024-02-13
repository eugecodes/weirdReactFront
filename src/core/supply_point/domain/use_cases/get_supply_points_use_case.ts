import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { ISupplyPointRepository } from "@/src/core/supply_point/domain/interfaces/i_supply_point_repository";
import type { FilterSupplyPointModel } from "@/src/core/supply_point/domain/models/filter_supply_point_model";
import type { SortSupplyPoint } from "../interfaces/sort_supply_point";

@injectable()
export class GetSupplyPointsUseCase {
  @inject(TYPES.ISupplyPointRepository) private readonly provider!: IocProvider<ISupplyPointRepository>;

  async execute(input: Filters<FilterSupplyPointModel, SortSupplyPoint>) {
    const repository = await this.provider();
    return repository.supply_points(input);
  }
}
