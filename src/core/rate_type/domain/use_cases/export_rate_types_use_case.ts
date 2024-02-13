import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IRateTypeRepository } from "@/src/core/rate_type/domain/interfaces/i_rate_type_repository";
import type { FilterRateTypeModel } from "@/src/core/rate_type/domain/models/filter_rate_type_model";
import type { SortRateType } from "@/src/core/rate_type/domain/interfaces/sort_rate_type";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

@injectable()
export class ExportRateTypesUseCase {
  @inject(TYPES.IRateTypeRepository) private readonly provider!: IocProvider<IRateTypeRepository>;

  async execute(filter: ExportArgumentsModel<FilterRateTypeModel, SortRateType>) {
    const repository = await this.provider();
    return repository.exportToFile(filter);
  }
}
