import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { ISavingStudyRepository } from "@/src/core/saving_study/domain/interfaces/i_saving_study_repository";
import type { CreateSavingStudyConfigurationModel } from "@/src/core/saving_study/domain/models/create_saving_study_configuration_model";

@injectable()
export class CreateSavingStudyUseCase {
  @inject(TYPES.ISavingStudyRepository) private readonly provider!: IocProvider<ISavingStudyRepository>;

  async execute(input: CreateSavingStudyConfigurationModel) {
    const repository = await this.provider();
    return repository.create(input);
  }
}
