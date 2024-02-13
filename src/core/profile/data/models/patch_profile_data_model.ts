import { toJson } from "@/src/common/utils/transformers";
import { Expose } from "class-transformer";
import type { PatchProfileModel } from "@/src/core/profile/domain/models/patch_profile_model";

export class PatchProfileDataModel {
  @Expose()
  id?: number;
  @Expose({ name: "first_name" })
  firstName?: string;
  @Expose({ name: "last_name" })
  lastName?: string;
  @Expose()
  email?: string;
  @Expose()
  password?: string;
  @Expose({ name: "is_active" })
  isActive?: boolean;
  @Expose({ name: "is_deleted" })
  isDeleted?: boolean;

  fromDomain(domainObject: Partial<PatchProfileModel>) {
    this.id = domainObject.id;
    this.firstName = domainObject.name;
    this.lastName = domainObject.surnames;
    this.email = domainObject.email;
    this.password = domainObject.password;
    this.isActive = domainObject.enabled;
    this.isDeleted = domainObject.deleted;
  }

  toJson() {
    return toJson(this);
  }
}
