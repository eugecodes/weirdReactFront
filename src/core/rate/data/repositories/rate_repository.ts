import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { testApiService } from "@/src/core/app/data/services/test_api_service";
import type { AtLeast, Id } from "@/src/common/utils/types";
import { fromJson, fromJsonPage } from "@/src/common/utils/transformers";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { IRateRepository } from "@/src/core/rate/domain/interfaces/i_rate_repository";
import type { FilterRateModel } from "@/src/core/rate/domain/models/filter_rate_model";
import type { CreateRateModel } from "@/src/core/rate/domain/models/create_rate_model";
import type { PatchRateModel } from "@/src/core/rate/domain/models/patch_rate_model";
import type { RateModel } from "@/src/core/rate/domain/models/rate_model";
import { RateDataModel } from "@/src/core/rate/data/models/rate_data_model";
import { CreateRateDataModel } from "@/src/core/rate/data/models/create_rate_data_model";
import { FiltersRateDataModel } from "@/src/core/rate/data/models/filter_rate_data_model";
import { PatchRateDataModel } from "@/src/core/rate/data/models/patch_rate_data_model";
import type { SortRate } from "../../domain/interfaces/sort_rate";
import { SortRateDataModel } from "../models/sort_rate_data_model";
import { createFileName, fromFiltersToQueryParams, getExportFormatAsPath, getExportQueryParams } from "@/src/common/utils";
import { DELETE, EXPORT } from "@/src/common/utils/api_paths";
import { FileModel } from "@/src/core/app/domain/models/file";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

@injectable()
export class RateRepository implements IRateRepository {
  @inject(TYPES.testApiService) private apiServiceProvider!: IocProvider<testApiService>;

  private readonly baseUrl = "/api/rates";

  private getRouteWithProfileId(rateId: Id) {
    return this.baseUrl + "/" + rateId;
  }

  async rates(input: Filters<FilterRateModel, SortRate>): Promise<Page<RateModel>> {
    const service = await this.apiServiceProvider();
    const queryParams = fromFiltersToQueryParams({ filters: input, modelClass: FiltersRateDataModel, sortClass: SortRateDataModel });

    const res = await service.get<Record<string, unknown>>(this.baseUrl + queryParams);
    return fromJsonPage<RateDataModel, RateModel>(RateDataModel, res).toDomain();
  }

  async create(input: CreateRateModel): Promise<void> {
    const data = new CreateRateDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl, { data: data.toJson() });
  }

  async detailRate(rateId: Id): Promise<RateModel> {
    const service = await this.apiServiceProvider();
    const response = await service.get(this.getRouteWithProfileId(rateId));
    const dataModel = fromJson(RateDataModel, response);
    return dataModel.toDomain();
  }
  async deleteRate(rateId: Id): Promise<void> {
    await this.deleteMany([rateId]);
    return;
  }

  async editRate(input: CreateRateModel, id: Id): Promise<RateModel> {
    const data = new CreateRateDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    const response = await service.put(this.getRouteWithProfileId(id), { data: data.toJson() });
    const dataModel = fromJson(RateDataModel, response);
    return dataModel.toDomain();
  }

  async patchRate(input: AtLeast<PatchRateModel, "id">): Promise<RateModel> {
    const service = await this.apiServiceProvider();
    const data = new PatchRateDataModel();
    data.fromDomain(input);
    const response = await service.patch(this.getRouteWithProfileId(input.id), { data: data.toJson() });
    const dataModel = fromJson(RateDataModel, response);
    return dataModel.toDomain();
  }

  async exportToFile({ filters, ids, format }: ExportArgumentsModel<FilterRateModel, SortRate>): Promise<FileModel> {
    const service = await this.apiServiceProvider();

    const queryParams = getExportQueryParams({ filters, ids, modelClass: FiltersRateDataModel, sortClass: SortRateDataModel });
    const formatAsPath = getExportFormatAsPath(format);

    const data: string = await service.post(this.baseUrl + EXPORT + formatAsPath + queryParams);
    return new FileModel({ data, name: createFileName("rates", format) });
  }

  async deleteMany(ids: Id[]): Promise<void> {
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl + DELETE, { data: { ids } });
  }
}
