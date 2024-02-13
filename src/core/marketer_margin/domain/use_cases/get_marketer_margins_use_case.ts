import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { IMarketerMarginRepository } from "@/src/core/marketer_margin/domain/interfaces/i_marketer_margin_repository";
import type { FilterMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/filter_marketer_margin_model";
import type { SortMarketerMargin } from "../interfaces/sort_marketer_margin";

@injectable()
export class GetMarketerMarginsUseCase {
  @inject(TYPES.IMarketerMarginRepository) private readonly provider!: IocProvider<IMarketerMarginRepository>;

  async execute(input: Filters<FilterMarketerMarginModel, SortMarketerMargin>) {
    const repository = await this.provider();
    return repository.marketerMargins(input);
  }
}
