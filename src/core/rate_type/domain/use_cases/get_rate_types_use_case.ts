import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { IRateTypeRepository } from "@/src/core/rate_type/domain/interfaces/i_rate_type_repository";
import type { FilterRateTypeModel } from "@/src/core/rate_type/domain/models/filter_rate_type_model";
import type { SortRateType } from "../interfaces/sort_rate_type";

@injectable()
export class GetRateTypesUseCase {
  @inject(TYPES.IRateTypeRepository) private readonly provider!: IocProvider<IRateTypeRepository>;

  async execute(input: Filters<FilterRateTypeModel, SortRateType>) {
    const repository = await this.provider();
    return repository.rateTypes(input);
  }

  /*   async getByName(name: string) {
    const repository = await this.provider();
    return repository.rateTypes(name);
  } */
}
