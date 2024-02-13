import { Filters } from "@/src/core/app/domain/models/filters";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { CreateSupplyPointModel } from "@/src/core/supply_point/domain/models/create_supply_point_model";
import type { FilterSupplyPointModel } from "@/src/core/supply_point/domain/models/filter_supply_point_model";
import type { SortSupplyPoint } from "@/src/core/supply_point/domain/interfaces/sort_supply_point";
import type { CreateSupplyPointUseCase } from "@/src/core/supply_point/domain/use_cases/create_supply_point_use_case";
import type { GetSupplyPointDetailUseCase } from "@/src/core/supply_point/domain/use_cases/get_supply_point_detail_use_case";
import type { PatchSupplyPointUseCase } from "@/src/core/supply_point/domain/use_cases/patch_supply_point_use_case";
import type { EditSupplyPointUseCase } from "@/src/core/supply_point/domain/use_cases/edit_supply_point_use_case";
import type { Id } from "@/src/common/utils/types";
import type { DeleteManySupplyPointsUseCase } from "@/src/core/supply_point/domain/use_cases/delete_many_supply_points_use_case";
import type { ExportSupplyPointsUseCase } from "@/src/core/supply_point/domain/use_cases/export_supply_points_use_case";
import type { ListController } from "@/src/common/interfaces/list_controller";
import type { SupplyPointModel } from "@/src/core/supply_point/domain/models/supply_point_model";
import type { MutationController } from "@/src/common/interfaces/mutation_controller";
import { withErrorHandler } from "@/src/common/utils/errors";
import { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { GetSupplyPointsUseCase } from "@/src/core/supply_point/domain/use_cases/get_supply_points_use_case";
import type { EditSupplyPointModel } from "@/src/core/supply_point/domain/models/edit_supply_point_model";

export default class SupplyPointController
  implements ListController<SupplyPointModel, FilterSupplyPointModel, SortSupplyPoint>, MutationController<SupplyPointModel>
{
  async getAll(filter: Filters<FilterSupplyPointModel, SortSupplyPoint>) {
    const supply_pointsUseCase = await locator.get<IocProvider<GetSupplyPointsUseCase>>(TYPES.GetSupplyPointsUseCase)();
    return await withErrorHandler(supply_pointsUseCase.execute(filter));
  }

  static async getAllByName(item: FilterSupplyPointModel) {
    const filters = new Filters<FilterSupplyPointModel, SortSupplyPoint>({ item });
    const getUseCase = await locator.get<IocProvider<GetSupplyPointsUseCase>>(TYPES.GetSupplyPointsUseCase)();
    return await withErrorHandler(getUseCase.execute(filters));
  }

  async getOneById(id: Id) {
    const getSupplyPointUseCase = await locator.get<IocProvider<GetSupplyPointDetailUseCase>>(TYPES.GetSupplyPointDetailUseCase)();
    return await withErrorHandler(getSupplyPointUseCase.execute(id));
  }

  static async create(input: CreateSupplyPointModel) {
    const createSupplyPointUseCase = await locator.get<IocProvider<CreateSupplyPointUseCase>>(TYPES.CreateSupplyPointUseCase)();
    return await withErrorHandler(createSupplyPointUseCase.execute(input));
  }

  static async edit(input: EditSupplyPointModel, id: Id) {
    const editSupplyPointUseCase = await locator.get<IocProvider<EditSupplyPointUseCase>>(TYPES.EditSupplyPointUseCase)();
    return withErrorHandler(editSupplyPointUseCase.execute(input, id));
  }

  static async delete(id: Id) {
    const patchUseCase = await locator.get<IocProvider<PatchSupplyPointUseCase>>(TYPES.PatchSupplyPointUseCase)();
    await withErrorHandler(patchUseCase.delete(id));
  }

  async deleteMany(ids: Id[]) {
    const deleteManyUseCase = await locator.get<IocProvider<DeleteManySupplyPointsUseCase>>(TYPES.DeleteManySupplyPointUseCase)();
    await withErrorHandler(deleteManyUseCase.execute(ids));
  }

  async export({ filters, ids }: ExportArgumentsModel<FilterSupplyPointModel, SortSupplyPoint>) {
    const exportUseCase = await locator.get<IocProvider<ExportSupplyPointsUseCase>>(TYPES.ExportSupplyPointUseCase)();
    const exportArguments = new ExportArgumentsModel({ filters, ids });
    return await withErrorHandler(exportUseCase.execute(exportArguments));
  }
}
