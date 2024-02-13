import type { OrderData } from "@/src/core/app/data/models/order_data";
import { orderFromDomainToData } from "@/src/core/app/data/models/order_data";
import { Expose } from "class-transformer";
import type { SortSupplyPoint } from "@/src/core/supply_point/domain/interfaces/sort_supply_point";
import { fromSortObjectToOrderQueryParam } from "@/src/common/utils";

export class SortSupplyPointDataModel {
  @Expose() id?: OrderData;
  @Expose() alias?: OrderData;
  @Expose({ name: "energy_type" }) energyType?: OrderData;
  @Expose({ name: "supply_postal_code" }) supplyPostalCode?: OrderData;
  @Expose({ name: "supply_city" }) supplyCity?: OrderData;
  @Expose({ name: "supply_province" }) supplyProvince?: OrderData;
  @Expose({ name: "created_at" }) createdAt?: OrderData;

  fromDomain(domainObject: SortSupplyPoint = {}) {
    this.id = orderFromDomainToData(domainObject.id);
    this.alias = orderFromDomainToData(domainObject.alias);
    this.energyType = orderFromDomainToData(domainObject.energyType);
    this.supplyPostalCode = orderFromDomainToData(domainObject.supplyPostalCode);
    this.supplyCity = orderFromDomainToData(domainObject.supplyCity);
    this.supplyProvince = orderFromDomainToData(domainObject.supplyProvince);
    this.createdAt = orderFromDomainToData(domainObject.createdAt);
    return this;
  }

  toString() {
    return fromSortObjectToOrderQueryParam(this);
  }
}
