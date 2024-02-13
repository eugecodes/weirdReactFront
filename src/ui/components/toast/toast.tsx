import { emptyFunction, emptyString } from "@/src/common/utils";
import { IconButton, Snackbar } from "@mui/material";
import type { CSSProperties } from "react";
import { Close } from "../../assets/icons";
import type { ToastVariants } from "@/src/ui/view_models/toast";
import Styled from "./toast.styled";

export const TOAST_AUTO_HIDE_TIME_IN_MS = 5000;

interface Props {
  onClose?: () => void;
  message?: string;
  variant?: ToastVariants;
  style?: CSSProperties;
}

export default function Toast({ onClose = emptyFunction, message = emptyString, variant = "primary", style }: Props) {
  return (
    <Snackbar
      style={style}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open
      onClose={() => onClose()}
      autoHideDuration={TOAST_AUTO_HIDE_TIME_IN_MS}
      ClickAwayListenerProps={{ onClickAway: () => null }}>
      <Styled.Toast variant={variant}>
        <span>{message}</span>
        <IconButton onClick={() => onClose()}>
          <Close />
        </IconButton>
      </Styled.Toast>
    </Snackbar>
  );
}
