import { injectable } from "inversify";
import type { IAuthTokenService } from "@/src/core/app/domain/interfaces/i_auth_token_service";

@injectable()
export class AuthTokenService implements IAuthTokenService {
  token?: string;
  readonly tokenKey = "authToken";

  constructor() {
    this.token = localStorage.getItem(this.tokenKey) ?? undefined;
  }

  remove(): void {
    this.token = undefined;
    localStorage.removeItem(this.tokenKey);
  }

  set(token: string): void {
    this.token = token;
    localStorage.setItem(this.tokenKey, token);
  }
}
