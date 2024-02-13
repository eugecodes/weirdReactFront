import { Expose } from "class-transformer";
import type { ResetPasswordModel } from "../../domain/models/reset_password_model";

export class ResetPasswordDataModel {
  @Expose()
  hash!: string;

  @Expose({ name: "user_id" })
  userId!: number;

  @Expose()
  password!: string;

  fromDomain({ userId, password, timestamp, token }: ResetPasswordModel) {
    this.password = password;

    if (userId) {
      this.userId = userId;
    }

    if (token && timestamp) {
      this.hash = timestamp + "-" + token;
    }
  }
}
