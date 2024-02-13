import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { testApiService } from "@/src/core/app/data/services/test_api_service";
import type { IProfileRepository } from "@/src/core/profile/domain/interfaces/i_profile_repository";
import type { ProfileModel } from "@/src/core/profile/domain/models/profile_model";
import type { AtLeast, Id } from "@/src/common/utils/types";
import { ProfileDataModel } from "@/src/core/profile/data/models/profile_data_model";
import type { CreateProfileModel } from "@/src/core/profile/domain/models/create_profile_model";
import type { PatchProfileModel } from "@/src/core/profile/domain/models/patch_profile_model";
import { CreateProfileDataModel } from "../models/create_profile_data_model";
import { fromJson, fromJsonPage } from "@/src/common/utils/transformers";
import type { Page } from "@/src/core/app/domain/models/page";
import type { FilterProfileModel } from "@/src/core/profile/domain/models/filter_profile_model";
import type { Filters } from "@/src/core/app/domain/models/filters";
import { PatchProfileDataModel } from "@/src/core/profile/data/models/patch_profile_data_model";
import type { SortProfile } from "@/src/core/profile/domain/interfaces/sort_profile";
import { SortProfileDataModel } from "../models/sort_profile_data_model";
import { DELETE, EXPORT } from "@/src/common/utils/api_paths";
import { createFileName, fromFiltersToQueryParams, getExportFormatAsPath, getExportQueryParams } from "@/src/common/utils";
import { ProfileFiltersDataModel } from "@/src/core/profile/data/models/filter_profile_data_model";
import { FileModel } from "@/src/core/app/domain/models/file";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

@injectable()
export class ProfilesRepository implements IProfileRepository {
  @inject(TYPES.testApiService) private apiServiceProvider!: IocProvider<testApiService>;

  private readonly baseUrl = "/api/users";

  private getRouteWithProfileId(profileId: Id) {
    return this.baseUrl + "/" + profileId;
  }

  async profiles(input: Filters<FilterProfileModel, SortProfile>): Promise<Page<ProfileModel>> {
    const service = await this.apiServiceProvider();

    const queryParams = fromFiltersToQueryParams({ filters: input, modelClass: ProfileFiltersDataModel, sortClass: SortProfileDataModel });
    const res = await service.get<Record<string, unknown>>(this.baseUrl + queryParams);
    return fromJsonPage<ProfileDataModel, ProfileModel>(ProfileDataModel, res).toDomain();
  }

  async create(input: CreateProfileModel): Promise<void> {
    const data = new CreateProfileDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl, { data: data.toJson() });
  }

  async detailProfile(profileId: Id): Promise<ProfileModel> {
    const service = await this.apiServiceProvider();
    const response = await service.get(this.getRouteWithProfileId(profileId));
    const dataModel = fromJson(ProfileDataModel, response);
    return dataModel.toDomain();
  }

  async deleteProfile(profileId: Id): Promise<void> {
    await this.patchProfile({ id: profileId, deleted: true });
    return;
  }

  async editProfile(input: CreateProfileModel, id: Id): Promise<ProfileModel> {
    const data = new CreateProfileDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    const response = await service.put(this.getRouteWithProfileId(id), { data: data.toJson() });
    const dataModel = fromJson(ProfileDataModel, response);
    return dataModel.toDomain();
  }

  async patchProfile(input: AtLeast<PatchProfileModel, "id">): Promise<void> {
    const service = await this.apiServiceProvider();
    const data = new PatchProfileDataModel();
    data.fromDomain(input);
    await service.patch(this.getRouteWithProfileId(input.id), { data: data.toJson() });
  }

  async changePassword(profileId: Id, password: string): Promise<void> {
    const service = await this.apiServiceProvider();
    await service.patch(this.getRouteWithProfileId(profileId), { data: { password } });
  }

  async exportToFile({ filters, ids, format }: ExportArgumentsModel<FilterProfileModel, SortProfile>): Promise<FileModel> {
    const service = await this.apiServiceProvider();

    const queryParams = getExportQueryParams({ filters, ids, modelClass: ProfileFiltersDataModel, sortClass: SortProfileDataModel });
    const formatAsPath = getExportFormatAsPath(format);

    const data: string = await service.post(this.baseUrl + EXPORT + formatAsPath + queryParams);
    return new FileModel({ data, name: createFileName("profiles", format) });
  }

  async deleteMany(ids: Id[]): Promise<void> {
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl + DELETE, { data: { ids } });
  }
}
