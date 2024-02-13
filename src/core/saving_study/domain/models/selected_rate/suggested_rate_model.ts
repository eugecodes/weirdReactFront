import type { ConstructorType } from "@/src/common/interfaces/constructor_type";
import type { Id } from "@/src/common/utils/types";
import type { PriceType } from "@/src/core/app/enums/price_type";

export class SuggestedRateModel {
  id: Id;
  marketerName: string;
  rateName: string;
  hasContractualCommitment: boolean;
  duration: number;
  renewable: boolean;
  netMetering: boolean;
  surplusPrice: number;
  appliedProfitMargin: number;
  finalCost?: number;
  theoreticalCommission?: number;
  savingRelative: number;
  savingAbsolute: number;
  priceType?: PriceType;

  constructor(suggestedRate: ConstructorType<SuggestedRateModel>) {
    this.id = suggestedRate.id;
    this.marketerName = suggestedRate.marketerName;
    this.rateName = suggestedRate.rateName;
    this.hasContractualCommitment = suggestedRate.hasContractualCommitment;
    this.duration = suggestedRate.duration;
    this.renewable = suggestedRate.renewable;
    this.netMetering = suggestedRate.netMetering;
    this.surplusPrice = suggestedRate.surplusPrice;
    this.appliedProfitMargin = suggestedRate.appliedProfitMargin;
    this.finalCost = suggestedRate.finalCost;
    this.theoreticalCommission = suggestedRate.theoreticalCommission;
    this.savingRelative = suggestedRate.savingRelative;
    this.savingAbsolute = suggestedRate.savingAbsolute;
    this.priceType = suggestedRate.priceType;
  }
}
