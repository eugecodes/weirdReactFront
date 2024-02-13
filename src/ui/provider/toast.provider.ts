import { getUUID } from "@/src/common/utils";
import type { ToastState } from "@/src/ui/view_models/toast_state";
import { createStore, useStore } from "zustand";
import type { Toast } from "../view_models/toast";

export const toastProvider = createStore<ToastState>((set, get) => ({
  toasts: [],
  showToast(toast: Omit<Toast, "id">) {
    set({ toasts: [...get().toasts, { ...toast, id: getUUID() }] });
  },
  showErrorToast(toast: Toast) {
    const isErroToastAlreadyInside = get().toasts.find(({ id }) => id === toast.id);
    if (!isErroToastAlreadyInside) {
      set({ toasts: [...get().toasts, toast] });
    }
  },
  closeToast(id: string) {
    set({ toasts: get().toasts.filter((toast) => toast.id !== id) });
  }
}));

export function useToastProvider(): ToastState;
export function useToastProvider<T>(selector: (state: ToastState) => T, equals?: (a: T, b: T) => boolean): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useToastProvider(selector?: any, equals?: any) {
  return useStore(toastProvider, selector, equals);
}
