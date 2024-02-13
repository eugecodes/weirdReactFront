import type { Id } from "@/src/common/utils/types";

export class FilterContactModel {
  id?: Id;
  name?: string;
  email?: string;
  phone?: string;
  createdAt?: string;
  user?: string;
  clientId?: number;

  constructor(contact: { id?: Id; name?: string; email?: string; phone?: string; createdAt?: string; user?: string; clientId?: number }) {
    this.id = contact.id;
    this.name = contact.name;
    this.email = contact.email;
    this.phone = contact.phone;
    this.createdAt = contact.createdAt;
    this.user = contact.user;
    this.clientId = contact.clientId;
  }
}
