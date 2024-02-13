import type { Filters } from "@/src/core/app/domain/models/filters";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { CreateSavingStudyModel } from "@/src/core/saving_study/domain/models/create_saving_study_model";
import type { FilterSavingStudyModel } from "@/src/core/saving_study/domain/models/filter_saving_study_model";
import type { SortSavingStudy } from "@/src/core/saving_study/domain/interfaces/sort_saving_study";
import type { CreateSavingStudyUseCase } from "@/src/core/saving_study/domain/use_cases/create_saving_study_use_case";
import type { GetSavingStudiesUseCase } from "@/src/core/saving_study/domain/use_cases/get_saving_studies_use_case";
import type { GetSavingStudyDetailUseCase } from "@/src/core/saving_study/domain/use_cases/get_saving_study_detail_use_case";
import type { PatchSavingStudyUseCase } from "@/src/core/saving_study/domain/use_cases/patch_saving_study_use_case";
import type { EditSavingStudyUseCase } from "@/src/core/saving_study/domain/use_cases/edit_saving_study_use_case";
import type { Id } from "@/src/common/utils/types";
import type { DeleteManySavingStudiesUseCase } from "@/src/core/saving_study/domain/use_cases/delete_many_saving_studies_use_case";
import type { ExportSavingStudiesUseCase } from "@/src/core/saving_study/domain/use_cases/export_saving_studies_use_case";
import type { ListController } from "@/src/common/interfaces/list_controller";
import type { SavingStudyModel } from "@/src/core/saving_study/domain/models/saving_study_model";
import type { MutationController } from "@/src/common/interfaces/mutation_controller";
import { withErrorHandler } from "@/src/common/utils/errors";
import { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { GetSipsUseCase } from "@/src/core/saving_study/domain/use_cases/get_sips_use_case";
import type { CreateSavingStudyConfigurationModel } from "@/src/core/saving_study/domain/models/create_saving_study_configuration_model";
import type { GetSuggestedRatesUseCase } from "@/src/core/saving_study/domain/use_cases/get_suggested_rates_use_case";
import type { FilterSelectedRateModel } from "@/src/core/saving_study/domain/models/selected_rate/filter_selected_rate_model";
import type { SortSelectedRate } from "@/src/core/saving_study/domain/models/selected_rate/sort_selected_rate";
import type { GenerateSuggestedRatesUseCase } from "@/src/core/saving_study/domain/use_cases/generate_suggested_rates_use_case";
import type { FinishSavingStudyUseCase } from "@/src/core/saving_study/domain/use_cases/finish_saving_study_use_case";
import type { EditSuggestedRateUseCase } from "@/src/core/saving_study/domain/use_cases/edit_suggested_rate_use_case";
import type { SuggestedRateModel } from "@/src/core/saving_study/domain/models/selected_rate/suggested_rate_model";
import type { DuplicateSavingStudyUseCase } from "@/src/core/saving_study/domain/use_cases/duplicate_saving_study_use_case";

export default class SavingStudyController
  implements ListController<SavingStudyModel, FilterSavingStudyModel, SortSavingStudy>, MutationController<SavingStudyModel>
{
  async getAll(filter: Filters<FilterSavingStudyModel, SortSavingStudy>) {
    const savingStudiesUseCase = await locator.get<IocProvider<GetSavingStudiesUseCase>>(TYPES.GetSavingStudiesUseCase)();
    return await withErrorHandler(savingStudiesUseCase.execute(filter));
  }

  async getOneById(id: Id) {
    const getSavingStudyUseCase = await locator.get<IocProvider<GetSavingStudyDetailUseCase>>(TYPES.GetSavingStudyDetailUseCase)();
    return await withErrorHandler(getSavingStudyUseCase.execute(id));
  }

  static async create(input: CreateSavingStudyConfigurationModel) {
    const createSavingStudyUseCase = await locator.get<IocProvider<CreateSavingStudyUseCase>>(TYPES.CreateSavingStudyUseCase)();
    return await withErrorHandler(createSavingStudyUseCase.execute(input));
  }

  static async edit(input: CreateSavingStudyModel, id: Id) {
    const editSavingStudyUseCase = await locator.get<IocProvider<EditSavingStudyUseCase>>(TYPES.EditSavingStudyUseCase)();
    return withErrorHandler(editSavingStudyUseCase.execute(input, id));
  }

  static async delete(id: Id) {
    const patchUseCase = await locator.get<IocProvider<PatchSavingStudyUseCase>>(TYPES.PatchSavingStudyUseCase)();
    await withErrorHandler(patchUseCase.delete(id));
  }

  async deleteMany(ids: Id[]) {
    const deleteManyUseCase = await locator.get<IocProvider<DeleteManySavingStudiesUseCase>>(TYPES.DeleteManySavingStudyUseCase)();
    await withErrorHandler(deleteManyUseCase.execute(ids));
  }

  async export({ filters, ids }: ExportArgumentsModel<FilterSavingStudyModel, SortSavingStudy>) {
    const exportUseCase = await locator.get<IocProvider<ExportSavingStudiesUseCase>>(TYPES.ExportSavingStudyUseCase)();
    const exportArguments = new ExportArgumentsModel({ filters, ids });
    return await withErrorHandler(exportUseCase.execute(exportArguments));
  }

  static async getSipsInformation(cups: string) {
    const getSavingStudyUseCase = await locator.get<IocProvider<GetSipsUseCase>>(TYPES.GetSipsUseCase)();
    return await withErrorHandler(getSavingStudyUseCase.execute(cups));
  }

  async getSuggestedRates(input: Filters<FilterSelectedRateModel, SortSelectedRate>, id: Id) {
    const getSelectedRatesUseCase = await locator.get<IocProvider<GetSuggestedRatesUseCase>>(TYPES.GetSuggestedRatesUseCase)();
    return await withErrorHandler(getSelectedRatesUseCase.execute(input, id));
  }

  static async generateSuggestedRates(id: Id) {
    const generateSelectedRatesUseCase = await locator.get<IocProvider<GenerateSuggestedRatesUseCase>>(TYPES.GenerateSuggestedRatesUseCase)();
    return await withErrorHandler(generateSelectedRatesUseCase.execute(id));
  }

  static async finishSavingStudy(savingStudyId: Id, selectedRateId: Id) {
    const FinishSavingStudyUseCase = await locator.get<IocProvider<FinishSavingStudyUseCase>>(TYPES.FinishSavingStudyUseCase)();
    return await withErrorHandler(FinishSavingStudyUseCase.execute(savingStudyId, selectedRateId));
  }

  static async editSuggestedRate(savingStudyId: Id, input: SuggestedRateModel) {
    const editSuggestedRateUseCase = await locator.get<IocProvider<EditSuggestedRateUseCase>>(TYPES.EditSuggestedRateUseCase)();
    return await withErrorHandler(editSuggestedRateUseCase.execute(savingStudyId, input));
  }

  static async duplicate(id: Id) {
    const duplicateUseCase = await locator.get<IocProvider<DuplicateSavingStudyUseCase>>(TYPES.DuplicateSavingStudyUseCase)();
    return await withErrorHandler(duplicateUseCase.execute(id));
  }
}
