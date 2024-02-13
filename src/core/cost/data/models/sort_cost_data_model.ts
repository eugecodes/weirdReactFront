import type { OrderData } from "@/src/core/app/data/models/order_data";
import { orderFromDomainToData } from "@/src/core/app/data/models/order_data";
import { Expose } from "class-transformer";
import type { SortCost } from "@/src/core/cost/domain/interfaces/sort_cost";
import { fromSortObjectToOrderQueryParam } from "@/src/common/utils";

export class SortCostDataModel {
  @Expose()
  name?: OrderData;
  @Expose({ name: "client_types" })
  clientTypes?: OrderData;
  @Expose({ name: "rates__name" })
  rates?: OrderData;
  @Expose({ name: "min_power" })
  minPower?: OrderData;
  @Expose({ name: "max_power" })
  maxPower?: OrderData;
  @Expose()
  quantity?: OrderData;
  @Expose({ name: "type" })
  costType?: OrderData;
  @Expose({ name: "is_active" }) isActive?: OrderData;
  @Expose({ name: "create_at" }) createdAt?: OrderData;
  @Expose() responsible?: OrderData;

  fromDomain(domainObject: SortCost) {
    this.name = orderFromDomainToData(domainObject.name);
    this.clientTypes = orderFromDomainToData(domainObject.clientTypes);
    this.rates = orderFromDomainToData(domainObject.rates);
    this.minPower = orderFromDomainToData(domainObject.minPower);
    this.maxPower = orderFromDomainToData(domainObject.maxPower);
    this.quantity = orderFromDomainToData(domainObject.quantity);
    this.costType = orderFromDomainToData(domainObject.costType);
    this.isActive = orderFromDomainToData(domainObject.enabled);
    this.createdAt = orderFromDomainToData(domainObject.createdAt);
    this.responsible = orderFromDomainToData(domainObject.responsible);
  }

  toString() {
    return fromSortObjectToOrderQueryParam(this);
  }
}
