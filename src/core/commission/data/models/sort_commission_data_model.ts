import type { OrderData } from "@/src/core/app/data/models/order_data";
import { orderFromDomainToData } from "@/src/core/app/data/models/order_data";
import { Expose } from "class-transformer";
import type { SortCommission } from "@/src/core/commission/domain/interfaces/sort_commission";
import { fromSortObjectToOrderQueryParam } from "@/src/common/utils";

export class SortCommissionDataModel {
  @Expose({ name: "marketer_id" })
  marketerId?: OrderData;
  @Expose()
  name?: OrderData;
  @Expose({ name: "rates__price_type" })
  priceType?: OrderData;
  @Expose({ name: "rate_type" })
  rateType?: OrderData;
  @Expose({ name: "rate_type__energy_type" })
  energyType?: OrderData;
  @Expose()
  rates?: OrderData;
  @Expose({ name: "min_power" })
  minPower?: OrderData;
  @Expose({ name: "max_power" })
  maxPower?: OrderData;
  @Expose({ name: "min_consumption" })
  minConsumption?: OrderData;
  @Expose({ name: "max_consumption" })
  maxConsumption?: OrderData;
  @Expose({ name: "percentage_test_commission" })
  percentagetestCommission?: OrderData;
  @Expose({ name: "test_commission" })
  testCommission?: OrderData;
  @Expose({ name: "create_at" }) createdAt?: OrderData;

  fromDomain(domainObject: SortCommission) {
    this.marketerId = orderFromDomainToData(domainObject.marketerId);
    this.name = orderFromDomainToData(domainObject.name);
    this.priceType = orderFromDomainToData(domainObject.priceType);
    this.energyType = orderFromDomainToData(domainObject.energyType);
    this.rates = orderFromDomainToData(domainObject.rates);
    this.minPower = orderFromDomainToData(domainObject.minPower);
    this.maxPower = orderFromDomainToData(domainObject.maxPower);
    this.minConsumption = orderFromDomainToData(domainObject.minConsumption);
    this.maxConsumption = orderFromDomainToData(domainObject.maxConsumption);
    this.percentagetestCommission = orderFromDomainToData(domainObject.percentagetestCommission);
    this.testCommission = orderFromDomainToData(domainObject.testCommission);
    this.createdAt = orderFromDomainToData(domainObject.createdAt);
  }

  toString() {
    return fromSortObjectToOrderQueryParam(this);
  }
}
