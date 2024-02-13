import { Expose } from "class-transformer";
import type { PatchMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/patch_marketer_margin_model";
import { toJson } from "@/src/common/utils/transformers";

export class PatchMarketerMarginDataModel {
  @Expose({ name: "is_deleted" }) isDeleted?: boolean;

  fromDomain(domainObject: Partial<PatchMarketerMarginModel>) {
    this.isDeleted = domainObject.deleted;
  }

  toJson() {
    return toJson(this);
  }
}
