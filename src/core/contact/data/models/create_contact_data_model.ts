import { Expose } from "class-transformer";
import { toJson } from "@/src/common/utils/transformers";
import type { CreateContactModel } from "@/src/core/contact/domain/models/create_contact_model";
import type { Id } from "@/src/common/utils/types";

export class CreateContactDataModel {
  @Expose({ name: "client_id" })
  clientId!: Id;
  @Expose()
  name!: string;
  @Expose()
  email!: string;
  @Expose()
  phone!: string;
  @Expose({ name: "is_main_contact" })
  isMainContact!: boolean;

  fromDomain(domainObject: CreateContactModel) {
    this.clientId = domainObject.clientId;
    this.name = domainObject.name;
    this.email = domainObject.email;
    this.phone = domainObject.phone;
    this.isMainContact = domainObject.isMainContact;
  }

  toJson() {
    return toJson(this);
  }
}
