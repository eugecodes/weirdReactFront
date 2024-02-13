import { fromDataDateStringToDomainDate } from "@/src/common/utils/dates";
import { toJson } from "@/src/common/utils/transformers";
import { Expose, Type } from "class-transformer";
import { ProfileModel } from "@/src/core/profile/domain/models/profile_model";
import type { DataModel } from "@/src/common/interfaces/data_model";
import { UserDataModel } from "@/src/core/user/data/models/user_data_model";

export class ProfileDataModel implements DataModel<ProfileModel> {
  @Expose() id!: number;
  @Expose({ name: "first_name" }) firstName!: string;
  @Expose({ name: "last_name" }) lastName!: string;
  @Expose() email!: string;
  @Expose({ name: "role" }) role!: string;
  @Expose({ name: "is_active" }) isActive!: boolean;
  @Expose({ name: "is_deleted" }) isDeleted!: boolean;
  @Expose({ name: "create_at" }) createdAt!: string;
  @Expose()
  @Type(() => UserDataModel)
  responsible!: UserDataModel;

  toDomain(): ProfileModel {
    return new ProfileModel({
      id: this.id,
      name: this.firstName,
      surnames: this.lastName,
      email: this.email,
      role: this.role,
      enabled: this.isActive,
      deleted: this.isDeleted || false,
      createdAt: fromDataDateStringToDomainDate(this.createdAt),
      responsible: this.responsible?.toDomain()
    });
  }

  fromDomain(domainObject: ProfileModel) {
    this.id = domainObject.id;
    this.firstName = domainObject.name;
    this.lastName = domainObject.surnames;
    this.email = domainObject.email;
    this.isActive = domainObject.enabled;
    this.isDeleted = domainObject.deleted;
    this.createdAt = domainObject.createdAt;
    this.role = domainObject.role || "";
  }

  toJson() {
    return toJson(this);
  }
}
