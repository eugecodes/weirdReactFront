/* eslint-disable @typescript-eslint/no-explicit-any */
import type { inputOption } from "@/src/common/utils/types";
import Styled from "./radio_buttons.styled";
import { FormControlLabel, InputLabel, Radio, RadioGroup } from "@mui/material";
import { emptyFunction } from "@/src/common/utils";
import { spacing } from "@/src/ui/styles/spacing";
import { px2rem } from "@/src/ui/styles/utils";

interface Props {
  options: inputOption[];
  label: string;
  value?: any;
  name: string;
  onChange?: (value: any | undefined) => void;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
}

const optionsStyling = { gap: px2rem(spacing.size2) };

export default function RadioButtons({
  label,
  options,
  value,
  onChange = emptyFunction,
  name,
  errorMessage,
  disabled = false,
  required = false
}: Props) {
  return (
    <Styled.Wrapper>
      <InputLabel required={required}>{label}</InputLabel>
      <RadioGroup row sx={optionsStyling} name={name} value={value} onChange={(event, newValue) => onChange(newValue)}>
        {options.map(({ label, value: optionValue }) => (
          <FormControlLabel disabled={disabled} key={label} value={optionValue} control={<Radio />} label={label} />
        ))}
      </RadioGroup>
      {errorMessage ? (
        <Styled.Error>
          <p>{errorMessage}</p>
        </Styled.Error>
      ) : null}
    </Styled.Wrapper>
  );
}
