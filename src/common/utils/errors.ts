import { errorProvider } from "@/src/ui/provider/error.provider";
import type { ApiError } from "../interfaces/api_error_model";
import type { IRestDataError } from "../interfaces/rest_data_source";

export async function withErrorHandler<T>(promise: Promise<T>) {
  try {
    return await promise;
  } catch (e) {
    console.error(e);
    if (Array.isArray(e)) {
      errorProvider.getState().setErrors(e as ApiError[]);
    } else {
      const error: ApiError = {
        code: "",
        field: "",
        message: "",
        source: ""
      };
      errorProvider.getState().setErrors([error]);
    }
    throw e;
  }
}

export function handleResponseError(responseError: IRestDataError): ApiError[] {
  const errorMessage = responseError?.response?.data?.detail;

  if (!errorMessage) {
    const serverError: ApiError = {
      code: "default",
      source: null,
      field: null,
      message: "server error"
    };
    return [serverError];
  }

  return errorMessage;
}
