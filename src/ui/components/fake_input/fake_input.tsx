import { emptyString } from "@/src/common/utils";
import { Information } from "../../assets/icons";
import IconWithTooltip from "../icon_with_tooltip/icon_with_tooltip";
import Styled from "./fake_input.styled";

interface Props {
  className?: string;
  label: string;
  value?: string | number;
  hasTooltip?: boolean;
  tooltipText?: string;
}

export default function FakeInput({ label, value = "", hasTooltip = false, tooltipText = emptyString, className = "" }: Props) {
  return (
    <Styled.FakeInput className={className}>
      <Styled.LabelWrapper>
        <Styled.Label>{label}</Styled.Label>
        {hasTooltip && tooltipText ? (
          <IconWithTooltip tooltip={tooltipText}>
            <Information />
          </IconWithTooltip>
        ) : null}
      </Styled.LabelWrapper>
      <Styled.Value>{value}</Styled.Value>
    </Styled.FakeInput>
  );
}

export const FakeInputWithLabelCaseUnset = (props: Props) => <Styled.FakeInputNormalCase {...props} />;
