import type { OrderData } from "@/src/core/app/data/models/order_data";
import { orderFromDomainToData } from "@/src/core/app/data/models/order_data";
import { Expose } from "class-transformer";
import type { SortRateType } from "@/src/core/rate_type/domain/interfaces/sort_rate_type";
import { fromSortObjectToOrderQueryParam } from "@/src/common/utils";

export class SortRateTypeDataModel {
  @Expose() name?: OrderData;
  @Expose({ name: "energy_type" }) energyType?: OrderData;
  @Expose({ name: "min_power" }) minPower?: OrderData;
  @Expose({ name: "max_power" }) maxPower?: OrderData;
  @Expose({ name: "enable" }) isActive?: OrderData;
  @Expose({ name: "create_at" }) createdAt?: OrderData;
  @Expose({ name: "user__first_name" }) responsible?: OrderData;

  fromDomain(domainObject: SortRateType = {}) {
    this.name = orderFromDomainToData(domainObject.name);
    this.energyType = orderFromDomainToData(domainObject.energyType);
    this.minPower = orderFromDomainToData(domainObject.minPower);
    this.maxPower = orderFromDomainToData(domainObject.maxPower);
    this.isActive = orderFromDomainToData(domainObject.enabled);
    this.createdAt = orderFromDomainToData(domainObject.createdAt);
    this.responsible = orderFromDomainToData(domainObject.responsible);
  }

  toString() {
    return fromSortObjectToOrderQueryParam(this);
  }
}
