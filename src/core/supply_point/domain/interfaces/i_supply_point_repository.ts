import type { AtLeast, Id } from "@/src/common/utils/types";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { FilterSupplyPointModel } from "@/src/core/supply_point/domain/models/filter_supply_point_model";
import type { CreateSupplyPointModel } from "@/src/core/supply_point/domain/models/create_supply_point_model";
import type { EditSupplyPointModel } from "@/src/core/supply_point/domain/models/edit_supply_point_model";
import type { PatchSupplyPointModel } from "@/src/core/supply_point/domain/models/patch_supply_point_model";
import type { SupplyPointModel } from "@/src/core/supply_point/domain/models/supply_point_model";
import type { SortSupplyPoint } from "./sort_supply_point";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { FileModel } from "@/src/core/app/domain/models/file";
import type { DetailSupplyPointModel } from "@/src/core/supply_point/domain/models/detail_supply_point_model";

export interface ISupplyPointRepository {
  supply_points(filters: Filters<FilterSupplyPointModel, SortSupplyPoint>): Promise<Page<SupplyPointModel>>;
  create(input: CreateSupplyPointModel): Promise<void>;
  detailSupplyPoint(supply_pointId: Id): Promise<DetailSupplyPointModel>;
  editSupplyPoint(input: EditSupplyPointModel, id: Id): Promise<DetailSupplyPointModel>;
  patchSupplyPoint(input: AtLeast<PatchSupplyPointModel, "id">): Promise<SupplyPointModel>;
  deleteSupplyPoint(supply_pointId: Id): Promise<void>;
  deleteMany(ids: Id[]): Promise<void>;
  exportToFile(filter: ExportArgumentsModel<FilterSupplyPointModel, SortSupplyPoint>): Promise<FileModel>;
}
