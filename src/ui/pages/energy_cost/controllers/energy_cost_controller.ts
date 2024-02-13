import type { ListController } from "@/src/common/interfaces/list_controller";
import type { MutationController } from "@/src/common/interfaces/mutation_controller";
import { withErrorHandler } from "@/src/common/utils/errors";
import type { AtLeast, Id } from "@/src/common/utils/types";
import type { Filters } from "@/src/core/app/domain/models/filters";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { SortEnergyCost } from "@/src/core/energy_cost/domain/interfaces/sort_energy_cost";
import type { CreateEnergyCostModel } from "@/src/core/energy_cost/domain/models/create_energy_cost_model";
import type { EnergyCostModel } from "@/src/core/energy_cost/domain/models/energy_cost_model";
import type { FilterEnergyCostModel } from "@/src/core/energy_cost/domain/models/filter_energy_cost_model";
import type { PatchEnergyCostModel } from "@/src/core/energy_cost/domain/models/patch_energy_cost_model";
import type { CreateEnergyCostUseCase } from "@/src/core/energy_cost/domain/use_cases/create_energy_cost_use_case";
import type { DeleteManyEnergyCostsUseCase } from "@/src/core/energy_cost/domain/use_cases/delete_many_energy_costs_use_case";
import type { ExportEnergyCostsUseCase } from "@/src/core/energy_cost/domain/use_cases/export_energy_costs_use_case";
import type { GetEnergyCostsUseCase } from "@/src/core/energy_cost/domain/use_cases/get_energy_costs_use_case";
import type { GetEnergyCostDetailUseCase } from "@/src/core/energy_cost/domain/use_cases/get_energy_cost_detail_use_case";
import type { PatchEnergyCostUseCase } from "@/src/core/energy_cost/domain/use_cases/patch_energy_cost_use_case";
import { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

export default class EnergyCostController
  implements ListController<EnergyCostModel, FilterEnergyCostModel, SortEnergyCost>, MutationController<EnergyCostModel>
{
  async getAll(filter: Filters<FilterEnergyCostModel, SortEnergyCost>) {
    const getUseCase = await locator.get<IocProvider<GetEnergyCostsUseCase>>(TYPES.GetEnergyCostsUseCase)();
    return await withErrorHandler(getUseCase.execute(filter));
  }

  async getOneById(id: Id) {
    const getDetailUseCase = await locator.get<IocProvider<GetEnergyCostDetailUseCase>>(TYPES.GetEnergyCostDetailUseCase)();
    return await withErrorHandler(getDetailUseCase.execute(id));
  }

  static async create(input: CreateEnergyCostModel) {
    const createEnergyCostUseCase = await locator.get<IocProvider<CreateEnergyCostUseCase>>(TYPES.CreateEnergyCostUseCase)();
    await withErrorHandler(createEnergyCostUseCase.execute(input));
  }

  static async patch(input: AtLeast<PatchEnergyCostModel, "id">) {
    const patchUseCase = await locator.get<IocProvider<PatchEnergyCostUseCase>>(TYPES.PatchEnergyCostUseCase)();
    return await withErrorHandler(patchUseCase.execute(input));
  }

  static async delete(id: Id) {
    const patchUseCase = await locator.get<IocProvider<PatchEnergyCostUseCase>>(TYPES.PatchEnergyCostUseCase)();
    await withErrorHandler(patchUseCase.delete(id));
  }

  static async toogleActive(id: Id, currentActiveValue: boolean) {
    const patchUseCase = await locator.get<IocProvider<PatchEnergyCostUseCase>>(TYPES.PatchEnergyCostUseCase)();
    await withErrorHandler(patchUseCase.toggleEnable(id, !currentActiveValue));
  }

  async deleteMany(ids: Id[]) {
    const deleteManyUseCase = await locator.get<IocProvider<DeleteManyEnergyCostsUseCase>>(TYPES.DeleteManyEnergyCostUseCase)();
    await withErrorHandler(deleteManyUseCase.execute(ids));
  }

  async export({ filters, ids }: ExportArgumentsModel<FilterEnergyCostModel, SortEnergyCost>) {
    const exportUseCase = await locator.get<IocProvider<ExportEnergyCostsUseCase>>(TYPES.ExportProfileUseCase)();
    const exportArguments = new ExportArgumentsModel({ filters, ids });
    return await withErrorHandler(exportUseCase.execute(exportArguments));
  }
}
