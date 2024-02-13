import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { ISavingStudyRepository } from "@/src/core/saving_study/domain/interfaces/i_saving_study_repository";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class FinishSavingStudyUseCase {
  @inject(TYPES.ISavingStudyRepository) private readonly provider!: IocProvider<ISavingStudyRepository>;

  async execute(savingStudyId: Id, selectedRateId: Id) {
    const repository = await this.provider();
    return repository.finishSavingStudy(savingStudyId, selectedRateId);
  }
}
