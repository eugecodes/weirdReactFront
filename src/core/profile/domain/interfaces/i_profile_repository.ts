import type { AtLeast, Id } from "@/src/common/utils/types";
import type { ProfileModel } from "@/src/core/profile/domain/models/profile_model";
import type { CreateProfileModel } from "@/src/core/profile/domain/models/create_profile_model";
import type { PatchProfileModel } from "@/src/core/profile/domain/models/patch_profile_model";
import type { Page } from "@/src/core/app/domain/models/page";
import type { FilterProfileModel } from "@/src/core/profile/domain/models/filter_profile_model";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { SortProfile } from "@/src/core/profile/domain/interfaces/sort_profile";
import type { FileModel } from "@/src/core/app/domain/models/file";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

export interface IProfileRepository {
  profiles(filters: Filters<FilterProfileModel, SortProfile>): Promise<Page<ProfileModel>>;
  create(input: CreateProfileModel): Promise<void>;
  detailProfile(profileId: Id): Promise<ProfileModel>;
  editProfile(input: CreateProfileModel, id: Id): Promise<ProfileModel>;
  patchProfile(input: AtLeast<PatchProfileModel, "id">): Promise<void>;
  deleteProfile(profileId: Id): Promise<void>;
  deleteMany(ids: Id[]): Promise<void>;
  exportToFile(filter: ExportArgumentsModel<FilterProfileModel, SortProfile>): Promise<FileModel>;
  changePassword(profileId: Id, password: string): Promise<void>;
}
