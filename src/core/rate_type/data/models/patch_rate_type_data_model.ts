import { Expose } from "class-transformer";
import type { PatchRateTypeModel } from "@/src/core/rate_type/domain/models/patch_rate_type_model";
import { toJson } from "@/src/common/utils/transformers";

export class PatchRateTypeDataModel {
  @Expose({ name: "min_power" }) minPower?: number;
  @Expose({ name: "max_power" }) maxPower?: number;
  @Expose({ name: "enable" }) isActive?: boolean;
  @Expose({ name: "is_deleted" }) isDeleted?: boolean;

  fromDomain(domainObject: Partial<PatchRateTypeModel>) {
    this.maxPower = domainObject.maxPower;
    this.minPower = domainObject.minPower;
    this.isActive = domainObject.enabled;
    this.isDeleted = domainObject.deleted;
  }

  toJson() {
    return toJson(this);
  }
}
