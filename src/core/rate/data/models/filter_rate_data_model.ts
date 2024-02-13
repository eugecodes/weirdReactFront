import { fromOptionsToId, optionToId, toJson } from "@/src/common/utils/transformers";
import { Expose, Transform } from "class-transformer";
import type { FilterRateModel } from "@/src/core/rate/domain/models/filter_rate_model";
import { isBoolean } from "lodash";
import type { PriceType } from "@/src/core/app/enums/price_type";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { Option } from "@/src/common/utils/types";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { CreateAtFilterDataModel } from "@/src/core/app/data/models/create_at_filter_data_model";

export class FiltersRateDataModel extends CreateAtFilterDataModel {
  @Expose({ name: "marketer__id" })
  @Transform(optionToId)
  marketer?: Option | null;
  @Expose({ name: "name__unaccent" })
  name?: string;
  @Expose({ name: "rate_type__energy_type" })
  energyType?: EnergyTypes;
  @Expose({ name: "price_type" })
  priceType?: PriceType;
  @Expose({ name: "client_types__contains" })
  clientTypes?: ClientType[];
  @Expose({ name: "rate_type__id__in" })
  @Transform(fromOptionsToId)
  rateTypes?: Option[];
  @Expose()
  permanency?: boolean;
  @Expose({ name: "length__gte" })
  length?: string;
  @Expose({ name: "is_full_renewable" })
  isFullRenewable?: boolean;
  @Expose({ name: "compensation_surplus" })
  compensationSurplus?: boolean;
  @Expose({ name: "compensation_surplus_value" })
  compensationSurplusValue?: string;
  @Expose({ name: "min_power__gte" })
  minPower?: string;
  @Expose({ name: "max_power__lte" })
  maxPower?: string;
  @Expose({ name: "energy_price_1__gte" })
  energyPrice1?: string;
  @Expose({ name: "energy_price_2__gte" })
  energyPrice2?: string;
  @Expose({ name: "energy_price_3__gte" })
  energyPrice3?: string;
  @Expose({ name: "energy_price_4__gte" })
  energyPrice4?: string;
  @Expose({ name: "energy_price_5__gte" })
  energyPrice5?: string;
  @Expose({ name: "energy_price_6__gte" })
  energyPrice6?: string;
  @Expose({ name: "power_price_1__gte" })
  powerPrice1?: string;
  @Expose({ name: "power_price_2__gte" })
  powerPrice2?: string;
  @Expose({ name: "power_price_3__gte" })
  powerPrice3?: string;
  @Expose({ name: "power_price_4__gte" })
  powerPrice4?: string;
  @Expose({ name: "power_price_5__gte" })
  powerPrice5?: string;
  @Expose({ name: "power_price_6__gte" })
  powerPrice6?: string;
  @Expose({ name: "fixed_term_price__gte" })
  fixedTermPrice?: string;
  @Expose({ name: "is_active" }) isActive?: boolean;
  @Expose({ name: "user__first_name__unaccent" })
  responsible!: string;

  fromDomain(domainObject: FilterRateModel) {
    this.marketer = domainObject.marketer;
    this.name = domainObject.name;
    this.energyType = domainObject.energyType;
    this.priceType = domainObject.priceType;
    this.clientTypes = domainObject.clientTypes;
    this.rateTypes = domainObject.rateType;
    this.permanency = domainObject.permanency;
    this.length = domainObject.length;
    this.isFullRenewable = domainObject.isFullRenewable;
    this.compensationSurplus = domainObject.compensationSurplus;
    this.compensationSurplusValue = domainObject.compensationSurplusValue;
    this.minPower = domainObject.minPower;
    this.maxPower = domainObject.maxPower;
    this.energyPrice1 = domainObject.energyPrice1;
    this.energyPrice2 = domainObject.energyPrice2;
    this.energyPrice3 = domainObject.energyPrice3;
    this.energyPrice4 = domainObject.energyPrice4;
    this.energyPrice5 = domainObject.energyPrice5;
    this.energyPrice6 = domainObject.energyPrice6;
    this.powerPrice1 = domainObject.powerPrice1;
    this.powerPrice2 = domainObject.powerPrice2;
    this.powerPrice3 = domainObject.powerPrice3;
    this.powerPrice4 = domainObject.powerPrice4;
    this.powerPrice5 = domainObject.powerPrice5;
    this.powerPrice6 = domainObject.powerPrice6;
    this.fixedTermPrice = domainObject.fixedTermPrice;
    this.responsible = domainObject.responsible || "";

    if (isBoolean(domainObject.enabled)) {
      this.isActive = domainObject.enabled;
    }
    if (domainObject.createdAt) {
      super.fromChild(domainObject.createdAt);
    }
  }

  toJson() {
    return toJson(this);
  }
}
