import type { AtLeast, Id } from "@/src/common/utils/types";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { FilterMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/filter_marketer_margin_model";
import type { CreateMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/create_marketer_margin_model";
import type { PatchMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/patch_marketer_margin_model";
import type { MarketerMarginModel } from "@/src/core/marketer_margin/domain/models/marketer_margin_model";
import type { SortMarketerMargin } from "@/src/core/marketer_margin/domain/interfaces/sort_marketer_margin";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { FileModel } from "@/src/core/app/domain/models/file";

export interface IMarketerMarginRepository {
  marketerMargins(filters: Filters<FilterMarketerMarginModel, SortMarketerMargin>): Promise<Page<MarketerMarginModel>>;
  create(input: CreateMarketerMarginModel): Promise<void>;
  detailMarketerMargin(rateTypeId: Id): Promise<MarketerMarginModel>;
  editMarketerMargin(input: CreateMarketerMarginModel, id: Id): Promise<MarketerMarginModel>;
  patchMarketerMargin(input: AtLeast<PatchMarketerMarginModel, "id">): Promise<MarketerMarginModel>;
  deleteMarketerMargin(rateTypeId: Id): Promise<void>;
  deleteMany(ids: Id[]): Promise<void>;
  exportToFile(filter: ExportArgumentsModel<FilterMarketerMarginModel, SortMarketerMargin>): Promise<FileModel>;
}
