import type { OrderData } from "@/src/core/app/data/models/order_data";
import { orderFromDomainToData } from "@/src/core/app/data/models/order_data";
import { Expose } from "class-transformer";
import { fromSortObjectToOrderQueryParam } from "@/src/common/utils";
import type { SortRate } from "@/src/core/rate/domain/interfaces/sort_rate";

export class SortRateDataModel {
  @Expose({ name: "marketer__name" })
  marketer?: OrderData;
  @Expose()
  name?: OrderData;
  @Expose({ name: "energy_type" })
  energyType?: OrderData;
  @Expose({ name: "price_type" })
  priceType?: OrderData;
  @Expose({ name: "client_types" })
  clientTypes?: OrderData;
  @Expose({ name: "rate_type__order_by" })
  rateType?: OrderData;
  @Expose()
  permanency?: OrderData;
  @Expose()
  length?: OrderData;
  @Expose({ name: "is_full_renewable" })
  isFullRenewable?: OrderData;
  @Expose({ name: "compensation_surplus" })
  compensationSurplus?: OrderData;
  @Expose({ name: "compensation_surplus_value" })
  compensationSurplusValue?: OrderData;
  @Expose({ name: "min_power" })
  minPower?: OrderData;
  @Expose({ name: "max_power" })
  maxPower?: OrderData;
  @Expose({ name: "energy_price_1" })
  energyPrice1?: OrderData;
  @Expose({ name: "energy_price_2" })
  energyPrice2?: OrderData;
  @Expose({ name: "energy_price_3" })
  energyPrice3?: OrderData;
  @Expose({ name: "energy_price_4" })
  energyPrice4?: OrderData;
  @Expose({ name: "energy_price_5" })
  energyPrice5?: OrderData;
  @Expose({ name: "energy_price_6" })
  energyPrice6?: OrderData;
  @Expose({ name: "power_price_1" })
  powerPrice1?: OrderData;
  @Expose({ name: "power_price_2" })
  powerPrice2?: OrderData;
  @Expose({ name: "power_price_3" })
  powerPrice3?: OrderData;
  @Expose({ name: "power_price_4" })
  powerPrice4?: OrderData;
  @Expose({ name: "power_price_5" })
  powerPrice5?: OrderData;
  @Expose({ name: "power_price_6" })
  powerPrice6?: OrderData;
  @Expose({ name: "fixed_term_price" })
  fixedTermPrice?: OrderData;
  @Expose({ name: "is_active" })
  isActive?: OrderData;

  fromDomain(domainObject: SortRate = {}) {
    this.marketer = orderFromDomainToData(domainObject.marketer);
    this.name = orderFromDomainToData(domainObject.name);
    this.energyType = orderFromDomainToData(domainObject.energyType);
    this.priceType = orderFromDomainToData(domainObject.priceType);
    this.clientTypes = orderFromDomainToData(domainObject.clientTypes);
    this.permanency = orderFromDomainToData(domainObject.permanency);
    this.length = orderFromDomainToData(domainObject.length);
    this.isFullRenewable = orderFromDomainToData(domainObject.isFullRenewable);
    this.compensationSurplus = orderFromDomainToData(domainObject.compensationSurplus);
    this.compensationSurplusValue = orderFromDomainToData(domainObject.compensationSurplusValue);
    this.minPower = orderFromDomainToData(domainObject.minPower);
    this.maxPower = orderFromDomainToData(domainObject.maxPower);
    this.energyPrice1 = orderFromDomainToData(domainObject.energyPrice1);
    this.energyPrice2 = orderFromDomainToData(domainObject.energyPrice2);
    this.energyPrice3 = orderFromDomainToData(domainObject.energyPrice3);
    this.energyPrice4 = orderFromDomainToData(domainObject.energyPrice4);
    this.energyPrice5 = orderFromDomainToData(domainObject.energyPrice5);
    this.energyPrice6 = orderFromDomainToData(domainObject.energyPrice6);
    this.powerPrice1 = orderFromDomainToData(domainObject.powerPrice1);
    this.powerPrice2 = orderFromDomainToData(domainObject.powerPrice2);
    this.powerPrice3 = orderFromDomainToData(domainObject.powerPrice3);
    this.powerPrice4 = orderFromDomainToData(domainObject.powerPrice4);
    this.powerPrice5 = orderFromDomainToData(domainObject.powerPrice5);
    this.powerPrice6 = orderFromDomainToData(domainObject.powerPrice6);
    this.fixedTermPrice = orderFromDomainToData(domainObject.fixedTermPrice);
    this.isActive = orderFromDomainToData(domainObject.enabled);
  }

  toString() {
    return fromSortObjectToOrderQueryParam(this);
  }
}
