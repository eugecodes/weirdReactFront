import { toJson } from "@/src/common/utils/transformers";
import { Expose } from "class-transformer";
import type { FilterProfileModel } from "@/src/core/profile/domain/models/filter_profile_model";
import { isBoolean } from "lodash";
import { CreateAtFilterDataModel } from "@/src/core/app/data/models/create_at_filter_data_model";

export class ProfileFiltersDataModel extends CreateAtFilterDataModel {
  @Expose({ name: "first_name__unaccent" }) firstName!: string;
  @Expose({ name: "last_name__unaccent" }) lastName!: string;
  @Expose({ name: "email__unaccent" }) email!: string;
  @Expose() role!: string;
  @Expose({ name: "is_active" }) isActive!: boolean;
  @Expose({ name: "is_deleted" }) isDeleted!: boolean;
  @Expose({ name: "responsible__first_name__unaccent" }) responsible!: string;

  fromDomain(domainObject: FilterProfileModel) {
    if (isBoolean(domainObject.enabled)) {
      this.isActive = domainObject.enabled;
    }
    if (domainObject.createdAt) {
      super.fromChild(domainObject.createdAt);
    }

    this.firstName = domainObject.name || "";
    this.lastName = domainObject.surnames || "";
    this.email = domainObject.email || "";
    this.role = domainObject.role || "";
    this.responsible = domainObject.responsible || "";
  }

  toJson() {
    return toJson(this);
  }
}
