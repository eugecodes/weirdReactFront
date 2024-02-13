import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { testApiService } from "@/src/core/app/data/services/test_api_service";
import type { AtLeast, Id } from "@/src/common/utils/types";
import { fromJson, fromJsonPage } from "@/src/common/utils/transformers";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { ISupplyPointRepository } from "@/src/core/supply_point/domain/interfaces/i_supply_point_repository";
import type { FilterSupplyPointModel } from "@/src/core/supply_point/domain/models/filter_supply_point_model";
import type { CreateSupplyPointModel } from "@/src/core/supply_point/domain/models/create_supply_point_model";
import type { PatchSupplyPointModel } from "@/src/core/supply_point/domain/models/patch_supply_point_model";
import type { SupplyPointModel } from "@/src/core/supply_point/domain/models/supply_point_model";
import { SupplyPointDataModel } from "@/src/core/supply_point/data/models/supply_point_data_model";
import { CreateSupplyPointDataModel } from "@/src/core/supply_point/data/models/create_supply_point_data_model";
import { FiltersSupplyPointDataModel } from "@/src/core/supply_point/data/models/filter_supply_point_data_model";
import { PatchSupplyPointDataModel } from "@/src/core/supply_point/data/models/patch_supply_point_data_model";
import type { SortSupplyPoint } from "@/src/core/supply_point/domain/interfaces/sort_supply_point";
import { SortSupplyPointDataModel } from "../models/sort_supply_point_data_model";
import { createFileName, fromFiltersToQueryParams, getExportFormatAsPath, getExportQueryParams } from "@/src/common/utils";
import { DELETE, EXPORT } from "@/src/common/utils/api_paths";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import { FileModel } from "@/src/core/app/domain/models/file";
import type { DetailSupplyPointModel } from "@/src/core/supply_point/domain/models/detail_supply_point_model";
import { DetailSupplyPointDataModel } from "@/src/core/supply_point/data/models/detail_supply_point_data_model";

@injectable()
export class SupplyPointRepository implements ISupplyPointRepository {
  @inject(TYPES.testApiService) private apiServiceProvider!: IocProvider<testApiService>;

  private readonly baseUrl = "/api/supply_points";

  private getRouteWithSupplyPointId(supply_pointId: Id) {
    return this.baseUrl + "/" + supply_pointId;
  }

  async supply_points(input: Filters<FilterSupplyPointModel, SortSupplyPoint>): Promise<Page<SupplyPointModel>> {
    const service = await this.apiServiceProvider();
    const queryParams = fromFiltersToQueryParams({ filters: input, modelClass: FiltersSupplyPointDataModel, sortClass: SortSupplyPointDataModel });

    const res = await service.get<Record<string, unknown>>(this.baseUrl + queryParams);
    return fromJsonPage<SupplyPointDataModel, SupplyPointModel>(SupplyPointDataModel, res).toDomain();
  }

  async create(input: CreateSupplyPointModel): Promise<void> {
    const data = new CreateSupplyPointDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl, { data: data.toJson() });
  }

  async detailSupplyPoint(supply_pointId: Id): Promise<DetailSupplyPointModel> {
    const service = await this.apiServiceProvider();
    const response = await service.get(this.getRouteWithSupplyPointId(supply_pointId));
    const dataModel = fromJson(DetailSupplyPointDataModel, response);
    return dataModel.toDomain();
  }

  async deleteSupplyPoint(supply_pointId: Id): Promise<void> {
    return await this.deleteMany([supply_pointId]);
  }

  async editSupplyPoint(input: CreateSupplyPointModel, id: Id): Promise<DetailSupplyPointModel> {
    const data = new CreateSupplyPointDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    const response = await service.put(this.getRouteWithSupplyPointId(id), { data: data.toJson() });
    const dataModel = fromJson(DetailSupplyPointDataModel, response);
    return dataModel.toDomain();
  }

  async patchSupplyPoint(input: AtLeast<PatchSupplyPointModel, "id">): Promise<SupplyPointModel> {
    const service = await this.apiServiceProvider();
    const data = new PatchSupplyPointDataModel();
    data.fromDomain(input);
    const response = await service.patch(this.getRouteWithSupplyPointId(input.id), { data: data.toJson() });
    const dataModel = fromJson(SupplyPointDataModel, response);
    return dataModel.toDomain();
  }

  async exportToFile({ filters, ids, format }: ExportArgumentsModel<FilterSupplyPointModel, SortSupplyPoint>): Promise<FileModel> {
    const service = await this.apiServiceProvider();

    const queryParams = getExportQueryParams({ filters, ids, modelClass: FiltersSupplyPointDataModel, sortClass: SortSupplyPointDataModel });
    const formatAsPath = getExportFormatAsPath(format);

    const data: string = await service.post(this.baseUrl + EXPORT + formatAsPath + queryParams);
    return new FileModel({ data, name: createFileName("saving_studies", format) });
  }

  async deleteMany(ids: Id[]): Promise<void> {
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl + DELETE, { data: { ids } });
  }
}
