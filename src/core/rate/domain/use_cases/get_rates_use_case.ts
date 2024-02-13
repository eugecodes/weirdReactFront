import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { IRateRepository } from "@/src/core/rate/domain/interfaces/i_rate_repository";
import type { FilterRateModel } from "@/src/core/rate/domain/models/filter_rate_model";
import type { SortRate } from "@/src/core/rate/domain/interfaces/sort_rate";

@injectable()
export class GetRatesUseCase {
  @inject(TYPES.IRateRepository) private readonly provider!: IocProvider<IRateRepository>;

  async execute(input: Filters<FilterRateModel, SortRate>) {
    const repository = await this.provider();
    return repository.rates(input);
  }
}
