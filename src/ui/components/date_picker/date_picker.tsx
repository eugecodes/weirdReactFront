import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import type { Dayjs } from "dayjs";
import Styled from "./date_picker.styled";
import { useCallback } from "react";
import { IconButton } from "@mui/material";
import { Close } from "../../assets/icons";
import { emptyString } from "@/src/common/utils";

type InputDate = string | Dayjs | Date;
export const YEAR = "year";
export const MONTH = "month";
export const DAY = "day";
type View = typeof YEAR | typeof MONTH | typeof DAY;

interface Props {
  value: InputDate | null;
  label: string;
  disabled?: boolean;
  onChange: (value: InputDate | null) => void;
  views?: View[];
  className?: string;
  minDate?: InputDate;
  maxDate?: InputDate;
}

export default function DatePicker({ value, onChange, label, disabled = false, views, className = emptyString, minDate, maxDate }: Props) {
  const handleClearClick = useCallback(() => {
    onChange(null);
  }, [onChange]);

  return (
    <Styled.DatePickerWrapper className={className}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiDatePicker
          minDate={minDate}
          maxDate={maxDate}
          label={label}
          value={value}
          onChange={onChange}
          views={views}
          disabled={disabled}
          inputFormat={"YYYY"}
          renderInput={({ inputRef, inputProps, InputProps }) => {
            return (
              <Styled.DatePicker value={value}>
                <input ref={inputRef} {...inputProps} />
                <span>
                  <>{value ? value : label}</>
                  {InputProps?.endAdornment}
                </span>
              </Styled.DatePicker>
            );
          }}
        ></MuiDatePicker>
        {value && !disabled ? (
          <Styled.CloseIcon>
            <IconButton onClick={handleClearClick}>
              <Close />
            </IconButton>
          </Styled.CloseIcon>
        ) : null}
      </LocalizationProvider>
    </Styled.DatePickerWrapper>
  );
}
