import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {
  condition: boolean;
  onCancelUrl?: string;
}

export default function useCancelButton({ condition, onCancelUrl }: Props) {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const onCancel = useCallback(() => {
    if (onCancelUrl) {
      return navigate(onCancelUrl);
    }
    navigate(-1);
  }, [navigate, onCancelUrl]);

  const onClickCancel = useCallback(() => {
    if (condition) {
      onCancel();
    } else {
      setShowModal(true);
    }
  }, [condition, onCancel]);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const cancelAction = useMemo(
    () => [
      {
        text: t("actions.cancel"),
        onClick: onClickCancel
      }
    ],
    [onClickCancel, t]
  );

  return { showModal, onClickCancel, onCancel, onCloseModal, cancelAction };
}
