import type { AtLeast, Id } from "@/src/common/utils/types";
import { Filters } from "@/src/core/app/domain/models/filters";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { CreateRateTypeModel } from "@/src/core/rate_type/domain/models/create_rate_type_model";
import type { FilterRateTypeModel } from "@/src/core/rate_type/domain/models/filter_rate_type_model";
import type { PatchRateTypeModel } from "@/src/core/rate_type/domain/models/patch_rate_type_model";
import type { SortRateType } from "@/src/core/rate_type/domain/interfaces/sort_rate_type";
import type { CreateRateTypeUseCase } from "@/src/core/rate_type/domain/use_cases/create_rate_type_use_case";
import type { GetRateTypesUseCase } from "@/src/core/rate_type/domain/use_cases/get_rate_types_use_case";
import type { GetRateTypeDetailUseCase } from "@/src/core/rate_type/domain/use_cases/get_rate_type_detail_use_case";
import type { PatchRateTypeUseCase } from "@/src/core/rate_type/domain/use_cases/patch_rate_type_use_case";
import type { RateTypeModel } from "@/src/core/rate_type/domain/models/rate_type_model";
import type { ListController } from "@/src/common/interfaces/list_controller";
import type { MutationController } from "@/src/common/interfaces/mutation_controller";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { withErrorHandler } from "@/src/common/utils/errors";
import type { DeleteManyRateTypesUseCase } from "@/src/core/rate_type/domain/use_cases/delete_many_rate_types_use_case";
import type { ExportRateTypesUseCase } from "@/src/core/rate_type/domain/use_cases/export_rate_types_use_case";
import { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

export default class RateTypeController
  implements ListController<RateTypeModel, FilterRateTypeModel, SortRateType>, MutationController<RateTypeModel>
{
  async getAll(filter: Filters<FilterRateTypeModel, SortRateType>) {
    const getUseCase = await locator.get<IocProvider<GetRateTypesUseCase>>(TYPES.GetRateTypesUseCase)();
    return await withErrorHandler(getUseCase.execute(filter));
  }

  static async getAllByName(item: { name: string; energyType?: EnergyTypes; enabled?: boolean }) {
    const filters = new Filters<FilterRateTypeModel, SortRateType>({ item });
    const getUseCase = await locator.get<IocProvider<GetRateTypesUseCase>>(TYPES.GetRateTypesUseCase)();
    return await withErrorHandler(getUseCase.execute(filters));
  }

  async getOneById(id: Id) {
    const getDetailUseCase = await locator.get<IocProvider<GetRateTypeDetailUseCase>>(TYPES.GetRateTypeDetailUseCase)();
    return await withErrorHandler(getDetailUseCase.execute(id));
  }

  static async create(input: CreateRateTypeModel) {
    const createProfileUseCase = await locator.get<IocProvider<CreateRateTypeUseCase>>(TYPES.CreateRateTypeUseCase)();
    await withErrorHandler(createProfileUseCase.execute(input));
  }

  static async delete(id: Id) {
    const patchUseCase = await locator.get<IocProvider<PatchRateTypeUseCase>>(TYPES.PatchRateTypeUseCase)();
    await withErrorHandler(patchUseCase.delete(id));
  }

  static async toogleActive(id: Id, currentActiveValue: boolean) {
    const patchUseCase = await locator.get<IocProvider<PatchRateTypeUseCase>>(TYPES.PatchRateTypeUseCase)();
    await withErrorHandler(patchUseCase.toggleEnable(id, !currentActiveValue));
  }

  static async patch(input: AtLeast<PatchRateTypeModel, "id">) {
    const patchUseCase = await locator.get<IocProvider<PatchRateTypeUseCase>>(TYPES.PatchRateTypeUseCase)();
    return await withErrorHandler(patchUseCase.execute(input));
  }

  async deleteMany(ids: Id[]) {
    const deleteManyUseCase = await locator.get<IocProvider<DeleteManyRateTypesUseCase>>(TYPES.DeleteManyRateTypeUseCase)();
    await withErrorHandler(deleteManyUseCase.execute(ids));
  }

  async export({ filters, ids }: ExportArgumentsModel<FilterRateTypeModel, SortRateType>) {
    const exportUseCase = await locator.get<IocProvider<ExportRateTypesUseCase>>(TYPES.ExportRateTypeUseCase)();
    const exportArguments = new ExportArgumentsModel({ filters, ids });
    return await withErrorHandler(exportUseCase.execute(exportArguments));
  }
}
