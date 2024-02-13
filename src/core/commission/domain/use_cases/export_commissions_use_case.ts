import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { ICommissionRepository } from "@/src/core/commission/domain/interfaces/i_commission_repository";
import type { FilterCommissionModel } from "@/src/core/commission/domain/models/filter_commission_model";
import type { SortCommission } from "@/src/core/commission/domain/interfaces/sort_commission";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

@injectable()
export class ExportCommissionsUseCase {
  @inject(TYPES.ICommissionRepository) private readonly provider!: IocProvider<ICommissionRepository>;

  async execute(filter: ExportArgumentsModel<FilterCommissionModel, SortCommission>) {
    const repository = await this.provider();
    return repository.exportToFile(filter);
  }
}
