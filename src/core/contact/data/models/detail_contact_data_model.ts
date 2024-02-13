import { fromDataDateStringToDomainDate } from "@/src/common/utils/dates";
import { toJson } from "@/src/common/utils/transformers";
import { Expose, Type } from "class-transformer";
import type { Id } from "@/src/common/utils/types";
import { UserDataModel } from "@/src/core/user/data/models/user_data_model";
import { DetailContactModel } from "@/src/core/contact/domain/models/detail_contact_model";

export class DetailContactDataModel {
  @Expose()
  id!: Id;
  @Expose({ name: "client_id" })
  clientId!: Id;
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

  toDomain(): DetailContactModel {
    return new DetailContactModel({
      id: this.id,
      clientId: this.clientId,
      isActive: this.isActive,
      isMainContact: this.isMainContact,
      name: this.name,
      email: this.email,
      phone: this.phone,
      createdAt: fromDataDateStringToDomainDate(this.createdAt),
      user: this.user?.toDomain()
    });
  }

  toJson() {
    return toJson(this);
  }
}
