import type { Id } from "@/src/common/utils/types";
import type { ConstructorType } from "@/src/common/interfaces/constructor_type";
import type { UserModel } from "@/src/core/user/domain/models/user_model";

export class ContactModel {
  id: Id;
  isActive: boolean;
  isMainContact: boolean;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  user: UserModel;

  constructor(contact: ConstructorType<ContactModel>) {
    this.id = contact.id;
    this.isActive = contact.isActive;
    this.isMainContact = contact.isMainContact;
    this.name = contact.name;
    this.email = contact.email;
    this.phone = contact.phone;
    this.createdAt = contact.createdAt;
    this.user = contact.user;
  }

  creationData() {
    return {
      createdAt: this.createdAt,
      createdBy: this.user?.name || ""
    };
  }
}
