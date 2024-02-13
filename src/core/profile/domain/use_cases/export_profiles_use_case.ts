import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IProfileRepository } from "@/src/core/profile/domain/interfaces/i_profile_repository";
import type { FilterProfileModel } from "@/src/core/profile/domain/models/filter_profile_model";
import type { SortProfile } from "@/src/core/profile/domain/interfaces/sort_profile";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

@injectable()
export class ExportProfilesUseCase {
  @inject(TYPES.IProfilesRepository) private readonly provider!: IocProvider<IProfileRepository>;

  async execute(filter: ExportArgumentsModel<FilterProfileModel, SortProfile>) {
    const repository = await this.provider();
    return repository.exportToFile(filter);
  }
}
