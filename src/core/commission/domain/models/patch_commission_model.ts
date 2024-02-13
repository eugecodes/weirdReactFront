import type { Id } from "@/src/common/utils/types";

export class PatchCommissionModel {
  id: Id;
  deleted: boolean;

  constructor(commission: { id: Id; deleted: boolean }) {
    this.id = commission.id;
    this.deleted = commission.deleted;
  }
}
