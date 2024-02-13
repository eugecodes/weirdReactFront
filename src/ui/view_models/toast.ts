export type ToastVariants = "primary" | "error" | "information";

export interface Toast {
  id: string;
  variant?: ToastVariants;
  message: string;
}
