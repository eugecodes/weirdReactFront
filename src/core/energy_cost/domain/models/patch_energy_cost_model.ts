import type { Id } from "@/src/common/utils/types";

export class PatchEnergyCostModel {
  id: Id;
  concept: string;
  amount: number;
  enabled: boolean;
  deleted: boolean;

  constructor(energyCost: { id: Id; concept: string; amount: number; enabled: boolean; deleted: boolean }) {
    this.id = energyCost.id;
    this.concept = energyCost.concept;
    this.amount = energyCost.amount;
    this.enabled = energyCost.enabled;
    this.deleted = energyCost.deleted;
  }
}
