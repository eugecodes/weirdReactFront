import { Filters } from "@/src/core/app/domain/models/filters";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { CreateMarketerModel } from "@/src/core/marketer/domain/models/create_marketer_model";
import type { FilterMarketerModel } from "@/src/core/marketer/domain/models/filter_marketer_model";
import type { SortMarketer } from "@/src/core/marketer/domain/interfaces/sort_marketer";
import type { CreateMarketerUseCase } from "@/src/core/marketer/domain/use_cases/create_marketer_use_case";
import type { GetMarketersUseCase } from "@/src/core/marketer/domain/use_cases/get_marketers_use_case";
import type { GetMarketerDetailUseCase } from "@/src/core/marketer/domain/use_cases/get_marketer_detail_use_case";
import type { PatchMarketerUseCase } from "@/src/core/marketer/domain/use_cases/patch_marketer_use_case";
import type { EditMarketerUseCase } from "@/src/core/marketer/domain/use_cases/edit_marketer_use_case";
import type { EditMarketerModel } from "@/src/core/marketer/domain/models/edit_marketer_model";
import type { Id } from "@/src/common/utils/types";
import type { ExportMarketerUseCase } from "@/src/core/marketer/domain/use_cases/export_marketer_use_case";
import type { DeleteManyMarketerUseCase } from "@/src/core/marketer/domain/use_cases/delete_many_marketer_use_case";
import type { ListController } from "@/src/common/interfaces/list_controller";
import type { MarketerModel } from "@/src/core/marketer/domain/models/marketer_model";
import type { MutationController } from "@/src/common/interfaces/mutation_controller";
import { withErrorHandler } from "@/src/common/utils/errors";
import { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { SortMarketerMargin } from "@/src/core/marketer_margin/domain/interfaces/sort_marketer_margin";

export default class MarketerController
  implements ListController<MarketerModel, FilterMarketerModel, SortMarketer>, MutationController<MarketerModel>
{
  async getAll(filter: Filters<FilterMarketerModel, SortMarketer>) {
    const marketersUseCase = await locator.get<IocProvider<GetMarketersUseCase>>(TYPES.GetMarketersUseCase)();
    return await withErrorHandler(marketersUseCase.execute(filter));
  }

  static async getAllByName(item: { name: string; enabled?: boolean }) {
    const filters = new Filters<FilterMarketerModel, SortMarketer>({ item });
    const getUseCase = await locator.get<IocProvider<GetMarketersUseCase>>(TYPES.GetMarketersUseCase)();
    return await withErrorHandler(getUseCase.execute(filters));
  }

  async getOneById(id: Id) {
    const getMarketerUseCase = await locator.get<IocProvider<GetMarketerDetailUseCase>>(TYPES.GetMarketerDetailUseCase)();
    return await withErrorHandler(getMarketerUseCase.execute(id));
  }

  static async create(input: CreateMarketerModel) {
    const createMarketerUseCase = await locator.get<IocProvider<CreateMarketerUseCase>>(TYPES.CreateMarketerUseCase)();

    await withErrorHandler(createMarketerUseCase.execute(input));
  }

  static async edit(input: EditMarketerModel, id: Id) {
    const editMarketerUseCase = await locator.get<IocProvider<EditMarketerUseCase>>(TYPES.EditMarketerUseCase)();
    return await withErrorHandler(editMarketerUseCase.execute(input, id));
  }

  static async delete(id: Id) {
    const patchUseCase = await locator.get<IocProvider<PatchMarketerUseCase>>(TYPES.PatchMarketerUseCase)();
    await withErrorHandler(patchUseCase.delete(id));
  }

  static async toogleActive(id: Id, currentActiveValue: boolean) {
    const patchUseCase = await locator.get<IocProvider<PatchMarketerUseCase>>(TYPES.PatchMarketerUseCase)();
    await patchUseCase.toggleEnable(id, !currentActiveValue);
  }

  async deleteMany(ids: Id[]) {
    const deleteManyUseCase = await locator.get<IocProvider<DeleteManyMarketerUseCase>>(TYPES.DeleteManyMarketerUseCase)();
    await withErrorHandler(deleteManyUseCase.execute(ids));
  }

  async export({ filters, ids }: ExportArgumentsModel<FilterMarketerModel, SortMarketerMargin>) {
    const exportUseCase = await locator.get<IocProvider<ExportMarketerUseCase>>(TYPES.ExportMarketerUseCase)();
    const exportArguments = new ExportArgumentsModel({ filters, ids });
    return await withErrorHandler(exportUseCase.execute(exportArguments));
  }
}
