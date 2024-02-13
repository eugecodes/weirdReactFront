import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { ISavingStudyRepository } from "@/src/core/saving_study/domain/interfaces/i_saving_study_repository";
import type { FilterSavingStudyModel } from "@/src/core/saving_study/domain/models/filter_saving_study_model";
import type { SortSavingStudy } from "../interfaces/sort_saving_study";

@injectable()
export class GetSavingStudiesUseCase {
  @inject(TYPES.ISavingStudyRepository) private readonly provider!: IocProvider<ISavingStudyRepository>;

  async execute(input: Filters<FilterSavingStudyModel, SortSavingStudy>) {
    const repository = await this.provider();
    return repository.savingStudies(input);
  }
}
