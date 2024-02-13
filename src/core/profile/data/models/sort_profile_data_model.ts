import type { OrderData } from "@/src/core/app/data/models/order_data";
import { orderFromDomainToData } from "@/src/core/app/data/models/order_data";
import { Expose } from "class-transformer";
import type { SortProfile } from "@/src/core/profile/domain/interfaces/sort_profile";
import { fromSortObjectToOrderQueryParam } from "@/src/common/utils";

export class SortProfileDataModel {
  @Expose({ name: "first_name" }) firstName?: OrderData;
  @Expose({ name: "last_name" }) lastName?: OrderData;
  @Expose() email?: OrderData;
  @Expose() role?: OrderData;
  @Expose({ name: "is_active" }) isActive?: OrderData;
  @Expose({ name: "create_at" }) createdAt?: OrderData;
  @Expose({ name: "responsible__first_name" }) responsible?: OrderData;

  fromDomain(domainObject: SortProfile) {
    this.firstName = orderFromDomainToData(domainObject.name);
    this.lastName = orderFromDomainToData(domainObject.surnames);
    this.email = orderFromDomainToData(domainObject.email);
    this.role = orderFromDomainToData(domainObject.role);
    this.isActive = orderFromDomainToData(domainObject.enabled);
    this.createdAt = orderFromDomainToData(domainObject.createdAt);
    this.responsible = orderFromDomainToData(domainObject.responsible);
  }

  toString() {
    return fromSortObjectToOrderQueryParam(this);
  }
}
