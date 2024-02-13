import { Expose } from "class-transformer";
import type { PatchRateModel } from "@/src/core/rate/domain/models/patch_rate_model";
import { toJson } from "@/src/common/utils/transformers";

export class PatchRateDataModel {
  @Expose({ name: "is_active" }) isActive?: boolean;
  @Expose({ name: "is_deleted" }) isDeleted?: boolean;

  fromDomain(domainObject: Partial<PatchRateModel>) {
    this.isActive = domainObject.enabled;
    this.isDeleted = domainObject.deleted;
  }

  toJson() {
    return toJson(this);
  }
}
