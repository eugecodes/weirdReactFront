import type { Filters } from "@/src/core/app/domain/models/filters";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { CreateCostModel } from "@/src/core/cost/domain/models/create_cost_model";
import type { FilterCostModel } from "@/src/core/cost/domain/models/filter_cost_model";
import type { SortCost } from "@/src/core/cost/domain/interfaces/sort_cost";
import type { CreateCostUseCase } from "@/src/core/cost/domain/use_cases/create_cost_use_case";
import type { GetCostsUseCase } from "@/src/core/cost/domain/use_cases/get_costs_use_case";
import type { GetCostDetailUseCase } from "@/src/core/cost/domain/use_cases/get_cost_detail_use_case";
import type { PatchCostUseCase } from "@/src/core/cost/domain/use_cases/patch_cost_use_case";
import type { EditCostUseCase } from "@/src/core/cost/domain/use_cases/edit_cost_use_case";
import type { Id } from "@/src/common/utils/types";
import type { DeleteManyCostsUseCase } from "@/src/core/cost/domain/use_cases/delete_many_costs_use_case";
import type { ExportCostsUseCase } from "@/src/core/cost/domain/use_cases/export_costs_use_case";
import type { ListController } from "@/src/common/interfaces/list_controller";
import type { CostModel } from "@/src/core/cost/domain/models/cost_model";
import type { MutationController } from "@/src/common/interfaces/mutation_controller";
import type { DetailCostModel } from "@/src/core/cost/domain/models/detail_cost_model";
import { withErrorHandler } from "@/src/common/utils/errors";
import { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

export default class CostController implements ListController<CostModel, FilterCostModel, SortCost>, MutationController<DetailCostModel> {
  async getAll(filter: Filters<FilterCostModel, SortCost>) {
    const costsUseCase = await locator.get<IocProvider<GetCostsUseCase>>(TYPES.GetCostsUseCase)();
    return await withErrorHandler(costsUseCase.execute(filter));
  }

  async getOneById(id: Id) {
    const getCostUseCase = await locator.get<IocProvider<GetCostDetailUseCase>>(TYPES.GetCostDetailUseCase)();
    return await withErrorHandler(getCostUseCase.execute(id));
  }

  static async create(input: CreateCostModel) {
    const createCostUseCase = await locator.get<IocProvider<CreateCostUseCase>>(TYPES.CreateCostUseCase)();
    await withErrorHandler(createCostUseCase.execute(input));
  }

  static async edit(input: CreateCostModel, id: Id) {
    const editCostUseCase = await locator.get<IocProvider<EditCostUseCase>>(TYPES.EditCostUseCase)();
    return await withErrorHandler(editCostUseCase.execute(input, id));
  }

  static async delete(id: Id) {
    const patchUseCase = await locator.get<IocProvider<PatchCostUseCase>>(TYPES.PatchCostUseCase)();
    await withErrorHandler(patchUseCase.delete(id));
  }

  async deleteMany(ids: Id[]) {
    const deleteManyUseCase = await locator.get<IocProvider<DeleteManyCostsUseCase>>(TYPES.DeleteManyCostUseCase)();
    await withErrorHandler(deleteManyUseCase.execute(ids));
  }

  async export({ filters, ids }: ExportArgumentsModel<FilterCostModel, SortCost>) {
    const exportUseCase = await locator.get<IocProvider<ExportCostsUseCase>>(TYPES.ExportCostUseCase)();
    const exportArguments = new ExportArgumentsModel({ filters, ids });
    return await withErrorHandler(exportUseCase.execute(exportArguments));
  }

  static async toogleActive(id: Id, currentActiveValue: boolean) {
    const patchUseCase = await locator.get<IocProvider<PatchCostUseCase>>(TYPES.PatchCostUseCase)();
    await withErrorHandler(patchUseCase.toggleEnable(id, !currentActiveValue));
  }
}
