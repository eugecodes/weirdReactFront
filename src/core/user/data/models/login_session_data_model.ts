import { Expose, Type } from "class-transformer";
import { LoginSessionModel } from "../../domain/models/session_model";
import { UserDataModel } from "./user_data_model";

export class LoginSessionDataModel {
  @Expose() token!: string;
  @Expose() @Type(() => UserDataModel) user!: UserDataModel;

  toDomain() {
    return new LoginSessionModel({ token: this.token, user: this.user.toDomain() });
  }
}
