import type { Id } from "@/src/common/utils/types";

export class PatchMarketerMarginModel {
  id: Id;
  deleted: boolean;

  constructor(rateType: { id: Id; deleted: boolean }) {
    this.id = rateType.id;
    this.deleted = rateType.deleted;
  }
}
