import type { TooltipProps } from "@mui/material";
import { Tooltip, tooltipClasses } from "@mui/material";
import styled from "styled-components";
import { colors } from "../../styles/colors";

type Placement =
  | "bottom-end"
  | "bottom-start"
  | "bottom"
  | "left-end"
  | "left-start"
  | "left"
  | "right-end"
  | "right-start"
  | "right"
  | "top-end"
  | "top-start"
  | "top";

interface Props {
  children: JSX.Element;
  tooltip: string;
  placement?: Placement;
}

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} arrow classes={{ popper: className }} />)(({}) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: colors["grayscale-black-subtle"]
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: colors["grayscale-black-subtle"],
    textTransform: "uppercase",
    fontSize: "10px",
    lineHeight: "16px",
    fontWeight: 600,
    letterSpacing: "0.2px"
  }
}));

export default function IconWithTooltip({ children, tooltip, placement = "bottom" }: Props) {
  return (
    <StyledTooltip title={tooltip} placement={placement}>
      <div>{children}</div>
    </StyledTooltip>
  );
}
