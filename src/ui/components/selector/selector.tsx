import { emptyFunction, emptyString } from "@/src/common/utils";
import type { SelectProps } from "@mui/material";
import { IconButton } from "@mui/material";
import { FormControl, MenuItem, Select } from "@mui/material";
import { isBoolean } from "lodash";
import { useCallback, useId } from "react";
import { Close } from "../../assets/icons";
import Styled from "./selector.styled";
import type { inputOption } from "@/src/common/utils/types";

type Props<T> = SelectProps<T> & {
  options?: inputOption[];
  onChange?: (value?: T | T[]) => void;
  errorMessage?: string;
};

const displayCloseIcon = (value: unknown, disabled: boolean) => {
  if (disabled) {
    return false;
  }

  if (Array.isArray(value) && !value.length) {
    return false;
  }

  if (value || isBoolean(value)) {
    return true;
  }

  return false;
};

export default function Selector<T>({
  label,
  options = [],
  onChange = emptyFunction,
  value = emptyString,
  name,
  placeholder,
  disabled = false,
  multiple = false,
  errorMessage = emptyString,
  required = false
}: Props<T>) {
  const handleClearClick = useCallback(() => {
    onChange(multiple ? [] : undefined);
  }, [onChange, multiple]);

  const id = useId();

  const handleSingleChange = useCallback(
    (newValue: T) => {
      if (value === newValue) {
        handleClearClick();
      } else {
        onChange(newValue);
      }
    },
    [onChange, handleClearClick, value]
  );

  const handleMultipleChange = useCallback(
    (newValue: T) => {
      if (!Array.isArray(value)) {
        return;
      }
      const index = value.findIndex((innerValue) => innerValue === newValue);
      if (index !== -1) {
        const copy = [...value];
        copy.splice(index, 1);
        onChange(copy);
      } else {
        onChange([...value, newValue]);
      }
    },
    [onChange, value]
  );

  const handleChange = useCallback(
    (newValue: T) => {
      multiple ? handleMultipleChange(newValue) : handleSingleChange(newValue);
    },
    [handleMultipleChange, handleSingleChange, multiple]
  );

  return (
    <FormControl required={required}>
      {label && <Styled.Label id={id}>{label}</Styled.Label>}
      <Select
        multiple={multiple}
        name={name}
        labelId={id}
        label={placeholder}
        value={value}
        defaultValue={value}
        disabled={disabled}
        sx={{ "& .MuiSelect-iconOutlined": { display: displayCloseIcon(value, disabled) ? "none" : "" } }}
        endAdornment={
          <Styled.ClearButton>
            <IconButton onClick={handleClearClick} sx={{ display: displayCloseIcon(value, disabled) ? "" : "none" }}>
              <Close />
            </IconButton>
          </Styled.ClearButton>
        }
      >
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value} onClick={() => handleChange(value)}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {errorMessage ? (
        <Styled.Error>
          <p>{errorMessage}</p>
        </Styled.Error>
      ) : null}
    </FormControl>
  );
}
