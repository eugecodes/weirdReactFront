import type { ConstructorType } from "@/src/common/interfaces/constructor_type";
import type { Id } from "@/src/common/utils/types";
import type { PriceType } from "@/src/core/app/enums/price_type";

export class DetailSelectedRateModel {
  id: Id;
  name: string;
  finalCost?: number;
  theoreticalCommission?: number;
  savingRelative?: number;
  savingAbsolute?: number;
  marketerName?: string;
  rateName?: string;
  isSelected?: boolean;
  permanency?: boolean;
  duration?: number;
  isFulllRenewable?: boolean;
  compensationSurplus?: boolean;
  compensationSurplusValue?: number;
  appliedProfitMargin?: number;
  energyCost?: number;
  powerCost?: number;
  fixedCost?: number;
  otherCosts?: number;
  ieCost?: number;
  ihCost?: number;
  ivaCost?: number;
  totalCommission?: number;
  otherCostsCommission?: number;
  priceType?: PriceType;
  powerPrice1?: number;
  powerPrice2?: number;
  powerPrice3?: number;
  powerPrice4?: number;
  powerPrice5?: number;
  powerPrice6?: number;
  energyPrice1: number;
  energyPrice2: number;
  energyPrice3?: number;
  energyPrice4?: number;
  energyPrice5?: number;
  energyPrice6?: number;
  fixedPrice?: number;
  otherCostEurMonth?: number;
  otherCostEurKwh?: number;
  otherCostPercentage?: number;

  constructor(selectedRate: ConstructorType<DetailSelectedRateModel>) {
    this.id = selectedRate.id;
    this.name = selectedRate.name;
    this.finalCost = selectedRate.finalCost;
    this.theoreticalCommission = selectedRate.theoreticalCommission;
    this.savingRelative = selectedRate.savingRelative;
    this.savingAbsolute = selectedRate.savingAbsolute;
    this.marketerName = selectedRate.marketerName;
    this.rateName = selectedRate.rateName;
    this.isSelected = selectedRate.isSelected;
    this.permanency = selectedRate.permanency;
    this.duration = selectedRate.duration;
    this.isFulllRenewable = selectedRate.isFulllRenewable;
    this.compensationSurplus = selectedRate.compensationSurplus;
    this.compensationSurplusValue = selectedRate.compensationSurplusValue;
    this.appliedProfitMargin = selectedRate.appliedProfitMargin;
    this.energyCost = selectedRate.energyCost;
    this.powerCost = selectedRate.powerCost;
    this.fixedCost = selectedRate.fixedCost;
    this.otherCosts = selectedRate.otherCosts;
    this.ieCost = selectedRate.ieCost;
    this.ihCost = selectedRate.ihCost;
    this.ivaCost = selectedRate.ivaCost;
    this.totalCommission = selectedRate.totalCommission;
    this.otherCostsCommission = selectedRate.otherCostsCommission;
    this.priceType = selectedRate.priceType;
    this.powerPrice1 = selectedRate.powerPrice1;
    this.powerPrice2 = selectedRate.powerPrice2;
    this.powerPrice3 = selectedRate.powerPrice3;
    this.powerPrice4 = selectedRate.powerPrice4;
    this.powerPrice5 = selectedRate.powerPrice5;
    this.powerPrice6 = selectedRate.powerPrice6;
    this.energyPrice1 = selectedRate.energyPrice1;
    this.energyPrice2 = selectedRate.energyPrice2;
    this.energyPrice3 = selectedRate.energyPrice3;
    this.energyPrice4 = selectedRate.energyPrice4;
    this.energyPrice5 = selectedRate.energyPrice5;
    this.energyPrice6 = selectedRate.energyPrice6;
    this.fixedPrice = selectedRate.fixedPrice;
    this.otherCostEurKwh = selectedRate.otherCostEurKwh;
    this.otherCostEurMonth = selectedRate.otherCostEurMonth;
    this.otherCostPercentage = selectedRate.otherCostPercentage;
  }
}
