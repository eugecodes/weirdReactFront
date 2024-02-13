import type { LoginModel } from "@/src/core/user/domain/models/login_model";
import type { UserModel } from "@/src/core/user/domain/models/user_model";

export interface UserState {
  user?: UserModel;
  me(): Promise<void>;
  logout(): Promise<void>;
  login(values: LoginModel): Promise<void>;
}
