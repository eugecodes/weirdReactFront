import type { Id } from "@/src/common/utils/types";

export class PatchMarketerModel {
  id: Id;
  enabled: boolean;
  deleted: boolean;

  constructor(marketer: { id: Id; enabled: boolean; deleted: boolean }) {
    this.id = marketer.id;
    this.enabled = marketer.enabled;
    this.deleted = marketer.deleted;
  }
}
