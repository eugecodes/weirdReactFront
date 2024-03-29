import type { IEnvVars } from "../interfaces/env_vars";
import { injectable } from "inversify";

@injectable()
export class EnvVars implements IEnvVars {
  serverUrl: string = process.env.REACT_APP_API_URL ?? "localhost:3000";

  get isProduction() {
    return process.env.NODE_ENV === "production";
  }

  sentryDSN?: string = process.env.SENTRY_DSN || process.env.REACT_APP_SENTRY_DSN;

  sentryEnabled: boolean = process.env.REACT_APP_SENTRY_ENABLED === "true";
}
