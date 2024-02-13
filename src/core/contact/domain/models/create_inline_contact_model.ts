import { toJson } from "@/src/common/utils/transformers";

export class CreateInlineContactModel {
  name: string;
  email: string;
  phone: string;

  constructor(contact: { name: string; email: string; phone: string }) {
    this.name = contact.name;
    this.email = contact.email;
    this.phone = contact.phone;
  }

  fromDomain(domainObject: CreateInlineContactModel) {
    this.name = domainObject.name;
    this.email = domainObject.email;
    this.phone = domainObject.phone;
  }

  toJson() {
    return toJson(this);
  }
}
