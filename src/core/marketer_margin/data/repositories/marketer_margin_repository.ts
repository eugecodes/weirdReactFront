import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { testApiService } from "@/src/core/app/data/services/test_api_service";
import type { AtLeast, Id } from "@/src/common/utils/types";
import { fromJson, fromJsonPage } from "@/src/common/utils/transformers";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { IMarketerMarginRepository } from "@/src/core/marketer_margin/domain/interfaces/i_marketer_margin_repository";
import type { FilterMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/filter_marketer_margin_model";
import type { CreateMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/create_marketer_margin_model";
import type { PatchMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/patch_marketer_margin_model";
import type { MarketerMarginModel } from "@/src/core/marketer_margin/domain/models/marketer_margin_model";
import { MarketerMarginDataModel } from "@/src/core/marketer_margin/data/models/marketer_margin_data_model";
import { CreateMarketerMarginDataModel } from "@/src/core/marketer_margin/data/models/create_marketer_margin_data_model";
import { FiltersMarketerMarginDataModel } from "@/src/core/marketer_margin/data/models/filter_marketer_margin_data_model";
import { PatchMarketerMarginDataModel } from "@/src/core/marketer_margin/data/models/patch_marketer_margin_data_model";
import type { SortMarketerMargin } from "../../domain/interfaces/sort_marketer_margin";
import { SortMarketerMarginDataModel } from "../models/sort_marketer_margin_data_model";
import { createFileName, fromFiltersToQueryParams, getExportFormatAsPath, getExportQueryParams } from "@/src/common/utils";
import { DELETE, EXPORT } from "@/src/common/utils/api_paths";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import { FileModel } from "@/src/core/app/domain/models/file";

@injectable()
export class MarketerMarginRepository implements IMarketerMarginRepository {
  @inject(TYPES.testApiService) private apiServiceProvider!: IocProvider<testApiService>;

  private readonly baseUrl = "/api/marketer-margins";

  private getRouteWithId(marketerMarginId: Id) {
    return this.baseUrl + "/" + marketerMarginId;
  }

  async marketerMargins(input: Filters<FilterMarketerMarginModel, SortMarketerMargin>): Promise<Page<MarketerMarginModel>> {
    const service = await this.apiServiceProvider();
    const queryParams = fromFiltersToQueryParams({
      filters: input,
      modelClass: FiltersMarketerMarginDataModel,
      sortClass: SortMarketerMarginDataModel
    });

    const res = await service.get<Record<string, unknown>>(this.baseUrl + queryParams);
    return fromJsonPage<MarketerMarginDataModel, MarketerMarginModel>(MarketerMarginDataModel, res).toDomain();
  }

  async create(input: CreateMarketerMarginModel): Promise<void> {
    const data = new CreateMarketerMarginDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl, { data: data.toJson() });
  }

  async detailMarketerMargin(marketerMarginId: Id): Promise<MarketerMarginModel> {
    const service = await this.apiServiceProvider();
    const response = await service.get(this.getRouteWithId(marketerMarginId));
    const dataModel = fromJson(MarketerMarginDataModel, response);
    return dataModel.toDomain();
  }
  async deleteMarketerMargin(marketerMarginId: Id): Promise<void> {
    await this.patchMarketerMargin({ id: marketerMarginId, deleted: true });
    return;
  }

  async editMarketerMargin(input: CreateMarketerMarginModel, id: Id): Promise<MarketerMarginModel> {
    const data = new CreateMarketerMarginDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    const response = await service.put(this.getRouteWithId(id), { data: data.toJson() });
    const dataModel = fromJson(MarketerMarginDataModel, response);
    return dataModel.toDomain();
  }

  async patchMarketerMargin(input: AtLeast<PatchMarketerMarginModel, "id">): Promise<MarketerMarginModel> {
    const service = await this.apiServiceProvider();
    const data = new PatchMarketerMarginDataModel();
    data.fromDomain(input);
    const response = await service.patch(this.getRouteWithId(input.id), { data: data.toJson() });
    const dataModel = fromJson(MarketerMarginDataModel, response);
    return dataModel.toDomain();
  }

  async exportToFile({ filters, ids, format }: ExportArgumentsModel<FilterMarketerMarginModel, SortMarketerMargin>): Promise<FileModel> {
    const service = await this.apiServiceProvider();

    const queryParams = getExportQueryParams({ filters, ids, modelClass: FiltersMarketerMarginDataModel, sortClass: SortMarketerMarginDataModel });
    const formatAsPath = getExportFormatAsPath(format);

    const data: string = await service.post(this.baseUrl + EXPORT + formatAsPath + queryParams);
    return new FileModel({ data, name: createFileName("marketer_margins", format) });
  }

  async deleteMany(ids: Id[]): Promise<void> {
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl + DELETE, { data: { ids } });
  }
}
