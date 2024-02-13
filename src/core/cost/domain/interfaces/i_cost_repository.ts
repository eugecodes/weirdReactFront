import type { AtLeast, Id } from "@/src/common/utils/types";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { FilterCostModel } from "@/src/core/cost/domain/models/filter_cost_model";
import type { CreateCostModel } from "@/src/core/cost/domain/models/create_cost_model";
import type { PatchCostModel } from "@/src/core/cost/domain/models/patch_cost_model";
import type { CostModel } from "@/src/core/cost/domain/models/cost_model";
import type { SortCost } from "./sort_cost";
import type { DetailCostModel } from "@/src/core/cost/domain/models/detail_cost_model";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { FileModel } from "@/src/core/app/domain/models/file";

export interface ICostRepository {
  costs(filters: Filters<FilterCostModel, SortCost>): Promise<Page<CostModel>>;
  create(input: CreateCostModel): Promise<void>;
  detailCost(CostId: Id): Promise<DetailCostModel>;
  editCost(input: CreateCostModel, id: Id): Promise<DetailCostModel>;
  patchCost(input: AtLeast<PatchCostModel, "id">): Promise<CostModel>;
  deleteCost(CostId: Id): Promise<void>;
  deleteMany(ids: Id[]): Promise<void>;
  exportToFile(filter: ExportArgumentsModel<FilterCostModel, SortCost>): Promise<FileModel>;
}
