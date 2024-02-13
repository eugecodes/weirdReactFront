import type { OrderData } from "@/src/core/app/data/models/order_data";
import { orderFromDomainToData } from "@/src/core/app/data/models/order_data";
import { Expose } from "class-transformer";
import type { SortContract } from "@/src/core/contract/domain/interfaces/sort_contract";
import { fromSortObjectToOrderQueryParam } from "@/src/common/utils";

export class SortContractDataModel {
  @Expose() id?: OrderData;
  @Expose() alias?: OrderData;
  @Expose({ name: "energy_type" }) energyType?: OrderData;
  @Expose({ name: "supply_postal_code" }) supplyPostalCode?: OrderData;
  @Expose({ name: "supply_city" }) supplyCity?: OrderData;
  @Expose({ name: "supply_province" }) supplyProvince?: OrderData;
  @Expose({ name: "created_at" }) createdAt?: OrderData;

  fromDomain(domainObject: SortContract = {}) {
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
