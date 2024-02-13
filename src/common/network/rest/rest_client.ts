import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

export type GetRequestOptions = Pick<AxiosRequestConfig, "params" | "headers">;

export type PostRequestOptions<D = Record<string, unknown>> = Pick<AxiosRequestConfig<D>, "headers" | "data">;

export type PutRequestOptions<D> = PostRequestOptions<D>;
export type PatchRequestOptions<D> = PostRequestOptions<D>;
export type DeleteRequestOptions = GetRequestOptions;

interface RestOptions {
  interceptors?: Interceptors;
}

interface Interceptors {
  request?: {
    fulfilled: (config: AxiosRequestConfig) => void;
    rejected: (error: AxiosError) => void;
  };
  response?: {
    fulfilled: (response: AxiosResponse) => void;
    rejected: (error: AxiosError) => void;
  };
}

export class RestClient {
  private client: AxiosInstance;

  constructor(baseUrl: string, options?: RestOptions) {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 5000
    });

    if (options && options.interceptors && options.interceptors.request)
      this.client.interceptors.request.use(
        function (config) {
          if (options && options.interceptors?.request) {
            return options.interceptors.request.fulfilled(config);
          }
        },
        function (error) {
          if (options && options.interceptors && options.interceptors.request) {
            return options.interceptors.request.rejected(error);
          }
        }
      );

    if (options && options.interceptors && options.interceptors.response) {
      this.client.interceptors.response.use(
        function (response) {
          if (options && options.interceptors && options.interceptors.response) {
            return options.interceptors.response.fulfilled(response);
          }
        },
        function (error) {
          if (options && options.interceptors && options.interceptors.response) {
            return options.interceptors.response.rejected(error);
          }
        }
      );
    }
  }

  async get<T>(url: string, options?: GetRequestOptions): Promise<AxiosResponse<T>> {
    return await this.client.get<T>(url, options);
  }

  async delete<T>(url: string, options?: DeleteRequestOptions): Promise<AxiosResponse<T>> {
    return await this.client.delete<T>(url, options);
  }

  async post<T, D>(url: string, options?: PostRequestOptions<D>): Promise<AxiosResponse<T>> {
    return await this.client.post<T>(url, options?.data, options);
  }

  async put<T, D>(url: string, options?: PutRequestOptions<D>): Promise<AxiosResponse<T>> {
    return await this.client.put<T>(url, options?.data, options);
  }

  async patch<T, D>(url: string, options?: PatchRequestOptions<D>): Promise<AxiosResponse<T>> {
    return await this.client.patch<T>(url, options?.data, options);
  }
}
