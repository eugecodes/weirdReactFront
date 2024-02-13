import type { AtLeast, Id } from "@/src/common/utils/types";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { FilterRateTypeModel } from "@/src/core/rate_type/domain/models/filter_rate_type_model";
import type { CreateRateTypeModel } from "@/src/core/rate_type/domain/models/create_rate_type_model";
import type { PatchRateTypeModel } from "@/src/core/rate_type/domain/models/patch_rate_type_model";
import type { RateTypeModel } from "@/src/core/rate_type/domain/models/rate_type_model";
import type { SortRateType } from "./sort_rate_type";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { FileModel } from "@/src/core/app/domain/models/file";

export interface IRateTypeRepository {
  rateTypes(filters: Filters<FilterRateTypeModel, SortRateType>): Promise<Page<RateTypeModel>>;
  create(input: CreateRateTypeModel): Promise<void>;
  detailRateType(rateTypeId: Id): Promise<RateTypeModel>;
  editRateType(input: CreateRateTypeModel, id: Id): Promise<RateTypeModel>;
  patchRateType(input: AtLeast<PatchRateTypeModel, "id">): Promise<RateTypeModel>;
  deleteRateType(rateTypeId: Id): Promise<void>;
  deleteMany(ids: Id[]): Promise<void>;
  exportToFile(filter: ExportArgumentsModel<FilterRateTypeModel, SortRateType>): Promise<FileModel>;
}
