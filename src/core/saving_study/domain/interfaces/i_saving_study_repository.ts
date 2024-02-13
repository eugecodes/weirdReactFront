import type { AtLeast, Id } from "@/src/common/utils/types";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { FilterSavingStudyModel } from "@/src/core/saving_study/domain/models/filter_saving_study_model";
import type { CreateSavingStudyModel } from "@/src/core/saving_study/domain/models/create_saving_study_model";
import type { PatchSavingStudyModel } from "@/src/core/saving_study/domain/models/patch_saving_study_model";
import type { SavingStudyModel } from "@/src/core/saving_study/domain/models/saving_study_model";
import type { SortSavingStudy } from "./sort_saving_study";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { FileModel } from "@/src/core/app/domain/models/file";
import type { CreateSavingStudyConfigurationModel } from "@/src/core/saving_study/domain/models/create_saving_study_configuration_model";
import type { SortSelectedRate } from "@/src/core/saving_study/domain/models/selected_rate/sort_selected_rate";
import type { FilterSelectedRateModel } from "@/src/core/saving_study/domain/models/selected_rate/filter_selected_rate_model";
import type { SuggestedRateModel } from "@/src/core/saving_study/domain/models/selected_rate/suggested_rate_model";
import type { DetailSavingStudyModel } from "@/src/core/saving_study/domain/models/detail_saving_study_model";

export interface ISavingStudyRepository {
  savingStudies(filters: Filters<FilterSavingStudyModel, SortSavingStudy>): Promise<Page<SavingStudyModel>>;
  create(input: CreateSavingStudyConfigurationModel): Promise<DetailSavingStudyModel>;
  detailSavingStudy(savingStudyId: Id): Promise<DetailSavingStudyModel>;
  editSavingStudy(input: CreateSavingStudyModel, id: Id): Promise<DetailSavingStudyModel>;
  patchSavingStudy(input: AtLeast<PatchSavingStudyModel, "id">): Promise<SavingStudyModel>;
  deleteSavingStudy(savingStudyId: Id): Promise<void>;
  deleteMany(ids: Id[]): Promise<void>;
  exportToFile(filter: ExportArgumentsModel<FilterSavingStudyModel, SortSavingStudy>): Promise<FileModel>;
  getSipsInformation(cups: string): Promise<unknown>;
  getSuggestedRates(input: Filters<FilterSelectedRateModel, SortSelectedRate>, id: Id): Promise<Page<SuggestedRateModel>>;
  generateSuggestedRates(id: Id): Promise<SavingStudyModel[]>;
  finishSavingStudy(savingStudyId: Id, selectedRateId: Id): Promise<SavingStudyModel>;
  editSuggestedRate(savingStudyId: Id, input: SuggestedRateModel): Promise<SuggestedRateModel>;
  duplicate(savingStudyId: Id): Promise<SavingStudyModel>;
}
