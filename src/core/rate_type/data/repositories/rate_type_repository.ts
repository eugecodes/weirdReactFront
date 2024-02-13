import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { testApiService } from "@/src/core/app/data/services/test_api_service";
import type { AtLeast, Id } from "@/src/common/utils/types";
import { fromJson, fromJsonPage } from "@/src/common/utils/transformers";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { IRateTypeRepository } from "@/src/core/rate_type/domain/interfaces/i_rate_type_repository";
import type { FilterRateTypeModel } from "@/src/core/rate_type/domain/models/filter_rate_type_model";
import type { CreateRateTypeModel } from "@/src/core/rate_type/domain/models/create_rate_type_model";
import type { PatchRateTypeModel } from "@/src/core/rate_type/domain/models/patch_rate_type_model";
import type { RateTypeModel } from "@/src/core/rate_type/domain/models/rate_type_model";
import { RateTypeDataModel } from "@/src/core/rate_type/data/models/rate_type_data_model";
import { CreateRateTypeDataModel } from "@/src/core/rate_type/data/models/create_rate_type_data_model";
import { FiltersRateTypeDataModel } from "@/src/core/rate_type/data/models/filter_rate_type_data_model";
import { PatchRateTypeDataModel } from "@/src/core/rate_type/data/models/patch_rate_type_data_model";
import type { SortRateType } from "../../domain/interfaces/sort_rate_type";
import { SortRateTypeDataModel } from "../models/sort_rate_type_data_model";
import { createFileName, fromFiltersToQueryParams, getExportFormatAsPath, getExportQueryParams } from "@/src/common/utils";
import { DELETE, EXPORT } from "@/src/common/utils/api_paths";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import { FileModel } from "@/src/core/app/domain/models/file";

@injectable()
export class RateTypeRepository implements IRateTypeRepository {
  @inject(TYPES.testApiService) private apiServiceProvider!: IocProvider<testApiService>;

  private readonly baseUrl = "/api/rate-types";

  private getRouteWithProfileId(rateTypeId: Id) {
    return this.baseUrl + "/" + rateTypeId;
  }

  async rateTypes(input: Filters<FilterRateTypeModel, SortRateType>): Promise<Page<RateTypeModel>> {
    const service = await this.apiServiceProvider();
    const queryParams = fromFiltersToQueryParams({ filters: input, modelClass: FiltersRateTypeDataModel, sortClass: SortRateTypeDataModel });

    const res = await service.get<Record<string, unknown>>(this.baseUrl + queryParams);
    return fromJsonPage<RateTypeDataModel, RateTypeModel>(RateTypeDataModel, res).toDomain();
  }

  async create(input: CreateRateTypeModel): Promise<void> {
    const data = new CreateRateTypeDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl, { data: data.toJson() });
  }

  async detailRateType(rateTypeId: Id): Promise<RateTypeModel> {
    const service = await this.apiServiceProvider();
    const response = await service.get(this.getRouteWithProfileId(rateTypeId));
    const dataModel = fromJson(RateTypeDataModel, response);
    return dataModel.toDomain();
  }
  async deleteRateType(rateTypeId: Id): Promise<void> {
    await this.deleteMany([rateTypeId]);
    return;
  }

  async editRateType(input: CreateRateTypeModel, id: Id): Promise<RateTypeModel> {
    const data = new CreateRateTypeDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    const response = await service.put(this.getRouteWithProfileId(id), { data: data.toJson() });
    const dataModel = fromJson(RateTypeDataModel, response);
    return dataModel.toDomain();
  }

  async patchRateType(input: AtLeast<PatchRateTypeModel, "id">): Promise<RateTypeModel> {
    const service = await this.apiServiceProvider();
    const data = new PatchRateTypeDataModel();
    data.fromDomain(input);
    const response = await service.patch(this.getRouteWithProfileId(input.id), { data: data.toJson() });
    const dataModel = fromJson(RateTypeDataModel, response);
    return dataModel.toDomain();
  }

  async exportToFile({ filters, ids, format }: ExportArgumentsModel<FilterRateTypeModel, SortRateType>): Promise<FileModel> {
    const service = await this.apiServiceProvider();

    const queryParams = getExportQueryParams({ filters, ids, modelClass: FiltersRateTypeDataModel, sortClass: SortRateTypeDataModel });
    const formatAsPath = getExportFormatAsPath(format);

    const data: string = await service.post(this.baseUrl + EXPORT + formatAsPath + queryParams);
    return new FileModel({ data, name: createFileName("rate_types", format) });
  }

  async deleteMany(ids: Id[]): Promise<void> {
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl + DELETE, { data: { ids } });
  }
}
