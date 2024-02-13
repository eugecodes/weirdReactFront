import { Expose } from "class-transformer";
import type { PatchClientModel } from "@/src/core/client/domain/models/patch_client_model";
import { toJson } from "@/src/common/utils/transformers";

export class PatchClientDataModel {
  @Expose({ name: "is_deleted" }) isDeleted?: boolean;

  fromDomain(domainObject: Partial<PatchClientModel>) {
    this.isDeleted = domainObject.deleted;
  }

  toJson() {
    return toJson(this);
  }
}
