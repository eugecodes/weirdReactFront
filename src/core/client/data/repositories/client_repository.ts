import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { testApiService } from "@/src/core/app/data/services/test_api_service";
import type { AtLeast, Id } from "@/src/common/utils/types";
import { fromJson, fromJsonPage } from "@/src/common/utils/transformers";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { IClientRepository } from "@/src/core/client/domain/interfaces/i_client_repository";
import type { FilterClientModel } from "@/src/core/client/domain/models/filter_client_model";
import type { CreateClientModel } from "@/src/core/client/domain/models/create_client_model";
import type { PatchClientModel } from "@/src/core/client/domain/models/patch_client_model";
import type { ClientModel } from "@/src/core/client/domain/models/client_model";
import { ClientDataModel } from "@/src/core/client/data/models/client_data_model";
import { CreateClientDataModel } from "@/src/core/client/data/models/create_client_data_model";
import { FiltersClientDataModel } from "@/src/core/client/data/models/filter_client_data_model";
import { PatchClientDataModel } from "@/src/core/client/data/models/patch_client_data_model";
import type { SortClient } from "@/src/core/client/domain/interfaces/sort_client";
import { SortClientDataModel } from "../models/sort_client_data_model";
import { createFileName, fromFiltersToQueryParams, getExportFormatAsPath, getExportQueryParams } from "@/src/common/utils";
import { DELETE, EXPORT } from "@/src/common/utils/api_paths";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import { FileModel } from "@/src/core/app/domain/models/file";
import type { DetailClientModel } from "@/src/core/client/domain/models/detail_client_model";
import { DetailClientDataModel } from "@/src/core/client/data/models/detail_client_data_model";
import type { EditClientModel } from "@/src/core/client/domain/models/edit_client_model";
import { EditClientDataModel } from "@/src/core/client/data/models/edit_client_data_model";

@injectable()
export class ClientRepository implements IClientRepository {
  @inject(TYPES.testApiService) private apiServiceProvider!: IocProvider<testApiService>;

  private readonly baseUrl = "/api/clients";

  private getRouteWithClientId(clientId: Id) {
    return this.baseUrl + "/" + clientId;
  }

  async clients(input: Filters<FilterClientModel, SortClient>): Promise<Page<ClientModel>> {
    const service = await this.apiServiceProvider();
    const queryParams = fromFiltersToQueryParams({ filters: input, modelClass: FiltersClientDataModel, sortClass: SortClientDataModel });

    const res = await service.get<Record<string, unknown>>(this.baseUrl + queryParams);
    return fromJsonPage<ClientDataModel, ClientModel>(ClientDataModel, res).toDomain();
  }

  async create(input: CreateClientModel): Promise<void> {
    const data = new CreateClientDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl, { data: data.toJson() });
  }

  async detailClient(clientId: Id): Promise<DetailClientModel> {
    const service = await this.apiServiceProvider();
    const response = await service.get(this.getRouteWithClientId(clientId));
    const dataModel = fromJson(DetailClientDataModel, response);
    return dataModel.toDomain();
  }

  async deleteClient(clientId: Id): Promise<void> {
    return await this.deleteMany([clientId]);
  }

  async editClient(input: EditClientModel, id: Id): Promise<DetailClientModel> {
    const data = new EditClientDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    const response = await service.put(this.getRouteWithClientId(id), { data: data.toJson() });
    const dataModel = fromJson(DetailClientDataModel, response);
    return dataModel.toDomain();
  }

  async patchClient(input: AtLeast<PatchClientModel, "id">): Promise<ClientModel> {
    const service = await this.apiServiceProvider();
    const data = new PatchClientDataModel();
    data.fromDomain(input);
    const response = await service.patch(this.getRouteWithClientId(input.id), { data: data.toJson() });
    const dataModel = fromJson(ClientDataModel, response);
    return dataModel.toDomain();
  }

  async exportToFile({ filters, ids, format }: ExportArgumentsModel<FilterClientModel, SortClient>): Promise<FileModel> {
    const service = await this.apiServiceProvider();

    const queryParams = getExportQueryParams({ filters, ids, modelClass: FiltersClientDataModel, sortClass: SortClientDataModel });
    const formatAsPath = getExportFormatAsPath(format);

    const data: string = await service.post(this.baseUrl + EXPORT + formatAsPath + queryParams);
    return new FileModel({ data, name: createFileName("saving_studies", format) });
  }

  async deleteMany(ids: Id[]): Promise<void> {
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl + DELETE, { data: { ids } });
  }
}
