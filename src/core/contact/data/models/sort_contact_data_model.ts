import type { OrderData } from "@/src/core/app/data/models/order_data";
import { orderFromDomainToData } from "@/src/core/app/data/models/order_data";
import { Expose } from "class-transformer";
import type { SortContact } from "@/src/core/contact/domain/interfaces/sort_contact";
import { fromSortObjectToOrderQueryParam } from "@/src/common/utils";

export class SortContactDataModel {
  @Expose() id?: OrderData;
  @Expose() name?: OrderData;
  @Expose() email?: OrderData;
  @Expose() phone?: OrderData;
  @Expose({ name: "created_at" }) createdAt?: OrderData;

  fromDomain(domainObject: SortContact = {}) {
    this.id = orderFromDomainToData(domainObject.id);
    this.name = orderFromDomainToData(domainObject.name);
    this.email = orderFromDomainToData(domainObject.email);
    this.phone = orderFromDomainToData(domainObject.phone);
    this.createdAt = orderFromDomainToData(domainObject.createdAt);
    return this;
  }

  toString() {
    return fromSortObjectToOrderQueryParam(this);
  }
}
