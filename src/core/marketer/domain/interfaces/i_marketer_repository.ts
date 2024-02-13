import type { AtLeast, Id } from "@/src/common/utils/types";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { FilterMarketerModel } from "@/src/core/marketer/domain/models/filter_marketer_model";
import type { CreateMarketerModel } from "@/src/core/marketer/domain/models/create_marketer_model";
import type { PatchMarketerModel } from "@/src/core/marketer/domain/models/patch_marketer_model";
import type { MarketerModel } from "@/src/core/marketer/domain/models/marketer_model";
import type { SortMarketer } from "@/src/core/marketer/domain/interfaces/sort_marketer";
import type { DetailMarketerModel } from "@/src/core/marketer/domain/models/detail_marketer_model";
import type { EditMarketerModel } from "@/src/core/marketer/domain/models/edit_marketer_model";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { FileModel } from "@/src/core/app/domain/models/file";

export interface IMarketerRepository {
  marketers(filters: Filters<FilterMarketerModel, SortMarketer>): Promise<Page<MarketerModel>>;
  create(input: CreateMarketerModel): Promise<void>;
  detailMarketer(marketerId: Id): Promise<DetailMarketerModel>;
  editMarketer(input: EditMarketerModel, id: Id): Promise<DetailMarketerModel>;
  patchMarketer(input: AtLeast<PatchMarketerModel, "id">): Promise<void>;
  deleteMarketer(marketerId: Id): Promise<void>;
  deleteMany(ids: Id[]): Promise<void>;
  exportToFile(filter: ExportArgumentsModel<FilterMarketerModel, SortMarketer>): Promise<FileModel>;
}
