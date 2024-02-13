import type { AtLeast, Id } from "@/src/common/utils/types";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { FilterCommissionModel } from "@/src/core/commission/domain/models/filter_commission_model";
import type { CreateCommissionModel } from "@/src/core/commission/domain/models/create_commission_model";
import type { PatchCommissionModel } from "@/src/core/commission/domain/models/patch_commission_model";
import type { CommissionModel } from "@/src/core/commission/domain/models/commission_model";
import type { SortCommission } from "./sort_commission";
import type { DetailCommissionModel } from "@/src/core/commission/domain/models/detail_commission_model";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { FileModel } from "@/src/core/app/domain/models/file";

export interface ICommissionRepository {
  commissions(filters: Filters<FilterCommissionModel, SortCommission>): Promise<Page<CommissionModel>>;
  create(input: CreateCommissionModel): Promise<void>;
  detailCommission(CommissionId: Id): Promise<DetailCommissionModel>;
  editCommission(input: CreateCommissionModel, id: Id): Promise<DetailCommissionModel>;
  patchCommission(input: AtLeast<PatchCommissionModel, "id">): Promise<CommissionModel>;
  deleteCommission(CommissionId: Id): Promise<void>;
  deleteMany(ids: Id[]): Promise<void>;
  exportToFile(filter: ExportArgumentsModel<FilterCommissionModel, SortCommission>): Promise<FileModel>;
}
