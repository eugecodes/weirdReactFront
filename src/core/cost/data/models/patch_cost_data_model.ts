import { Expose } from "class-transformer";
import { toJson } from "@/src/common/utils/transformers";
import type { PatchCostModel } from "@/src/core/cost/domain/models/patch_cost_model";

export class PatchCostDataModel {
  @Expose() id?: number;
  @Expose({ name: "is_active" }) isActive?: boolean;
  @Expose({ name: "is_deleted" }) isDeleted?: boolean;

  fromDomain(domainObject: Partial<PatchCostModel>) {
    this.id = domainObject.id;
    this.isActive = domainObject.enabled;
    this.isDeleted = domainObject.deleted;
  }

  toJson() {
    return toJson(this);
  }
}
