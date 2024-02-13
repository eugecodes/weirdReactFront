import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IMarketerRepository } from "@/src/core/marketer/domain/interfaces/i_marketer_repository";
import type { FilterMarketerModel } from "@/src/core/marketer/domain/models/filter_marketer_model";
import type { SortMarketer } from "@/src/core/marketer/domain/interfaces/sort_marketer";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

@injectable()
export class ExportMarketerUseCase {
  @inject(TYPES.IMarketerRepository) private readonly provider!: IocProvider<IMarketerRepository>;

  async execute(filter: ExportArgumentsModel<FilterMarketerModel, SortMarketer>) {
    const repository = await this.provider();
    return repository.exportToFile(filter);
  }
}
