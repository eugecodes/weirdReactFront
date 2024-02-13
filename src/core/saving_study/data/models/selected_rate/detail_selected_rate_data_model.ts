import type { Id } from "@/src/common/utils/types";
import { Expose } from "class-transformer";
import { DetailSelectedRateModel } from "../../../domain/models/selected_rate/detail_selected_rate_model";
import type { PriceType } from "@/src/core/app/enums/price_type";

export class DetailSelectedRateDataModel {
  @Expose()
  id!: Id;
  @Expose()
  name!: string;
  @Expose({ name: "final_cost" })
  finalCost?: number;
  @Expose({ name: "theoretical_commission" })
  theoreticalCommission?: number;
  @Expose({ name: "saving_relative" })
  savingRelative?: number;
  @Expose({ name: "saving_absolute" })
  savingAbsolute?: number;
  @Expose({ name: "marketer_name" })
  marketerName?: string;
  @Expose({ name: "rate_name" })
  rateName?: string;
  @Expose({ name: "is_selected" })
  isSelected?: boolean;
  @Expose({ name: "has_contractual_commitment" })
  hasContractualCommitment?: boolean;
  @Expose({ name: "duration" })
  duration?: number;
  @Expose({ name: "is_full_renewable" })
  isFulllRenewable?: boolean;
  @Expose({ name: "has_net_metering" })
  hasNetMetering?: boolean;
  @Expose({ name: "net_metering_value" })
  netMeteringValue?: number;
  @Expose({ name: "applied_profit_margin" })
  appliedProfitMargin?: number;
  @Expose({ name: "energy_cost" })
  energyCost?: number;
  @Expose({ name: "power_cost" })
  powerCost?: number;
  @Expose({ name: "fixed_cost" })
  fixedCost?: number;
  @Expose({ name: "other_costs" })
  otherCosts?: number;
  @Expose({ name: "ie_cost" })
  ieCost?: number;
  @Expose({ name: "ih_cost" })
  ihCost?: number;
  @Expose({ name: "iva_cost" })
  ivaCost?: number;
  @Expose({ name: "total_commission" })
  totalCommission?: number;
  @Expose({ name: "other_costs_commission" })
  otherCostsCommission?: number;
  @Expose({ name: "other_cost_eur_month" })
  otherCostEurMonth?: number;
  @Expose({ name: "other_cost_kwh" })
  otherCostEurKwh?: number;
  @Expose({ name: "other_cost_percentage" })
  otherCostPercentage?: number;
  @Expose({ name: "price_type" })
  priceType?: PriceType;
  @Expose({ name: "power_price_1" })
  powerPrice1?: number;
  @Expose({ name: "power_price_2" })
  powerPrice2?: number;
  @Expose({ name: "power_price_3" })
  powerPrice3?: number;
  @Expose({ name: "power_price_4" })
  powerPrice4?: number;
  @Expose({ name: "power_price_5" })
  powerPrice5?: number;
  @Expose({ name: "power_price_6" })
  powerPrice6?: number;
  @Expose({ name: "energy_price_1" })
  energyPrice1!: number;
  @Expose({ name: "energy_price_2" })
  energyPrice2!: number;
  @Expose({ name: "energy_price_3" })
  energyPrice3?: number;
  @Expose({ name: "energy_price_4" })
  energyPrice4?: number;
  @Expose({ name: "energy_price_5" })
  energyPrice5?: number;
  @Expose({ name: "energy_price_6" })
  energyPrice6?: number;
  @Expose({ name: "fixed_term_price" })
  fixedPrice?: number;

  toDomain(): DetailSelectedRateModel {
    return new DetailSelectedRateModel({
      id: this.id,
      name: this.name,
      finalCost: this.finalCost,
      theoreticalCommission: this.theoreticalCommission,
      savingRelative: this.savingRelative,
      savingAbsolute: this.savingAbsolute,
      marketerName: this.marketerName,
      rateName: this.rateName,
      isSelected: this.isSelected,
      permanency: this.hasContractualCommitment,
      duration: this.duration,
      isFulllRenewable: this.isFulllRenewable,
      compensationSurplus: this.hasNetMetering,
      compensationSurplusValue: this.netMeteringValue,
      appliedProfitMargin: this.appliedProfitMargin,
      energyCost: this.energyCost,
      powerCost: this.powerCost,
      fixedCost: this.fixedCost,
      otherCosts: this.otherCosts,
      ieCost: this.ieCost,
      ihCost: this.ihCost,
      ivaCost: this.ivaCost,
      totalCommission: this.totalCommission,
      otherCostsCommission: this.otherCostsCommission,
      priceType: this.priceType,
      powerPrice1: this.powerPrice1,
      powerPrice2: this.powerPrice2,
      powerPrice3: this.powerPrice3,
      powerPrice4: this.powerPrice4,
      powerPrice5: this.powerPrice5,
      powerPrice6: this.powerPrice6,
      energyPrice1: this.energyPrice1,
      energyPrice2: this.energyPrice2,
      energyPrice3: this.energyPrice3,
      energyPrice4: this.energyPrice4,
      energyPrice5: this.energyPrice5,
      energyPrice6: this.energyPrice6,
      fixedPrice: this.fixedPrice,
      otherCostEurKwh: this.otherCostEurKwh,
      otherCostEurMonth: this.otherCostEurMonth,
      otherCostPercentage: this.otherCostPercentage
    });
  }

  fromDomain(domainObject: DetailSelectedRateModel) {
    this.id = domainObject.id;
    this.name = domainObject.name;
    this.finalCost = domainObject.finalCost;
    this.theoreticalCommission = domainObject.theoreticalCommission;
    this.savingRelative = domainObject.savingRelative;
    this.savingAbsolute = domainObject.savingAbsolute;
    this.marketerName = domainObject.marketerName;
    this.rateName = domainObject.rateName;
    this.isSelected = domainObject.isSelected;
    this.hasContractualCommitment = domainObject.permanency;
    this.duration = domainObject.duration;
    this.isFulllRenewable = domainObject.isFulllRenewable;
    this.hasNetMetering = domainObject.compensationSurplus;
    this.netMeteringValue = domainObject.compensationSurplusValue;
    this.appliedProfitMargin = domainObject.appliedProfitMargin;
    this.energyCost = domainObject.energyCost;
    this.powerCost = domainObject.powerCost;
    this.fixedCost = domainObject.fixedCost;
    this.otherCosts = domainObject.otherCosts;
    this.ieCost = domainObject.ieCost;
    this.ihCost = domainObject.ihCost;
    this.ivaCost = domainObject.ivaCost;
    this.totalCommission = domainObject.totalCommission;
    this.otherCostsCommission = domainObject.otherCostsCommission;
    this.priceType = domainObject.priceType;
    this.powerPrice1 = domainObject.powerPrice1;
    this.powerPrice2 = domainObject.powerPrice2;
    this.powerPrice3 = domainObject.powerPrice3;
    this.powerPrice4 = domainObject.powerPrice4;
    this.powerPrice5 = domainObject.powerPrice5;
    this.powerPrice6 = domainObject.powerPrice6;
    this.energyPrice1 = domainObject.energyPrice1;
    this.energyPrice2 = domainObject.energyPrice2;
    this.energyPrice3 = domainObject.energyPrice3;
    this.energyPrice4 = domainObject.energyPrice4;
    this.energyPrice5 = domainObject.energyPrice5;
    this.energyPrice6 = domainObject.energyPrice6;
    this.fixedPrice = domainObject.fixedPrice;
    this.otherCostEurKwh = domainObject.otherCostEurKwh;
    this.otherCostEurMonth = domainObject.otherCostEurMonth;
    this.otherCostPercentage = domainObject.otherCostPercentage;

    return this;
  }
}
