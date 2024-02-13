import { useToastProvider } from "../provider/toast.provider";

export default function useShowToast() {
  const showToasts = useToastProvider((state) => ({ showToast: state.showToast, showErrorToast: state.showErrorToast }));

  return showToasts;
}
