import { toJson } from "@/src/common/utils/transformers";
import type { Id } from "@/src/common/utils/types";

export class CreateContactModel {
  clientId: Id;
  name: string;
  email: string;
  phone: string;
  isMainContact: boolean;

  constructor(contact: { clientId: Id; name: string; email: string; phone: string; isMainContact: boolean }) {
    this.clientId = contact.clientId;
    this.name = contact.name;
    this.email = contact.email;
    this.phone = contact.phone;
    this.isMainContact = contact.isMainContact;
  }

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
