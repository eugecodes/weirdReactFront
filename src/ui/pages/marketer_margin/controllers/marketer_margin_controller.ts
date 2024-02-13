import type { Filters } from "@/src/core/app/domain/models/filters";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { CreateMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/create_marketer_margin_model";
import type { FilterMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/filter_marketer_margin_model";
import type { SortMarketerMargin } from "@/src/core/marketer_margin/domain/interfaces/sort_marketer_margin";
import type { CreateMarketerMarginUseCase } from "@/src/core/marketer_margin/domain/use_cases/create_marketer_margin_use_case";
import type { GetMarketerMarginsUseCase } from "@/src/core/marketer_margin/domain/use_cases/get_marketer_margins_use_case";
import type { GetMarketerMarginDetailUseCase } from "@/src/core/marketer_margin/domain/use_cases/get_marketer_margin_detail_use_case";
import type { PatchMarketerMarginUseCase } from "@/src/core/marketer_margin/domain/use_cases/patch_marketer_margin_use_case";
import type { EditMarketerMarginUseCase } from "@/src/core/marketer_margin/domain/use_cases/edit_marketer_margin_use_case";
import type { Id } from "@/src/common/utils/types";
import type { DeleteManyMarketerMarginsUseCase } from "@/src/core/marketer_margin/domain/use_cases/delete_many_marketer_margins_use_case";
import type { ExportMarketerMarginsUseCase } from "@/src/core/marketer_margin/domain/use_cases/export_marketer_margins_use_case";
import type { ListController } from "@/src/common/interfaces/list_controller";
import type { MarketerMarginModel } from "@/src/core/marketer_margin/domain/models/marketer_margin_model";
import type { MutationController } from "@/src/common/interfaces/mutation_controller";
import { withErrorHandler } from "@/src/common/utils/errors";
import { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

export default class MarketerMarginController
  implements ListController<MarketerMarginModel, FilterMarketerMarginModel, SortMarketerMargin>, MutationController<MarketerMarginModel>
{
  async getAll(filter: Filters<FilterMarketerMarginModel, SortMarketerMargin>) {
    const marketerMarginsUseCase = await locator.get<IocProvider<GetMarketerMarginsUseCase>>(TYPES.GetMarketerMarginsUseCase)();
    return await withErrorHandler(marketerMarginsUseCase.execute(filter));
  }

  async getOneById(id: Id) {
    const getMarketerMarginUseCase = await locator.get<IocProvider<GetMarketerMarginDetailUseCase>>(TYPES.GetMarketerMarginDetailUseCase)();
    return await withErrorHandler(getMarketerMarginUseCase.execute(id));
  }

  static async create(input: CreateMarketerMarginModel) {
    const createMarketerMarginUseCase = await locator.get<IocProvider<CreateMarketerMarginUseCase>>(TYPES.CreateMarketerMarginUseCase)();

    await withErrorHandler(createMarketerMarginUseCase.execute(input));
  }

  static async edit(input: CreateMarketerMarginModel, id: Id) {
    const editMarketerMarginUseCase = await locator.get<IocProvider<EditMarketerMarginUseCase>>(TYPES.EditMarketerMarginUseCase)();
    return await withErrorHandler(editMarketerMarginUseCase.execute(input, id));
  }

  static async delete(id: Id) {
    const patchUseCase = await locator.get<IocProvider<PatchMarketerMarginUseCase>>(TYPES.PatchMarketerMarginUseCase)();
    await withErrorHandler(patchUseCase.delete(id));
  }

  async deleteMany(ids: Id[]) {
    const deleteManyUseCase = await locator.get<IocProvider<DeleteManyMarketerMarginsUseCase>>(TYPES.DeleteManyMarketerMarginUseCase)();
    await withErrorHandler(deleteManyUseCase.execute(ids));
  }

  async export({ filters, ids }: ExportArgumentsModel<FilterMarketerMarginModel, SortMarketerMargin>) {
    const exportUseCase = await locator.get<IocProvider<ExportMarketerMarginsUseCase>>(TYPES.ExportMarketerMarginUseCase)();
    const exportArguments = new ExportArgumentsModel({ filters, ids });
    return await withErrorHandler(exportUseCase.execute(exportArguments));
  }
}
