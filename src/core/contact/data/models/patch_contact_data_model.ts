import { Expose } from "class-transformer";
import type { PatchContactModel } from "@/src/core/contact/domain/models/patch_contact_model";
import { toJson } from "@/src/common/utils/transformers";

export class PatchContactDataModel {
  @Expose({ name: "is_deleted" }) isDeleted?: boolean;

  fromDomain(domainObject: Partial<PatchContactModel>) {
    this.isDeleted = domainObject.deleted;
  }

  toJson() {
    return toJson(this);
  }
}
