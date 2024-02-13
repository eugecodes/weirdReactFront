import type { UserModel } from "@/src/core/user/domain/models/user_model";

export class LoginSessionModel {
  token: string;
  user: UserModel;

  constructor(loginModel: { token: string; user: UserModel }) {
    this.token = loginModel.token;
    this.user = loginModel.user;
  }
}
