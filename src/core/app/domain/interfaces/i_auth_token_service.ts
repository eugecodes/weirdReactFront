export interface IAuthTokenService {
  token?: string;
  set(token: string): void;
  remove(): void;
}
