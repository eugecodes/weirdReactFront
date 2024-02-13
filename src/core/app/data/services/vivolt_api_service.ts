import { inject, injectable } from "inversify";
import type { DeleteRequestOptions, GetRequestOptions, PatchRequestOptions, PostRequestOptions } from "@/src/common/network/rest/rest_client";
import { RestClient } from "@/src/common/network/rest/rest_client";
import type { IEnvVars } from "@/src/core/app/domain/interfaces/env_vars";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IRestDataError, IRestDataSource } from "@/src/common/interfaces/rest_data_source";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { IAuthTokenService } from "@/src/core/app/domain/interfaces/i_auth_token_service";
import type { AxiosRequestConfig } from "axios";
import { handleResponseError } from "@/src/common/utils/errors";

@injectable()
export class testApiService implements IRestDataSource {
  @inject(TYPES.IAuthTokenService) private authTokenServiceProvider!: IocProvider<IAuthTokenService>;
  private readonly restClient: RestClient;

  constructor(@inject(TYPES.IEnvVars) envVars: IEnvVars) {
    this.restClient = new RestClient(envVars.serverUrl, {
      interceptors: {
        request: {
          fulfilled: async (config: AxiosRequestConfig) => {
            const authTokenService = await this.authTokenServiceProvider();
            if (config && config.headers && authTokenService.token) {
              config.headers["Authorization"] = "token " + authTokenService.token;
              config.headers["Content-Type"] = "application/merge-patch+json";
              config.headers["Cache-Control"] = "no-cache";
            }
            return config;
          },
          rejected: (error) => {
            return Promise.reject(error);
          }
        },
        response: {
          fulfilled: (response) => response,
          rejected: (error) => {
            const restError = error as IRestDataError;
            const apiErrors = handleResponseError(restError);
            return Promise.reject(apiErrors);
          }
        }
      }
    });
  }

  async get<T = unknown>(url: string, options?: GetRequestOptions): Promise<T> {
    const res = await this.restClient.get<T>(url, options);
    return res.data;
  }

  async post<T, D>(url: string, options?: PostRequestOptions<D>): Promise<T> {
    const res = await this.restClient.post<T, D>(url, options);
    return res.data;
  }

  async patch<T, D>(url: string, options?: PatchRequestOptions<D>): Promise<T> {
    const res = await this.restClient.patch<T, D>(url, options);
    return res.data;
  }

  async put<T, D>(url: string, options?: PostRequestOptions<D>): Promise<T> {
    const res = await this.restClient.put<T, D>(url, options);
    return res.data;
  }

  async delete<T>(url: string, options?: DeleteRequestOptions): Promise<T> {
    const res = await this.restClient.delete<T>(url, options);
    return res.data;
  }
}
