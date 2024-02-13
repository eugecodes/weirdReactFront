import type { PostRequestOptions, GetRequestOptions, DeleteRequestOptions, PutRequestOptions } from "@/src/common/network/rest/rest_client";
import type { ApiError } from "./api_error_model";

export interface IRestDataSource {
  get<T>(url: string, options?: GetRequestOptions): Promise<T>;
  post<T, D>(url: string, options?: PostRequestOptions<D>): Promise<T>;
  put<T, D>(url: string, options?: PutRequestOptions<D>): Promise<T>;
  patch<T, D>(url: string, options?: PostRequestOptions<D>): Promise<T>;
  delete<T>(url: string, options?: DeleteRequestOptions): Promise<T>;
}

export interface IRestDataError {
  response: {
    status: number;
    data: {
      detail: ApiError[];
    };
  };
}
