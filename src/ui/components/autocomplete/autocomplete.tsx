import { emptyFunction, emptyString } from "@/src/common/utils";
import type { Option } from "@/src/common/utils/types";
import { CircularProgress, Autocomplete as MuiAutocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import ErrorMessage from "../error_message/error_message";

interface Props {
  value?: Option | Option[] | null;
  options: Option[] | undefined;
  isLoading?: boolean;
  onInputChange?: (newValue: string) => void;
  onChange?: (newValue: Option[] | Option | null) => void;
  inputValue?: string;
  multiple?: boolean;
  label?: string;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  required?: boolean;
}

const OPTIONS_LIMIT = 10;

export default function Autocomplete({
  options = [],
  isLoading = false,
  multiple = false,
  onInputChange = emptyFunction,
  onChange = emptyFunction,
  value,
  label,
  inputValue,
  disabled = false,
  hasError = false,
  errorMessage = emptyString,
  required = false
}: Props) {
  const { t } = useTranslation("common");

  const getValue = () => {
    if (isLoading || !value) {
      return multiple ? [] : null;
    }

    return value;
  };

  return (
    <div>
      <MuiAutocomplete
        disabled={disabled}
        multiple={multiple}
        filterOptions={(options) => options.slice(0, OPTIONS_LIMIT)}
        filterSelectedOptions
        noOptionsText={t("errors.general.empty")}
        options={options}
        value={getValue()}
        isOptionEqualToValue={(option: Option, value: Option) => option.id === value.id}
        getOptionLabel={(option) => option.label}
        clearOnBlur={false}
        loading={isLoading}
        inputValue={inputValue}
        renderInput={(params) => (
          <TextField
            required={required}
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
        onInputChange={(event, newInputValue) => {
          onInputChange(newInputValue);
        }}
        onChange={(event, value) => {
          onChange(value);
        }}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            <span>{option.label}</span>
          </li>
        )}
      />
      {hasError ? (
        <ErrorMessage>
          <p>{errorMessage}</p>
        </ErrorMessage>
      ) : null}
    </div>
  );
}
