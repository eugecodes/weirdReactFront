import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { testApiService } from "@/src/core/app/data/services/test_api_service";
import type { AtLeast, Id } from "@/src/common/utils/types";
import { fromJson, fromJsonPage } from "@/src/common/utils/transformers";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { ICommissionRepository } from "@/src/core/commission/domain/interfaces/i_commission_repository";
import type { FilterCommissionModel } from "@/src/core/commission/domain/models/filter_commission_model";
import type { CreateCommissionModel } from "@/src/core/commission/domain/models/create_commission_model";
import type { PatchCommissionModel } from "@/src/core/commission/domain/models/patch_commission_model";
import type { CommissionModel } from "@/src/core/commission/domain/models/commission_model";
import { CommissionDataModel } from "@/src/core/commission/data/models/commission_data_model";
import { CreateCommissionDataModel } from "@/src/core/commission/data/models/create_commission_data_model";
import { FiltersCommissionDataModel } from "@/src/core/commission/data/models/filter_commission_data_model";
import { PatchCommissionDataModel } from "@/src/core/commission/data/models/patch_commission_data_model";
import type { SortCommission } from "../../domain/interfaces/sort_commission";
import { SortCommissionDataModel } from "../models/sort_commission_data_model";
import { createFileName, fromFiltersToQueryParams, getExportFormatAsPath, getExportQueryParams } from "@/src/common/utils";
import { DELETE, EXPORT } from "@/src/common/utils/api_paths";
import type { DetailCommissionModel } from "@/src/core/commission/domain/models/detail_commission_model";
import { DetailCommissionDataModel } from "@/src/core/commission/data/models/detail_commission_data_model";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import { FileModel } from "@/src/core/app/domain/models/file";

@injectable()
export class CommissionRepository implements ICommissionRepository {
  @inject(TYPES.testApiService) private apiServiceProvider!: IocProvider<testApiService>;

  private readonly baseUrl = "/api/commissions";

  private getRouteWithCommissionId(commissionId: Id) {
    return this.baseUrl + "/" + commissionId;
  }

  async commissions(input: Filters<FilterCommissionModel, SortCommission>): Promise<Page<CommissionModel>> {
    const service = await this.apiServiceProvider();
    const queryParams = fromFiltersToQueryParams({ filters: input, modelClass: FiltersCommissionDataModel, sortClass: SortCommissionDataModel });

    const res = await service.get<Record<string, unknown>>(this.baseUrl + queryParams);
    return fromJsonPage<CommissionDataModel, CommissionModel>(CommissionDataModel, res).toDomain();
  }

  async create(input: CreateCommissionModel): Promise<void> {
    const data = new CreateCommissionDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl, { data: data.toJson() });
  }

  async detailCommission(commissionId: Id): Promise<DetailCommissionModel> {
    const service = await this.apiServiceProvider();
    const response = await service.get(this.getRouteWithCommissionId(commissionId));
    const dataModel = fromJson(DetailCommissionDataModel, response);
    return dataModel.toDomain();
  }
  async deleteCommission(commissionId: Id): Promise<void> {
    await this.patchCommission({ id: commissionId, deleted: true });
    return;
  }

  async editCommission(input: CreateCommissionModel, id: Id): Promise<DetailCommissionModel> {
    const data = new CreateCommissionDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    const response = await service.put(this.getRouteWithCommissionId(id), { data: data.toJson() });
    const dataModel = fromJson(DetailCommissionDataModel, response);
    return dataModel.toDomain();
  }

  async patchCommission(input: AtLeast<PatchCommissionModel, "id">): Promise<CommissionModel> {
    const service = await this.apiServiceProvider();
    const data = new PatchCommissionDataModel();
    data.fromDomain(input);

    const response = await service.patch(this.getRouteWithCommissionId(input.id), { data: data.toJson() });
    const dataModel = fromJson(CommissionDataModel, response);
    return dataModel.toDomain();
  }

  async exportToFile({ filters, ids, format }: ExportArgumentsModel<FilterCommissionModel, SortCommission>): Promise<FileModel> {
    const service = await this.apiServiceProvider();

    const queryParams = getExportQueryParams({ filters, ids, modelClass: FiltersCommissionDataModel, sortClass: SortCommissionDataModel });
    const formatAsPath = getExportFormatAsPath(format);

    const data: string = await service.post(this.baseUrl + EXPORT + formatAsPath + queryParams);
    return new FileModel({ data, name: createFileName("commissions", format) });
  }

  async deleteMany(ids: Id[]): Promise<void> {
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl + DELETE, { data: { ids } });
  }
}
