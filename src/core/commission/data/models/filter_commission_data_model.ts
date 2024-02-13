import { fromOptionsToId, toJson } from "@/src/common/utils/transformers";
import { Expose, Transform } from "class-transformer";
import type { FilterCommissionModel } from "@/src/core/commission/domain/models/filter_commission_model";
import type { Id, Option } from "@/src/common/utils/types";
import type { PriceType } from "@/src/core/app/enums/price_type";
import { CreateAtFilterDataModel } from "@/src/core/app/data/models/create_at_filter_data_model";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";

export class FiltersCommissionDataModel extends CreateAtFilterDataModel {
  @Expose({ name: "rates__marketer_id" })
  marketerId?: Id;
  @Expose({ name: "name__unaccent" })
  name?: string;
  @Expose({ name: "rates__price_type" })
  priceType?: PriceType;
  @Expose({ name: "rate_type__energy_type" })
  energyType?: EnergyTypes;
  @Expose({ name: "rate_type__id__in" })
  @Transform(fromOptionsToId)
  rateType?: Option[];
  @Expose({ name: "rates__id__in" })
  @Transform(fromOptionsToId)
  rates?: Option[];
  @Expose({ name: "min_power__gte" })
  minPower?: string;
  @Expose({ name: "max_power__lte" })
  maxPower?: string;
  @Expose({ name: "min_consumption__gte" })
  minConsumption?: string;
  @Expose({ name: "max_consumption__lte" })
  maxConsumption?: string;
  @Expose({ name: "percentage_test_commission__gte" })
  percentagetestCommission?: string;
  @Expose({ name: "test_commission__gte" })
  testCommission?: string;

  fromDomain(domainObject: FilterCommissionModel) {
    if (domainObject.createdAt) {
      super.fromChild(domainObject.createdAt);
    }
    this.marketerId = domainObject.marketerId;
    this.name = domainObject.name;
    this.priceType = domainObject.priceType;
    this.energyType = domainObject.energyType;
    this.rateType = domainObject?.rateType;
    this.rates = domainObject?.rates;
    this.minPower = domainObject.minPower;
    this.maxPower = domainObject.maxPower;
    this.minConsumption = domainObject.minConsumption;
    this.maxConsumption = domainObject.maxConsumption;
    this.percentagetestCommission = domainObject.percentagetestCommission;
    this.testCommission = domainObject.testCommission;
  }

  toJson() {
    return toJson(this);
  }
}
