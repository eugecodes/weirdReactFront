import { fromSortObjectToOrderQueryParam } from "@/src/common/utils";
import type { OrderData } from "@/src/core/app/data/models/order_data";
import { orderFromDomainToData } from "@/src/core/app/data/models/order_data";
import { Expose } from "class-transformer";
import type { SortMarketer } from "../../domain/interfaces/sort_marketer";

export default class SortMarketerDataModel {
  @Expose() name?: OrderData;
  @Expose({ name: "fiscal_name" }) fiscalName?: OrderData;
  @Expose() cif?: OrderData;
  @Expose() email?: OrderData;
  @Expose({ name: "is_active" }) isActive?: OrderData;
  @Expose({ name: "create_at" }) createdAt?: OrderData;
  @Expose({ name: "user__first_name" }) responsible?: OrderData;

  fromDomain(domainObject: SortMarketer = {}) {
    this.name = orderFromDomainToData(domainObject.name);
    this.fiscalName = orderFromDomainToData(domainObject.fiscalName);
    this.cif = orderFromDomainToData(domainObject.cif);
    this.email = orderFromDomainToData(domainObject.email);
    this.isActive = orderFromDomainToData(domainObject.enabled);
    this.createdAt = orderFromDomainToData(domainObject.createdAt);
    this.responsible = orderFromDomainToData(domainObject.responsible);
  }

  toString() {
    return fromSortObjectToOrderQueryParam(this);
  }
}
