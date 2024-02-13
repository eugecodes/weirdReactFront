import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { ISavingStudyRepository } from "@/src/core/saving_study/domain/interfaces/i_saving_study_repository";
import type { Id } from "@/src/common/utils/types";
import type { SuggestedRateModel } from "../models/selected_rate/suggested_rate_model";

@injectable()
export class EditSuggestedRateUseCase {
  @inject(TYPES.ISavingStudyRepository) private readonly provider!: IocProvider<ISavingStudyRepository>;

  async execute(savingStudyId: Id, input: SuggestedRateModel) {
    const repository = await this.provider();
    return repository.editSuggestedRate(savingStudyId, input);
  }
}
