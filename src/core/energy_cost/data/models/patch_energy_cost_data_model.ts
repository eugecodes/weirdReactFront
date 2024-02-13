import { Expose } from "class-transformer";
import { toJson } from "@/src/common/utils/transformers";
import type { PatchEnergyCostModel } from "@/src/core/energy_cost/domain/models/patch_energy_cost_model";

export class PatchEnergyCostDataModel {
  @Expose() id?: number;
  @Expose() concept?: string;
  @Expose() amount?: number;
  @Expose({ name: "is_active" }) isActive?: boolean;
  @Expose({ name: "is_deleted" }) isDeleted?: boolean;

  fromDomain(domainObject: Partial<PatchEnergyCostModel>) {
    this.id = domainObject.id;
    this.amount = domainObject.amount;
    this.concept = domainObject.concept;
    this.isActive = domainObject.enabled;
    this.isDeleted = domainObject.deleted;
  }

  toJson() {
    return toJson(this);
  }
}
