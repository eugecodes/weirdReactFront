import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { testApiService } from "@/src/core/app/data/services/test_api_service";
import type { AtLeast, Id } from "@/src/common/utils/types";
import { fromJson, fromJsonPage } from "@/src/common/utils/transformers";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { IEnergyCostRepository } from "@/src/core/energy_cost/domain/interfaces/i_energy_cost_repository";
import type { FilterEnergyCostModel } from "@/src/core/energy_cost/domain/models/filter_energy_cost_model";
import type { CreateEnergyCostModel } from "@/src/core/energy_cost/domain/models/create_energy_cost_model";
import type { PatchEnergyCostModel } from "@/src/core/energy_cost/domain/models/patch_energy_cost_model";
import type { EnergyCostModel } from "@/src/core/energy_cost/domain/models/energy_cost_model";
import { EnergyCostDataModel } from "@/src/core/energy_cost/data/models/energy_cost_data_model";
import { CreateEnergyCostDataModel } from "@/src/core/energy_cost/data/models/create_energy_cost_data_model";
import { FiltersEnergyCostDataModel } from "@/src/core/energy_cost/data/models/filter_energy_cost_data_model";
import { PatchEnergyCostDataModel } from "@/src/core/energy_cost/data/models/patch_energy_cost_data_model";
import type { SortEnergyCost } from "../../domain/interfaces/sort_energy_cost";
import { SortEnergyCostDataModel } from "../models/sort_energy_cost_data_model";
import { createFileName, fromFiltersToQueryParams, getExportFormatAsPath, getExportQueryParams } from "@/src/common/utils";
import { DELETE, EXPORT } from "@/src/common/utils/api_paths";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import { FileModel } from "@/src/core/app/domain/models/file";

@injectable()
export class EnergyCostRepository implements IEnergyCostRepository {
  @inject(TYPES.testApiService) private apiServiceProvider!: IocProvider<testApiService>;

  private readonly baseUrl = "/api/energy-costs";

  private getRouteWithEnergyCostId(energyCostId: Id) {
    return this.baseUrl + "/" + energyCostId;
  }

  async energyCosts(input: Filters<FilterEnergyCostModel, SortEnergyCost>): Promise<Page<EnergyCostModel>> {
    const service = await this.apiServiceProvider();
    const queryParams = fromFiltersToQueryParams({ filters: input, modelClass: FiltersEnergyCostDataModel, sortClass: SortEnergyCostDataModel });

    const res = await service.get<Record<string, unknown>>(this.baseUrl + queryParams);
    return fromJsonPage<EnergyCostDataModel, EnergyCostModel>(EnergyCostDataModel, res).toDomain();
  }

  async create(input: CreateEnergyCostModel): Promise<void> {
    const data = new CreateEnergyCostDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl, { data: data.toJson() });
  }

  async detailEnergyCost(energyCostId: Id): Promise<EnergyCostModel> {
    const service = await this.apiServiceProvider();
    const response = await service.get(this.getRouteWithEnergyCostId(energyCostId));
    const dataModel = fromJson(EnergyCostDataModel, response);
    return dataModel.toDomain();
  }
  async deleteEnergyCost(energyCostId: Id): Promise<void> {
    await this.patchEnergyCost({ id: energyCostId, deleted: true });
    return;
  }

  async editEnergyCost(input: CreateEnergyCostModel, id: Id): Promise<EnergyCostModel> {
    const data = new CreateEnergyCostDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    const response = await service.put(this.getRouteWithEnergyCostId(id), { data: data.toJson() });
    const dataModel = fromJson(EnergyCostDataModel, response);
    return dataModel.toDomain();
  }

  async patchEnergyCost(input: AtLeast<PatchEnergyCostModel, "id">): Promise<EnergyCostModel> {
    const service = await this.apiServiceProvider();
    const data = new PatchEnergyCostDataModel();
    data.fromDomain(input);

    const response = await service.patch(this.getRouteWithEnergyCostId(input.id), { data: data.toJson() });
    const dataModel = fromJson(EnergyCostDataModel, response);
    return dataModel.toDomain();
  }

  async exportToFile({ filters, ids, format }: ExportArgumentsModel<FilterEnergyCostModel, SortEnergyCost>): Promise<FileModel> {
    const service = await this.apiServiceProvider();

    const queryParams = getExportQueryParams({ filters, ids, modelClass: FiltersEnergyCostDataModel, sortClass: SortEnergyCostDataModel });
    const formatAsPath = getExportFormatAsPath(format);

    const data: string = await service.post(this.baseUrl + EXPORT + formatAsPath + queryParams);
    return new FileModel({ data, name: createFileName("energy_costs", format) });
  }

  async deleteMany(ids: Id[]): Promise<void> {
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl + DELETE, { data: { ids } });
  }
}
