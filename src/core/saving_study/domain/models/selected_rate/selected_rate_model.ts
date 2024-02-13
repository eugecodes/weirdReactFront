import type { Id } from "@/src/common/utils/types";

export class SelectedRateModel {
  id: Id;
  name: string;
  finalCost?: number;
  theoreticalCommission?: number;
  totalCommission?: number;
  savingRelative?: number;
  savingAbsolute?: number;

  constructor(selectedRate: {
    id: Id;
    name: string;
    finalCost?: number;
    theoreticalCommission?: number;
    totalCommission?: number;
    savingRelative?: number;
    savingAbsolute?: number;
  }) {
    this.id = selectedRate.id;
    this.name = selectedRate.name;
    this.finalCost = selectedRate.finalCost;
    this.theoreticalCommission = selectedRate.theoreticalCommission;
    this.totalCommission = selectedRate.totalCommission;
    this.savingRelative = selectedRate.savingRelative;
    this.savingAbsolute = selectedRate.savingAbsolute;
  }
}
