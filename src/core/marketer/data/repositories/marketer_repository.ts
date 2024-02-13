import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { testApiService } from "@/src/core/app/data/services/test_api_service";
import type { MarketerModel } from "@/src/core/marketer/domain/models/marketer_model";
import type { AtLeast, Id } from "@/src/common/utils/types";
import { MarketerDataModel } from "@/src/core/marketer/data/models/marketer_data_model";
import type { CreateMarketerModel } from "@/src/core/marketer/domain/models/create_marketer_model";
import type { PatchMarketerModel } from "@/src/core/marketer/domain/models/patch_marketer_model";
import { CreateMarketerDataModel } from "@/src/core/marketer/data/models/create_marketer_data_model";
import { fromJson, fromJsonPage } from "@/src/common/utils/transformers";
import type { Page } from "@/src/core/app/domain/models/page";
import type { FilterMarketerModel } from "@/src/core/marketer/domain/models/filter_marketer_model";
import { FilterMarketerDataModel } from "@/src/core/marketer/data/models/filter_marketer_data_model";
import type { Filters } from "@/src/core/app/domain/models/filters";
import { PatchMarketerDataModel } from "@/src/core/marketer/data/models/patch_marketer_data_model";
import type { IMarketerRepository } from "@/src/core/marketer/domain/interfaces/i_marketer_repository";
import type { SortMarketer } from "@/src/core/marketer/domain/interfaces/sort_marketer";
import SortMarketerDataModel from "@/src/core/marketer/data/models/sort_marketer_data_model";
import type { DetailMarketerModel } from "@/src/core/marketer/domain/models/detail_marketer_model";
import { DetailMarketerDataModel } from "@/src/core/marketer/data/models/detail_marketer_data_model";
import type { EditMarketerModel } from "@/src/core/marketer/domain/models/edit_marketer_model";
import { EditMarketerDataModel } from "@/src/core/marketer/data/models/edit_marketer_data_model";
import { createFileName, fromFiltersToQueryParams, getExportFormatAsPath, getExportQueryParams } from "@/src/common/utils";
import { DELETE, EXPORT } from "@/src/common/utils/api_paths";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import { FileModel } from "@/src/core/app/domain/models/file";

@injectable()
export class MarketerRepository implements IMarketerRepository {
  @inject(TYPES.testApiService) private apiServiceProvider!: IocProvider<testApiService>;

  private readonly baseUrl = "/api/marketers";

  private getRouteWithMarketerId(marketerId: Id) {
    return this.baseUrl + "/" + marketerId;
  }

  async marketers(input: Filters<FilterMarketerModel, SortMarketer>): Promise<Page<MarketerModel>> {
    const service = await this.apiServiceProvider();
    const queryParams = fromFiltersToQueryParams({ filters: input, modelClass: FilterMarketerDataModel, sortClass: SortMarketerDataModel });

    const res = await service.get<Record<string, unknown>>(this.baseUrl + queryParams);
    return fromJsonPage<MarketerDataModel, MarketerModel>(MarketerDataModel, res).toDomain();
  }
  async create(input: CreateMarketerModel): Promise<void> {
    const data = new CreateMarketerDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl, { data: data.toJson() });
  }

  async detailMarketer(marketerId: Id): Promise<DetailMarketerModel> {
    const service = await this.apiServiceProvider();
    const response = await service.get(this.getRouteWithMarketerId(marketerId));
    const dataModel = fromJson(DetailMarketerDataModel, response);
    return dataModel.toDomain();
  }
  async deleteMarketer(marketerId: Id): Promise<void> {
    await this.patchMarketer({ id: marketerId, deleted: true });
    return;
  }

  async editMarketer(input: EditMarketerModel, id: Id): Promise<DetailMarketerModel> {
    const data = new EditMarketerDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    const response = await service.put(this.getRouteWithMarketerId(id), { data: data.toJson() });
    const dataModel = fromJson(DetailMarketerDataModel, response);
    return dataModel.toDomain();
  }

  async patchMarketer(input: AtLeast<PatchMarketerModel, "id">): Promise<void> {
    const service = await this.apiServiceProvider();
    const data = new PatchMarketerDataModel();
    data.fromDomain(input);
    await service.patch(this.getRouteWithMarketerId(input.id), { data: data.toJson() });
  }

  async exportToFile({ filters, ids, format }: ExportArgumentsModel<FilterMarketerModel, SortMarketer>): Promise<FileModel> {
    const service = await this.apiServiceProvider();

    const queryParams = getExportQueryParams({ filters, ids, modelClass: FilterMarketerDataModel, sortClass: SortMarketerDataModel });
    const formatAsPath = getExportFormatAsPath(format);

    const data: string = await service.post(this.baseUrl + EXPORT + formatAsPath + queryParams);
    return new FileModel({ data, name: createFileName("marketer", format) });
  }

  async deleteMany(ids: Id[]): Promise<void> {
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl + DELETE, { data: { ids } });
  }
}
