import type { OrderData } from "@/src/core/app/data/models/order_data";
import { orderFromDomainToData } from "@/src/core/app/data/models/order_data";
import { Expose } from "class-transformer";
import type { SortEnergyCost } from "@/src/core/energy_cost/domain/interfaces/sort_energy_cost";
import { fromSortObjectToOrderQueryParam } from "@/src/common/utils";

export class SortEnergyCostDataModel {
  @Expose() concept?: OrderData;
  @Expose() amount?: OrderData;
  @Expose({ name: "is_active" }) isActive?: OrderData;
  @Expose({ name: "create_at" }) createdAt?: OrderData;
  @Expose({ name: "user__first_name" }) responsible?: OrderData;

  fromDomain(domainObject: SortEnergyCost) {
    this.concept = orderFromDomainToData(domainObject.concept);
    this.amount = orderFromDomainToData(domainObject.amount);
    this.isActive = orderFromDomainToData(domainObject.enabled);
    this.createdAt = orderFromDomainToData(domainObject.createdAt);
    this.responsible = orderFromDomainToData(domainObject.responsible);
  }

  toString() {
    return fromSortObjectToOrderQueryParam(this);
  }
}
