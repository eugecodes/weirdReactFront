import type { Id } from "@/src/common/utils/types";

export class PatchRateTypeModel {
  id: Id;
  minPower: number;
  maxPower: number;
  enabled: boolean;
  deleted: boolean;

  constructor(rateType: { id: Id; minPower: number; maxPower: number; enabled: boolean; deleted: boolean }) {
    this.id = rateType.id;
    this.minPower = rateType.minPower;
    this.maxPower = rateType.maxPower;
    this.enabled = rateType.enabled;
    this.deleted = rateType.deleted;
  }
}
