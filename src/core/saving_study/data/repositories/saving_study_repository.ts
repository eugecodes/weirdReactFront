import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { testApiService } from "@/src/core/app/data/services/test_api_service";
import type { AtLeast, Id } from "@/src/common/utils/types";
import { fromJson, fromJsonPage } from "@/src/common/utils/transformers";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { ISavingStudyRepository } from "@/src/core/saving_study/domain/interfaces/i_saving_study_repository";
import type { FilterSavingStudyModel } from "@/src/core/saving_study/domain/models/filter_saving_study_model";
import type { CreateSavingStudyModel } from "@/src/core/saving_study/domain/models/create_saving_study_model";
import type { PatchSavingStudyModel } from "@/src/core/saving_study/domain/models/patch_saving_study_model";
import type { SavingStudyModel } from "@/src/core/saving_study/domain/models/saving_study_model";
import { SavingStudyDataModel } from "@/src/core/saving_study/data/models/saving_study_data_model";
import { CreateSavingStudyDataModel } from "@/src/core/saving_study/data/models/create_saving_study_data_model";
import { FiltersSavingStudyDataModel } from "@/src/core/saving_study/data/models/filter_saving_study_data_model";
import { PatchSavingStudyDataModel } from "@/src/core/saving_study/data/models/patch_saving_study_data_model";
import type { SortSavingStudy } from "@/src/core/saving_study/domain/interfaces/sort_saving_study";
import { SortSavingStudyDataModel } from "../models/sort_saving_study_data_model";
import { createFileName, fromFiltersToQueryParams, getExportFormatAsPath, getExportQueryParams } from "@/src/common/utils";
import { DELETE, EXPORT } from "@/src/common/utils/api_paths";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import { FileModel } from "@/src/core/app/domain/models/file";
import { CreateSavingStudyConfigurationDataModel } from "@/src/core/saving_study/data/models/create_saving_study_configuration_data_model";
import type { CreateSavingStudyConfigurationModel } from "@/src/core/saving_study/domain/models/create_saving_study_configuration_model";
import { FilterSelectedRateDataModel } from "@/src/core/saving_study/data/models/selected_rate/filter_selected_rate_data_model";
import { SortSelectedRateDataModel } from "@/src/core/saving_study/data/models/selected_rate/sort_selected_rate_data_model";
import type { FilterSelectedRateModel } from "@/src/core/saving_study/domain/models/selected_rate/filter_selected_rate_model";
import type { SortSelectedRate } from "@/src/core/saving_study/domain/models/selected_rate/sort_selected_rate";
import { SuggestedRateDataModel } from "@/src/core/saving_study/data/models/selected_rate/suggested_rate_data_model";
import type { SuggestedRateModel } from "@/src/core/saving_study/domain/models/selected_rate/suggested_rate_model";
import type { DetailSavingStudyModel } from "@/src/core/saving_study/domain/models/detail_saving_study_model";
import { DetailSavingStudyDataModel } from "@/src/core/saving_study/data/models/detail_saving_study_data_model";

@injectable()
export class SavingStudyRepository implements ISavingStudyRepository {
  @inject(TYPES.testApiService) private apiServiceProvider!: IocProvider<testApiService>;

  private readonly baseUrl = "/api/studies";

  private getRouteWithSavingStudyId(savingStudyId: Id) {
    return this.baseUrl + "/" + savingStudyId;
  }

  async savingStudies(input: Filters<FilterSavingStudyModel, SortSavingStudy>): Promise<Page<SavingStudyModel>> {
    const service = await this.apiServiceProvider();
    const queryParams = fromFiltersToQueryParams({ filters: input, modelClass: FiltersSavingStudyDataModel, sortClass: SortSavingStudyDataModel });

    const res = await service.get<Record<string, unknown>>(this.baseUrl + queryParams);
    return fromJsonPage<SavingStudyDataModel, SavingStudyModel>(SavingStudyDataModel, res).toDomain();
  }

  async create(input: CreateSavingStudyConfigurationModel) {
    const data = new CreateSavingStudyConfigurationDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    const response = await service.post(this.baseUrl, { data: data.toJson() });
    const dataModel = fromJson(DetailSavingStudyDataModel, response);
    return dataModel.toDomain();
  }

  async detailSavingStudy(savingStudyId: Id): Promise<DetailSavingStudyModel> {
    const service = await this.apiServiceProvider();
    const response = await service.get(this.getRouteWithSavingStudyId(savingStudyId));
    const dataModel = fromJson(DetailSavingStudyDataModel, response);
    return dataModel.toDomain();
  }

  async deleteSavingStudy(savingStudyId: Id): Promise<void> {
    return await this.deleteMany([savingStudyId]);
  }

  async editSavingStudy(input: CreateSavingStudyModel, id: Id): Promise<DetailSavingStudyModel> {
    const data = new CreateSavingStudyDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    const response = await service.put(this.getRouteWithSavingStudyId(id), { data: data.toJson() });
    const dataModel = fromJson(DetailSavingStudyDataModel, response);
    return dataModel.toDomain();
  }

  async patchSavingStudy(input: AtLeast<PatchSavingStudyModel, "id">): Promise<SavingStudyModel> {
    const service = await this.apiServiceProvider();
    const data = new PatchSavingStudyDataModel();
    data.fromDomain(input);
    const response = await service.patch(this.getRouteWithSavingStudyId(input.id), { data: data.toJson() });
    const dataModel = fromJson(SavingStudyDataModel, response);
    return dataModel.toDomain();
  }

  async exportToFile({ filters, ids, format }: ExportArgumentsModel<FilterSavingStudyModel, SortSavingStudy>): Promise<FileModel> {
    const service = await this.apiServiceProvider();

    const queryParams = getExportQueryParams({ filters, ids, modelClass: FiltersSavingStudyDataModel, sortClass: SortSavingStudyDataModel });
    const formatAsPath = getExportFormatAsPath(format);

    const data: string = await service.post(this.baseUrl + EXPORT + formatAsPath + queryParams);
    return new FileModel({ data, name: createFileName("saving_studies", format) });
  }

  async deleteMany(ids: Id[]): Promise<void> {
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl + DELETE, { data: { ids } });
  }

  async getSipsInformation(cups: string) {
    const service = await this.apiServiceProvider();
    return await service.get(this.baseUrl + `/sips/${cups}`);
  }

  async getSuggestedRates(input: Filters<FilterSelectedRateModel, SortSelectedRate>, id: Id): Promise<Page<SuggestedRateModel>> {
    const service = await this.apiServiceProvider();
    const queryParams = fromFiltersToQueryParams({ filters: input, modelClass: FilterSelectedRateDataModel, sortClass: SortSelectedRateDataModel });

    const res = await service.get<Record<string, unknown>>(this.getRouteWithSavingStudyId(id) + "/suggested-rates" + queryParams);
    return fromJsonPage<SuggestedRateDataModel, SuggestedRateModel>(SuggestedRateDataModel, res).toDomain();
  }

  async generateSuggestedRates(id: Id): Promise<SavingStudyModel[]> {
    const service = await this.apiServiceProvider();
    const response = await service.post<Array<Record<string, unknown>>, void>(this.getRouteWithSavingStudyId(id) + "/generate-rates");
    return response?.map((json) => fromJson(SavingStudyDataModel, json).toDomain());
  }

  async finishSavingStudy(savingStudyId: Id, selectedRateId: Id): Promise<SavingStudyModel> {
    const service = await this.apiServiceProvider();
    const response = await service.post(this.getRouteWithSavingStudyId(savingStudyId) + "/finish", { data: { suggested_rate_id: selectedRateId } });
    const dataModel = fromJson(SavingStudyDataModel, response);
    return dataModel.toDomain();
  }

  async editSuggestedRate(savingStudyId: Id, input: SuggestedRateModel): Promise<SuggestedRateModel> {
    const data = new SuggestedRateDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    const response = await service.put(this.getRouteWithSavingStudyId(savingStudyId) + "/suggested-rates/" + input.id, { data: data.toJson() });
    const dataModel = fromJson(SuggestedRateDataModel, response);
    return dataModel.toDomain();
  }

  async duplicate(savingStudyId: Id): Promise<SavingStudyModel> {
    const service = await this.apiServiceProvider();
    const response = await service.post(this.getRouteWithSavingStudyId(savingStudyId) + "/duplicate");
    const dataModel = fromJson(DetailSavingStudyDataModel, response);
    return dataModel.toDomain();
  }
}
