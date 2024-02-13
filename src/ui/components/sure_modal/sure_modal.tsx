import { emptyFunction } from "@/src/common/utils";
import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Styled from "./sure_modal.styled";

interface Props {
  primaryButtonText: string;
  secondaryButtonText?: string;
  description: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
}

export interface ModalData {
  description: string;
  primaryModalButtonText: string;
  onClickPrimaryButton: () => void;
}

export default function SureModal({
  primaryButtonText,
  secondaryButtonText,
  description,
  onPrimaryButtonClick = emptyFunction,
  onSecondaryButtonClick = emptyFunction
}: Props) {
  const { t } = useTranslation("common");
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: globalThis.MouseEvent) => {
      const target = event.target as HTMLDivElement;
      const shouldClose = backgroundRef.current && backgroundRef.current.id === target?.id;

      if (shouldClose) {
        onSecondaryButtonClick();
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [backgroundRef, onSecondaryButtonClick]);

  return (
    <Styled.Wrapper ref={backgroundRef} id="sure-modal-wrapper">
      <Styled.Popup>
        <p>{description}</p>
        <Styled.ButtonsWrapper>
          <Button variant="text" onClick={onSecondaryButtonClick}>
            {secondaryButtonText || t("actions.cancel")}
          </Button>
          <Button variant="contained" onClick={onPrimaryButtonClick}>
            {primaryButtonText}
          </Button>
        </Styled.ButtonsWrapper>
      </Styled.Popup>
    </Styled.Wrapper>
  );
}
