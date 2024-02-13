import type { Id } from "@/src/common/utils/types";

export class PatchCostModel {
  id: Id;
  enabled: boolean;
  deleted: boolean;

  constructor(cost: { id: Id; enabled: boolean; deleted: boolean }) {
    this.id = cost.id;
    this.enabled = cost.enabled;
    this.deleted = cost.deleted;
  }
}
