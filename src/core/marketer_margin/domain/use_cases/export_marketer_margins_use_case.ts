import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IMarketerMarginRepository } from "@/src/core/marketer_margin/domain/interfaces/i_marketer_margin_repository";
import type { FilterMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/filter_marketer_margin_model";
import type { SortMarketerMargin } from "@/src/core/marketer_margin/domain/interfaces/sort_marketer_margin";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

@injectable()
export class ExportMarketerMarginsUseCase {
  @inject(TYPES.IMarketerMarginRepository) private readonly provider!: IocProvider<IMarketerMarginRepository>;

  async execute(filter: ExportArgumentsModel<FilterMarketerMarginModel, SortMarketerMargin>) {
    const repository = await this.provider();
    return repository.exportToFile(filter);
  }
}
