import type { Filters } from "@/src/core/app/domain/models/filters";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { CreateProfileModel } from "@/src/core/profile/domain/models/create_profile_model";
import type { FilterProfileModel } from "@/src/core/profile/domain/models/filter_profile_model";
import type { SortProfile } from "@/src/core/profile/domain/interfaces/sort_profile";
import type { CreateProfileUseCase } from "@/src/core/profile/domain/use_cases/create_profile_use_case";
import type { GetProfilesUseCase } from "@/src/core/profile/domain/use_cases/get_profiles_use_case";
import type { GetProfileDetailUseCase } from "@/src/core/profile/domain/use_cases/get_profile_detail_use_case";
import type { PatchProfileUseCase } from "@/src/core/profile/domain/use_cases/patch_profile_use_case";
import type { EditProfileUseCase } from "@/src/core/profile/domain/use_cases/edit_profile_use_case";
import type { Id } from "@/src/common/utils/types";
import type { DeleteManyProfilesUseCase } from "@/src/core/profile/domain/use_cases/delete_many_profiles_use_case";
import type { ExportProfilesUseCase } from "@/src/core/profile/domain/use_cases/export_profiles_use_case";
import type { ListController } from "@/src/common/interfaces/list_controller";
import type { ProfileModel } from "@/src/core/profile/domain/models/profile_model";
import type { MutationController } from "@/src/common/interfaces/mutation_controller";
import { withErrorHandler } from "@/src/common/utils/errors";
import { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

export default class ProfileController implements ListController<ProfileModel, FilterProfileModel, SortProfile>, MutationController<ProfileModel> {
  async getAll(filter: Filters<FilterProfileModel, SortProfile>) {
    const profilesUseCase = await locator.get<IocProvider<GetProfilesUseCase>>(TYPES.GetProfilesUseCase)();
    return await withErrorHandler(profilesUseCase.execute(filter));
  }

  async getOneById(id: Id) {
    const getProfileUseCase = await locator.get<IocProvider<GetProfileDetailUseCase>>(TYPES.GetProfileDetailUseCase)();
    return await withErrorHandler(getProfileUseCase.execute(id));
  }

  static async create(input: CreateProfileModel) {
    const createProfileUseCase = await locator.get<IocProvider<CreateProfileUseCase>>(TYPES.CreateProfileUseCase)();
    await withErrorHandler(createProfileUseCase.execute(input));
  }

  static async edit(input: CreateProfileModel, id: Id) {
    const editProfileUseCase = await locator.get<IocProvider<EditProfileUseCase>>(TYPES.EditProfileUseCase)();
    return withErrorHandler(editProfileUseCase.execute(input, id));
  }

  static async delete(id: Id) {
    const patchUseCase = await locator.get<IocProvider<PatchProfileUseCase>>(TYPES.PatchProfileUseCase)();
    await withErrorHandler(patchUseCase.delete(id));
  }

  async deleteMany(ids: Id[]) {
    const deleteManyUseCase = await locator.get<IocProvider<DeleteManyProfilesUseCase>>(TYPES.DeleteManyProfilesUseCase)();
    await withErrorHandler(deleteManyUseCase.execute(ids));
  }

  async export({ filters, ids }: ExportArgumentsModel<FilterProfileModel, SortProfile>) {
    const exportUseCase = await locator.get<IocProvider<ExportProfilesUseCase>>(TYPES.ExportProfileUseCase)();
    const exportArguments = new ExportArgumentsModel({ filters, ids });
    return await withErrorHandler(exportUseCase.execute(exportArguments));
  }

  static async toogleActive(id: Id, currentActiveValue: boolean) {
    const patchUseCase = await locator.get<IocProvider<PatchProfileUseCase>>(TYPES.PatchProfileUseCase)();
    await withErrorHandler(patchUseCase.toggleEnable(id, !currentActiveValue));
  }

  static async changePassword(id: Id, password: string) {
    const patchUseCase = await locator.get<IocProvider<PatchProfileUseCase>>(TYPES.PatchProfileUseCase)();
    await withErrorHandler(patchUseCase.changePassword(id, password));
  }
}
