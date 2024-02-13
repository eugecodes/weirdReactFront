import type { AtLeast, Id } from "@/src/common/utils/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { ISavingStudyRepository } from "@/src/core/saving_study/domain/interfaces/i_saving_study_repository";
import type { PatchSavingStudyModel } from "@/src/core/saving_study/domain/models/patch_saving_study_model";

@injectable()
export class PatchSavingStudyUseCase {
  @inject(TYPES.ISavingStudyRepository) private readonly provider!: IocProvider<ISavingStudyRepository>;

  async execute(input: AtLeast<PatchSavingStudyModel, "id">) {
    const repository = await this.provider();
    return repository.patchSavingStudy(input);
  }

  async delete(id: Id) {
    const repository = await this.provider();
    return repository.deleteSavingStudy(id);
  }
}
