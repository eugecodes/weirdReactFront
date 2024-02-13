export class LoginModel {
  email: string;
  password: string;

  constructor(loginModel: { email: string; password: string }) {
    this.email = loginModel.email;
    this.password = loginModel.password;
  }
}
