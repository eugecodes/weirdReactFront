import type { AtLeast, Id } from "@/src/common/utils/types";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { FilterRateModel } from "@/src/core/rate/domain/models/filter_rate_model";
import type { CreateRateModel } from "@/src/core/rate/domain/models/create_rate_model";
import type { PatchRateModel } from "@/src/core/rate/domain/models/patch_rate_model";
import type { RateModel } from "@/src/core/rate/domain/models/rate_model";
import type { SortRate } from "./sort_rate";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { FileModel } from "@/src/core/app/domain/models/file";

export interface IRateRepository {
  rates(filters: Filters<FilterRateModel, SortRate>): Promise<Page<RateModel>>;
  create(input: CreateRateModel): Promise<void>;
  detailRate(rateId: Id): Promise<RateModel>;
  editRate(input: CreateRateModel, id: Id): Promise<RateModel>;
  patchRate(input: AtLeast<PatchRateModel, "id">): Promise<RateModel>;
  deleteRate(rateId: Id): Promise<void>;
  deleteMany(ids: Id[]): Promise<void>;
  exportToFile(filter: ExportArgumentsModel<FilterRateModel, SortRate>): Promise<FileModel>;
}
