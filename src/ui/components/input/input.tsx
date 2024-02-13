import type { FieldInputProps, FieldMetaProps, FormikHandlers } from "formik";
import { useField } from "formik";
import type { BaseFormikProps } from "../../view_models/formik";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import type { FocusEventHandler, HTMLInputTypeAttribute, KeyboardEventHandler, ReactNode, WheelEventHandler } from "react";
import Styled from "./input.styled";
import { emptyString } from "@/src/common/utils";

interface InputProps {
  label?: string;
  id: string;
  name?: string;
  onChange?: FormikHandlers["handleChange"];
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FormikHandlers["handleBlur"];
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onWheel?: WheelEventHandler<HTMLInputElement>;
  formik?: BaseFormikProps<string | undefined>;
  value?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
  icon?: ReactNode;
  onClickIcon?: () => void;
  disabled?: boolean;
  readonly?: boolean;
  min?: number;
  required?: boolean;
}

export const Input = ({
  value,
  onChange,
  onKeyPress,
  onBlur,
  onKeyDown,
  label,
  formik,
  name,
  id,
  type,
  icon,
  onClickIcon,
  disabled = false,
  readonly = false,
  required = false,
  className,
  min
}: InputProps) => {
  let field: FieldInputProps<string | undefined>;
  let meta: FieldMetaProps<string | undefined>;
  // TODO forcing values to be empty strings instead of undefined to avoid uncontrolled. Inputs in form values should always be string, even numbers.
  if (formik) {
    field = formik.field;
    meta = formik.meta;
    field.value = field.value ?? "";
  } else {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const emptyHandler = () => {};
    field = {
      onBlur: onBlur || emptyHandler,
      value: value ?? "",
      onChange: onChange || emptyHandler,
      name: name || ""
    };
    meta = { initialTouched: false, initialValue: undefined, value: undefined, touched: false };
  }

  return (
    <Styled.InputWrapper>
      <FormControl variant="outlined" required={required}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <OutlinedInput
          label={label}
          type={type === "password" ? type : "string"}
          id={id}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          {...field}
          className={className}
          disabled={disabled}
          readOnly={readonly}
          inputProps={{ min }}
          onChange={(e) => {
            if (type === "number") {
              e.target.value = e.target.value.replace(/\D/g, "");
              field.onChange(e);
            } else {
              field.onChange(e);
            }
          }}
          endAdornment={
            icon ? (
              <InputAdornment position="end">
                <IconButton onClick={onClickIcon} edge="end">
                  {icon}
                </IconButton>
              </InputAdornment>
            ) : null
          }
          onFocus={(e) => {
            e.target.addEventListener("wheel", (ev) => {
              ev.preventDefault();
            });
          }}
        />
        {meta.error && meta.touched && (
          <Styled.Error>
            <p>{meta.error}</p>
          </Styled.Error>
        )}
      </FormControl>
    </Styled.InputWrapper>
  );
};

type InputFormikProps = Omit<InputProps, "formik" | "name" | "id"> & { name: string; id?: string };

export const InputFormik = ({
  id,
  label,
  name,
  onChange,
  className = emptyString,
  type,
  icon,
  onClickIcon,
  disabled = false,
  required = false,
  readonly,
  min
}: InputFormikProps) => {
  const [field, meta] = useField({ name, type });
  if (onChange) field.onChange = onChange;
  return (
    <Input
      id={id ?? name}
      formik={{ field, meta }}
      label={label}
      className={className}
      icon={icon}
      type={type}
      onClickIcon={onClickIcon}
      disabled={disabled}
      readonly={readonly}
      required={required}
      min={min}
    />
  );
};
