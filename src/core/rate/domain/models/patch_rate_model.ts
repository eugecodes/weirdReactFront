import type { Id } from "@/src/common/utils/types";

export class PatchRateModel {
  id: Id;
  enabled: boolean;
  deleted: boolean;

  constructor(rate: { id: Id; enabled: boolean; deleted: boolean }) {
    this.id = rate.id;
    this.enabled = rate.enabled;
    this.deleted = rate.deleted;
  }
}
