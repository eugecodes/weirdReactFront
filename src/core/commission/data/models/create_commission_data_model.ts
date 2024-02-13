import { Expose } from "class-transformer";
import { toJson } from "@/src/common/utils/transformers";
import type { CreateCommissionModel } from "@/src/core/commission/domain/models/create_commission_model";
import type { Id } from "@/src/common/utils/types";
import type { RangeTypes } from "@/src/core/app/enums/range_type";
import type { PriceType } from "@/src/core/app/enums/price_type";

export class CreateCommissionDataModel {
  @Expose({ name: "marketer_id" })
  marketerId!: Id;
  @Expose()
  name!: string;
  @Expose({ name: "price_type" })
  priceType!: PriceType;
  @Expose({ name: "rate_type_id" })
  rateType?: Id;
  @Expose()
  rates!: Id[];
  @Expose({ name: "min_power" })
  minPower?: number;
  @Expose({ name: "max_power" })
  maxPower?: number;
  @Expose({ name: "min_consumption" })
  minConsumption?: number;
  @Expose({ name: "max_consumption" })
  maxConsumption?: number;
  @Expose({ name: "percentage_test_commission" })
  percentagetestCommission?: number;
  @Expose({ name: "test_commission" })
  testCommission?: number;
  @Expose({ name: "rate_type_segmentation" })
  rateTypeSegmentation?: boolean;
  @Expose({ name: "range_type" })
  rangeType?: RangeTypes;

  fromDomain(domainObject: CreateCommissionModel) {
    this.marketerId = domainObject.marketerId;
    this.name = domainObject.name;
    this.priceType = domainObject.priceType;
    this.rateType = domainObject.rateType?.id;
    this.rates = domainObject.rates.map((rate) => rate.id);
    this.minPower = domainObject.minPower;
    this.maxPower = domainObject.maxPower;
    this.minConsumption = domainObject.minConsumption;
    this.maxConsumption = domainObject.maxConsumption;
    this.percentagetestCommission = domainObject.percentagetestCommission;
    this.testCommission = domainObject.testCommission;
    this.rateTypeSegmentation = domainObject.rateTypeSegmentation;
    this.rangeType = domainObject.rangeType;
  }

  toJson() {
    return toJson(this);
  }
}
