import Styled from "./switch.styled";
import type { SwitchProps } from "@mui/material";
import { Switch as MuiSwitch } from "@mui/material";
import IconWithTooltip from "../icon_with_tooltip/icon_with_tooltip";
import { Information } from "../../assets/icons";

interface Props extends SwitchProps {
  label: string;
  tooltip?: string;
}

export default function Switch({ label, tooltip, required, ...props }: Props) {
  return (
    <Styled.Wrapper>
      <div>
        <Styled.Label>
          {label} {required ? "*" : ""}
        </Styled.Label>
        {tooltip ? (
          <IconWithTooltip tooltip={tooltip}>
            <Information />
          </IconWithTooltip>
        ) : null}
      </div>
      <MuiSwitch {...props} />
    </Styled.Wrapper>
  );
}
