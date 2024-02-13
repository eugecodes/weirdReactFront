import { toJson } from "@/src/common/utils/transformers";
import type { Id } from "@/src/common/utils/types";
import { Expose } from "class-transformer";
import { SuggestedRateModel } from "../../../domain/models/selected_rate/suggested_rate_model";
import type { PriceType } from "@/src/core/app/enums/price_type";

export class SuggestedRateDataModel {
  @Expose()
  id!: Id;
  @Expose({ name: "marketer_name" })
  marketerName!: string;
  @Expose({ name: "rate_name" })
  rateName!: string;
  @Expose({ name: "has_contractual_commitment" })
  hasContractualCommitment!: boolean;
  @Expose()
  duration!: number;
  @Expose({ name: "is_full_renewable" })
  renewable!: boolean;
  @Expose({ name: "has_net_metering" })
  netMetering!: boolean;
  @Expose({ name: "net_metering_value" })
  surplusPrice!: number;
  @Expose({ name: "applied_profit_margin" })
  appliedProfitMargin!: number;
  @Expose({ name: "final_cost" })
  finalCost?: number;
  @Expose({ name: "theoretical_commission" })
  theoreticalCommission?: number;
  @Expose({ name: "saving_relative" })
  savingRelative!: number;
  @Expose({ name: "saving_absolute" })
  savingAbsolute!: number;
  @Expose({ name: "price_type" })
  priceType?: PriceType;

  fromDomain(domainModel: SuggestedRateModel) {
    this.id = domainModel.id;
    this.marketerName = domainModel.marketerName;
    this.rateName = domainModel.rateName;
    this.hasContractualCommitment = domainModel.hasContractualCommitment;
    this.duration = domainModel.duration;
    this.renewable = domainModel.renewable;
    this.netMetering = domainModel.netMetering;
    this.surplusPrice = domainModel.surplusPrice;
    this.appliedProfitMargin = domainModel.appliedProfitMargin;
    this.finalCost = domainModel.finalCost;
    this.theoreticalCommission = domainModel.theoreticalCommission;
    this.savingRelative = domainModel.savingRelative;
    this.savingAbsolute = domainModel.savingAbsolute;
    this.priceType = domainModel.priceType;

    return this;
  }

  toDomain() {
    return new SuggestedRateModel({
      id: this.id,
      marketerName: this.marketerName,
      rateName: this.rateName,
      hasContractualCommitment: this.hasContractualCommitment,
      duration: this.duration,
      renewable: this.renewable,
      netMetering: this.netMetering,
      surplusPrice: this.surplusPrice,
      appliedProfitMargin: this.appliedProfitMargin,
      finalCost: this.finalCost,
      theoreticalCommission: this.theoreticalCommission,
      savingRelative: this.savingRelative,
      savingAbsolute: this.savingAbsolute,
      priceType: this.priceType
    });
  }

  toJson() {
    return toJson(this);
  }
}
