import { Expose } from "class-transformer";
import type { PatchSavingStudyModel } from "@/src/core/saving_study/domain/models/patch_saving_study_model";
import { toJson } from "@/src/common/utils/transformers";

export class PatchSavingStudyDataModel {
  @Expose({ name: "is_deleted" }) isDeleted?: boolean;

  fromDomain(domainObject: Partial<PatchSavingStudyModel>) {
    this.isDeleted = domainObject.deleted;
  }

  toJson() {
    return toJson(this);
  }
}
