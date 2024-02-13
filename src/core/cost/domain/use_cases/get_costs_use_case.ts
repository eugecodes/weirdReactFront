import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { ICostRepository } from "@/src/core/cost/domain/interfaces/i_cost_repository";
import type { FilterCostModel } from "@/src/core/cost/domain/models/filter_cost_model";
import type { SortCost } from "../interfaces/sort_cost";

@injectable()
export class GetCostsUseCase {
  @inject(TYPES.ICostRepository) private readonly provider!: IocProvider<ICostRepository>;

  async execute(input: Filters<FilterCostModel, SortCost>) {
    const repository = await this.provider();
    return repository.costs(input);
  }
}
