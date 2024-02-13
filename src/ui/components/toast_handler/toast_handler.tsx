import { useErrorProvider } from "../../provider/error.provider";
import { useToastProvider } from "../../provider/toast.provider";
import errorTranslations from "@/src/ui/i18n/locales/es/error.json";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Toast from "../toast/toast";
import { px2rem } from "../../styles/utils";
import useShowToast from "../../hooks/useShowToast";

const SPACING_BETWEEN_TOASTS = 82;

export default function ToastHandler() {
  const { t } = useTranslation("error");
  const { showErrorToast } = useShowToast();
  const { toasts, closeToast } = useToastProvider((state) => ({
    toasts: state.toasts,
    closeToast: state.closeToast
  }));
  const { errors, removeError } = useErrorProvider((state) => ({ errors: state.errors, removeError: state.removeError }));

  useEffect(() => {
    errors.forEach((error) => {
      const isTranslatedCode = Object.keys(errorTranslations).includes(error.code);
      if (error.uuid) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const message = isTranslatedCode ? t(error.code) : t("DEFAULT");
        showErrorToast({ variant: "error", message, id: error.uuid });
      }
    });
  }, [errors, showErrorToast, t]);

  const onCloseToast = useCallback(
    (id: string) => {
      removeError(id);
      closeToast(id);
    },
    [closeToast, removeError]
  );

  return (
    <>
      {toasts.map((toast, index) => (
        <Toast
          style={{ translate: "0 " + px2rem(index * SPACING_BETWEEN_TOASTS), transition: "all 0.33s " }}
          key={toast.id}
          variant={toast.variant}
          message={toast.message}
          onClose={() => onCloseToast(toast.id)}
        />
      ))}
    </>
  );
}
