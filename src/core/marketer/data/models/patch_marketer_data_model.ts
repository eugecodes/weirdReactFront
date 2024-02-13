import { toJson } from "@/src/common/utils/transformers";
import type { PatchMarketerModel } from "@/src/core/marketer/domain/models/patch_marketer_model";
import { Expose } from "class-transformer";

export class PatchMarketerDataModel {
  @Expose({ name: "is_active" }) isActive?: boolean;
  @Expose({ name: "is_deleted" }) isDeleted?: boolean;

  fromDomain(domainObject: Partial<PatchMarketerModel>) {
    this.isActive = domainObject.enabled;
    this.isDeleted = domainObject.deleted;
  }

  toJson() {
    return toJson(this);
  }
}
