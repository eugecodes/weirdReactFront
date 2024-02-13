import type { ConstructorType } from "@/src/common/interfaces/constructor_type";
import type { Id } from "@/src/common/utils/types";

export class UserModel {
  id: Id;
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  isSuperadmin: boolean;
  isDeleted: boolean;
  createdAt: string;

  constructor(user: ConstructorType<UserModel>) {
    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.isActive = user.isActive;
    this.isSuperadmin = user.isSuperadmin;
    this.isDeleted = user.isDeleted;
    this.createdAt = user.createdAt;
  }

  getNameInitial() {
    return this.name.charAt(0).toUpperCase();
  }
}
