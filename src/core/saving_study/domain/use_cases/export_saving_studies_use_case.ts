import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { ISavingStudyRepository } from "@/src/core/saving_study/domain/interfaces/i_saving_study_repository";
import type { FilterSavingStudyModel } from "@/src/core/saving_study/domain/models/filter_saving_study_model";
import type { SortSavingStudy } from "@/src/core/saving_study/domain/interfaces/sort_saving_study";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

@injectable()
export class ExportSavingStudiesUseCase {
  @inject(TYPES.ISavingStudyRepository) private readonly provider!: IocProvider<ISavingStudyRepository>;

  async execute(filter: ExportArgumentsModel<FilterSavingStudyModel, SortSavingStudy>) {
    const repository = await this.provider();
    return repository.exportToFile(filter);
  }
}
