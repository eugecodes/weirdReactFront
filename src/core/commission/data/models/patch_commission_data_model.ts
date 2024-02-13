import { Expose } from "class-transformer";
import { toJson } from "@/src/common/utils/transformers";
import type { PatchCommissionModel } from "@/src/core/commission/domain/models/patch_commission_model";

export class PatchCommissionDataModel {
  @Expose() id?: number;
  @Expose({ name: "is_deleted" }) isDeleted?: boolean;

  fromDomain(domainObject: Partial<PatchCommissionModel>) {
    this.id = domainObject.id;
    this.isDeleted = domainObject.deleted;
  }

  toJson() {
    return toJson(this);
  }
}
