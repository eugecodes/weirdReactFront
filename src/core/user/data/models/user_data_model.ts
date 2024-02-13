import { fromDataDateStringToDomainDate } from "@/src/common/utils/dates";
import { Expose } from "class-transformer";
import { UserModel } from "../../domain/models/user_model";

export class UserDataModel {
  @Expose()
  id!: number;

  @Expose({ name: "first_name" })
  firstName!: string;

  @Expose({ name: "last_name" })
  lastName!: string;

  @Expose()
  email!: string;

  @Expose({ name: "is_active" })
  isActive!: boolean;

  @Expose({ name: "is_superadmin" })
  isSuperadmin!: boolean;

  @Expose({ name: "is_deleted" }) isDeleted!: boolean;
  @Expose({ name: "create_at" }) createdAt!: string;

  toDomain() {
    return new UserModel({
      id: this.id,
      name: this.firstName,
      surname: this.lastName,
      email: this.email,
      isActive: this.isActive,
      isSuperadmin: this.isSuperadmin,
      isDeleted: this.isDeleted,
      createdAt: fromDataDateStringToDomainDate(this.createdAt)
    });
  }
}
