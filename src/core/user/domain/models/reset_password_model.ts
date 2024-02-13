export class ResetPasswordModel {
  password: string;
  userId?: number;
  timestamp?: string;
  token?: string;

  constructor(resetPassword: { password: string; userId?: number; timestamp?: string; token: string }) {
    this.password = resetPassword.password;

    if (resetPassword.userId) {
      this.userId = resetPassword.userId;
    }

    if (resetPassword.timestamp) {
      this.timestamp = resetPassword.timestamp;
    }

    if (resetPassword.token) {
      this.token = resetPassword.token;
    }
  }
}
