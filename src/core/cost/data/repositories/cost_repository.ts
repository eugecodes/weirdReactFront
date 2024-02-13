import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { testApiService } from "@/src/core/app/data/services/test_api_service";
import type { AtLeast, Id } from "@/src/common/utils/types";
import { fromJson, fromJsonPage } from "@/src/common/utils/transformers";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { ICostRepository } from "@/src/core/cost/domain/interfaces/i_cost_repository";
import type { FilterCostModel } from "@/src/core/cost/domain/models/filter_cost_model";
import type { CreateCostModel } from "@/src/core/cost/domain/models/create_cost_model";
import type { PatchCostModel } from "@/src/core/cost/domain/models/patch_cost_model";
import type { CostModel } from "@/src/core/cost/domain/models/cost_model";
import { CostDataModel } from "@/src/core/cost/data/models/cost_data_model";
import { CreateCostDataModel } from "@/src/core/cost/data/models/create_cost_data_model";
import { FiltersCostDataModel } from "@/src/core/cost/data/models/filter_cost_data_model";
import { PatchCostDataModel } from "@/src/core/cost/data/models/patch_cost_data_model";
import type { SortCost } from "../../domain/interfaces/sort_cost";
import { SortCostDataModel } from "../models/sort_cost_data_model";
import { createFileName, fromFiltersToQueryParams, getExportFormatAsPath, getExportQueryParams } from "@/src/common/utils";
import { DELETE, EXPORT } from "@/src/common/utils/api_paths";
import type { DetailCostModel } from "@/src/core/cost/domain/models/detail_cost_model";
import { DetailCostDataModel } from "@/src/core/cost/data/models/detail_cost_data_model";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import { FileModel } from "@/src/core/app/domain/models/file";

@injectable()
export class CostRepository implements ICostRepository {
  @inject(TYPES.testApiService) private apiServiceProvider!: IocProvider<testApiService>;

  private readonly baseUrl = "/api/costs";

  private getRouteWithCostId(costId: Id) {
    return this.baseUrl + "/" + costId;
  }

  async costs(input: Filters<FilterCostModel, SortCost>): Promise<Page<CostModel>> {
    const service = await this.apiServiceProvider();
    const queryParams = fromFiltersToQueryParams({ filters: input, modelClass: FiltersCostDataModel, sortClass: SortCostDataModel });

    const res = await service.get<Record<string, unknown>>(this.baseUrl + queryParams);
    return fromJsonPage<CostDataModel, CostModel>(CostDataModel, res).toDomain();
  }

  async create(input: CreateCostModel): Promise<void> {
    const data = new CreateCostDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl, { data: data.toJson() });
  }

  async detailCost(costId: Id): Promise<DetailCostModel> {
    const service = await this.apiServiceProvider();
    const response = await service.get(this.getRouteWithCostId(costId));
    const dataModel = fromJson(DetailCostDataModel, response);
    return dataModel.toDomain();
  }
  async deleteCost(costId: Id): Promise<void> {
    await this.patchCost({ id: costId, deleted: true });
    return;
  }

  async editCost(input: CreateCostModel, id: Id): Promise<DetailCostModel> {
    const data = new CreateCostDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    const response = await service.put(this.getRouteWithCostId(id), { data: data.toJson() });
    const dataModel = fromJson(DetailCostDataModel, response);
    return dataModel.toDomain();
  }

  async patchCost(input: AtLeast<PatchCostModel, "id">): Promise<CostModel> {
    const service = await this.apiServiceProvider();
    const data = new PatchCostDataModel();
    data.fromDomain(input);

    const response = await service.patch(this.getRouteWithCostId(input.id), { data: data.toJson() });
    const dataModel = fromJson(CostDataModel, response);
    return dataModel.toDomain();
  }

  async exportToFile({ filters, ids, format }: ExportArgumentsModel<FilterCostModel, SortCost>): Promise<FileModel> {
    const service = await this.apiServiceProvider();

    const queryParams = getExportQueryParams({ filters, ids, modelClass: FiltersCostDataModel, sortClass: SortCostDataModel });
    const formatAsPath = getExportFormatAsPath(format);

    const data: string = await service.post(this.baseUrl + EXPORT + formatAsPath + queryParams);
    return new FileModel({ data, name: createFileName("costs", format) });
  }

  async deleteMany(ids: Id[]): Promise<void> {
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl + DELETE, { data: { ids } });
  }
}
