import { toJson } from "@/src/common/utils/transformers";
import { Expose } from "class-transformer";
import type { FilterContactModel } from "@/src/core/contact/domain/models/filter_contact_model";
import { CreateAtFilterDataModel } from "@/src/core/app/data/models/create_at_filter_data_model";
import type { Id } from "@/src/common/utils/types";

export class FiltersContactDataModel extends CreateAtFilterDataModel {
  @Expose()
  id?: Id;
  @Expose({ name: "is_active" })
  isActive?: boolean;
  @Expose({ name: "is_main_contact" })
  isMainContact?: boolean;
  @Expose({ name: "name__unaccent" })
  name?: string;
  @Expose({ name: "email__unaccent" })
  email?: string;
  @Expose({ name: "phone__unaccent" })
  phone?: string;
  @Expose({ name: "create_at" })
  createdAt?: string;
  @Expose({ name: "user__first_name__unaccent" })
  user?: string;
  @Expose({ name: "client_id" })
  clientId?: number;

  fromDomain(domainObject: FilterContactModel = {}) {
    if (domainObject.createdAt) {
      super.fromChild(domainObject.createdAt);
    }
    this.id = domainObject.id;
    this.name = domainObject.name;
    this.email = domainObject.email;
    this.phone = domainObject.phone;
    this.user = domainObject.user;
    this.clientId = domainObject.clientId;
  }

  toJson() {
    return toJson(this);
  }
}
