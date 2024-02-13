import type { ApiError } from "@/src/common/interfaces/api_error_model";

export interface ErrorState {
  errors: ApiError[];
  setErrors(errors: ApiError[]): void;
  removeError(uuid: string): void;
}
