import { Expose } from "class-transformer";
import { toJson } from "@/src/common/utils/transformers";
import type { CreateInlineContactModel } from "@/src/core/contact/domain/models/create_inline_contact_model";

export class CreateInlineContactDataModel {
  @Expose()
  name!: string;
  @Expose()
  email!: string;
  @Expose()
  phone!: string;

  fromDomain(domainObject: CreateInlineContactModel) {
    this.name = domainObject.name;
    this.email = domainObject.email;
    this.phone = domainObject.phone;
  }

  toJson() {
    return toJson(this);
  }
}
