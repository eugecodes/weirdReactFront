import type { Toast } from "./toast";

export interface ToastState {
  toasts: Toast[];
  showToast(toast: Omit<Toast, "id">): void;
  showErrorToast(toast: Toast): void;
  closeToast(id: string): void;
}
