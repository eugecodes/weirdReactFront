import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { ICommissionRepository } from "@/src/core/commission/domain/interfaces/i_commission_repository";
import type { FilterCommissionModel } from "@/src/core/commission/domain/models/filter_commission_model";
import type { SortCommission } from "../interfaces/sort_commission";

@injectable()
export class GetCommissionsUseCase {
  @inject(TYPES.ICommissionRepository) private readonly provider!: IocProvider<ICommissionRepository>;

  async execute(input: Filters<FilterCommissionModel, SortCommission>) {
    const repository = await this.provider();
    return repository.commissions(input);
  }
}
