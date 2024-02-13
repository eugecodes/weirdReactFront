import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { testApiService } from "@/src/core/app/data/services/test_api_service";
import type { AtLeast, Id } from "@/src/common/utils/types";
import { fromJson, fromJsonPage } from "@/src/common/utils/transformers";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { IContractRepository } from "@/src/core/contract/domain/interfaces/i_contract_repository";
import type { FilterContractModel } from "@/src/core/contract/domain/models/filter_contract_model";
import type { CreateContractModel } from "@/src/core/contract/domain/models/create_contract_model";
import type { PatchContractModel } from "@/src/core/contract/domain/models/patch_contract_model";
import type { ContractModel } from "@/src/core/contract/domain/models/contract_model";
import { ContractDataModel } from "@/src/core/contract/data/models/contract_data_model";
import { CreateContractDataModel } from "@/src/core/contract/data/models/create_contract_data_model";
import { FiltersContractDataModel } from "@/src/core/contract/data/models/filter_contract_data_model";
import { PatchContractDataModel } from "@/src/core/contract/data/models/patch_contract_data_model";
import type { SortContract } from "@/src/core/contract/domain/interfaces/sort_contract";
import { SortContractDataModel } from "../models/sort_contract_data_model";
import { createFileName, fromFiltersToQueryParams, getExportFormatAsPath, getExportQueryParams } from "@/src/common/utils";
import { DELETE, EXPORT } from "@/src/common/utils/api_paths";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import { FileModel } from "@/src/core/app/domain/models/file";
import type { DetailContractModel } from "@/src/core/contract/domain/models/detail_contract_model";
import { DetailContractDataModel } from "@/src/core/contract/data/models/detail_contract_data_model";
import type { EditContractModel } from "@/src/core/contract/domain/models/edit_contract_model";
import { EditContractDataModel } from "../models/edit_contract_data_model";

@injectable()
export class ContractRepository implements IContractRepository {
  @inject(TYPES.testApiService) private apiServiceProvider!: IocProvider<testApiService>;

  private readonly baseUrl = "/api/contracts";

  private getRouteWithContractId(contractId: Id) {
    return this.baseUrl + "/" + contractId;
  }

  async contracts(input: Filters<FilterContractModel, SortContract>): Promise<Page<ContractModel>> {
    const service = await this.apiServiceProvider();
    const queryParams = fromFiltersToQueryParams({
      filters: input,
      modelClass: FiltersContractDataModel,
      sortClass: SortContractDataModel
    });

    const res = await service.get<Record<string, unknown>>(this.baseUrl + queryParams);
    return fromJsonPage<ContractDataModel, ContractModel>(ContractDataModel, res).toDomain();
  }

  async create(input: CreateContractModel): Promise<void> {
    const data = new CreateContractDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl, { data: data.toJson() });
  }

  async detailContract(contractId: Id): Promise<DetailContractModel> {
    const service = await this.apiServiceProvider();
    const response = await service.get(this.getRouteWithContractId(contractId));
    const dataModel = fromJson(DetailContractDataModel, response);
    return dataModel.toDomain();
  }

  async deleteContract(contractId: Id): Promise<void> {
    return await this.deleteMany([contractId]);
  }

  async editContract(input: EditContractModel, id: Id): Promise<DetailContractModel> {
    const data = new EditContractDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    const response = await service.put(this.getRouteWithContractId(id), { data: data.toJson() });
    const dataModel = fromJson(DetailContractDataModel, response);
    return dataModel.toDomain();
  }

  async patchContract(input: AtLeast<PatchContractModel, "id">): Promise<ContractModel> {
    const service = await this.apiServiceProvider();
    const data = new PatchContractDataModel();
    data.fromDomain(input);
    const response = await service.patch(this.getRouteWithContractId(input.id), { data: data.toJson() });
    const dataModel = fromJson(ContractDataModel, response);
    return dataModel.toDomain();
  }

  async exportToFile({ filters, ids, format }: ExportArgumentsModel<FilterContractModel, SortContract>): Promise<FileModel> {
    const service = await this.apiServiceProvider();

    const queryParams = getExportQueryParams({
      filters,
      ids,
      modelClass: FiltersContractDataModel,
      sortClass: SortContractDataModel
    });
    const formatAsPath = getExportFormatAsPath(format);

    const data: string = await service.post(this.baseUrl + EXPORT + formatAsPath + queryParams);
    return new FileModel({ data, name: createFileName("saving_studies", format) });
  }

  async deleteMany(ids: Id[]): Promise<void> {
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl + DELETE, { data: { ids } });
  }
}
