import type { ApiError } from "@/src/common/interfaces/api_error_model";
import type { DomainError } from "@/src/common/interfaces/domain_error";
import { getUUID } from "@/src/common/utils";
import { createStore, useStore } from "zustand";
import type { ErrorState } from "../view_models/error_state";

export const errorProvider = createStore<ErrorState>((set, get) => ({
  errors: [],
  setErrors(apiErrors: ApiError[] | DomainError) {
    if (Array.isArray(apiErrors)) {
      const apiErrorsWithId: ApiError[] = [];
      apiErrors.forEach((error) => {
        /* Removing errors with the same code to avoid show duplicated errors. */
        if (!apiErrorsWithId.some((e) => error.code === e.code)) {
          const uuid = getUUID();
          apiErrorsWithId.push({ uuid, ...error });
        }
      });
      set({ errors: apiErrorsWithId });
    } else {
      const domainError: ApiError = { code: "", source: "", field: "", message: "", uuid: getUUID() };
      set({ errors: [domainError] });
    }
  },
  removeError(uuid: string) {
    set({ errors: get().errors.filter((error) => error.uuid !== uuid) });
  }
}));

export function useErrorProvider(): ErrorState;
export function useErrorProvider<T>(selector: (state: ErrorState) => T, equals?: (a: T, b: T) => boolean): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useErrorProvider(selector?: any, equals?: any) {
  return useStore(errorProvider, selector, equals);
}
