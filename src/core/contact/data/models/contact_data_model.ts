import { fromDataDateStringToDomainDate } from "@/src/common/utils/dates";
import { toJson } from "@/src/common/utils/transformers";
import { Expose, Type } from "class-transformer";
import { ContactModel } from "@/src/core/contact/domain/models/contact_model";
import type { DataModel } from "@/src/common/interfaces/data_model";
import type { Id } from "@/src/common/utils/types";
import { UserDataModel } from "@/src/core/user/data/models/user_data_model";

export class ContactDataModel implements DataModel<ContactModel> {
  @Expose()
  id!: Id;
  @Expose({ name: "is_active" })
  isActive!: boolean;
  @Expose({ name: "is_main_contact" })
  isMainContact!: boolean;
  @Expose()
  name!: string;
  @Expose()
  email!: string;
  @Expose()
  phone!: string;
  @Expose({ name: "create_at" })
  createdAt!: string;
  @Expose({ name: "user" })
  @Type(() => UserDataModel)
  user!: UserDataModel;

  toDomain(): ContactModel {
    return new ContactModel({
      id: this.id,
      isActive: this.isActive,
      isMainContact: this.isMainContact,
      name: this.name,
      email: this.email,
      phone: this.phone,
      createdAt: fromDataDateStringToDomainDate(this.createdAt),
      user: this.user?.toDomain()
    });
  }

  fromDomain(domainObject: ContactModel) {
    this.id = domainObject.id;
    this.isActive = domainObject.isActive;
    this.isMainContact = domainObject.isMainContact;
    this.name = domainObject.name;
    this.email = domainObject.email;
    this.phone = domainObject.phone;
    this.createdAt = domainObject.createdAt;
  }

  toJson() {
    return toJson(this);
  }
}
