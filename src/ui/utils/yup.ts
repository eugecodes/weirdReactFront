import { yup } from "@front_web_mrmilu/utils";
import { isBoolean } from "lodash";
import i18n from "../i18n";

const EMAIL_REGEX = /^(?:\w+[+\-\.])*\w+@(?:\w+[\-\.])*\w+\.\w+$/;
const PHONE_REGEX = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const IBAN_REGEX = /^ES[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}\s?$/;

const getMaxDecimalsRegex = (maxDecimals: number) => new RegExp(`^\\s*-?[0-9]\\d*((\\.|,)\\d{0,${maxDecimals}})?\\s*$`);

export function yupRequiredField() {
  const required = i18n.t("errors.general.required", { ns: "common" });
  return yup.string().required(required).typeError(required);
}

export function yupRequiredPasswordField() {
  const required = yupRequiredField();
  return required
    .matches(new RegExp(/(?=.*[a-z])/), i18n.t("form.requirements.lowerCase", { ns: "reset_password" }))
    .matches(new RegExp(/(?=.*[A-Z])/), i18n.t("form.requirements.upperCase", { ns: "reset_password" }))
    .matches(new RegExp(/(?=.*\d)/), i18n.t("form.requirements.numbers", { ns: "reset_password" }))
    .matches(new RegExp(/[\w.,-]{8,}/), i18n.t("form.requirements.longitude", { ns: "reset_password" }));
}

export function yupRequiredEmailField() {
  const required = yupRequiredField();
  return required.matches(EMAIL_REGEX, i18n.t("errors.general.email", { ns: "common" }));
}

export function yupEmailField() {
  return yup
    .string()
    .nullable()
    .matches(EMAIL_REGEX, i18n.t("errors.general.email", { ns: "common" }));
}

export function yupRequiredPhoneField() {
  const required = yupRequiredField();
  return required.matches(PHONE_REGEX, i18n.t("errors.general.phone", { ns: "common" }));
}

export function yupPhoneField() {
  return yup
    .string()
    .nullable()
    .matches(PHONE_REGEX, i18n.t("errors.general.phone", { ns: "common" }));
}

export function yupRequiredIbanField() {
  const required = yupRequiredField();
  return required.matches(IBAN_REGEX, i18n.t("errors.general.iban", { ns: "common" }));
}

export function yupIbanField() {
  return yup
    .string()
    .nullable()
    .matches(IBAN_REGEX, i18n.t("errors.general.iban", { ns: "common" }));
}

export function yupCifField() {
  return yup
    .string()
    .nullable()
    .matches(/^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/, i18n.t("errors.general.cif", { ns: "common" }));
}

export function yupRequiredPositiveNumber() {
  const required = i18n.t("errors.general.required", { ns: "common" });
  const positiveError = i18n.t("errors.general.positive", { ns: "common" });
  return yup
    .string()
    .required(required)
    .test("positive", positiveError, (value) => Number(value) >= 0);
}

export function yupRequiredPositiveNumberWithMaxDecimals(maxDecimals: number) {
  const maxDecimalsError = i18n.t("errors.general.maxDecimals", { maxDecimals, ns: "common" });
  const positiveNumber = yupRequiredPositiveNumber();
  const decimalsRegex = getMaxDecimalsRegex(maxDecimals);
  return positiveNumber.test("max-decimals", maxDecimalsError, (value) => decimalsRegex.test(String(value)));
}

export function yupString() {
  const numberError = i18n.t("errors.general.string", { ns: "common" });
  return yup.string().nullable().typeError(numberError);
}

export function yupNumber() {
  const numberError = i18n.t("errors.general.number", { ns: "common" });
  return yup.number().nullable().typeError(numberError);
}

export function yupPositiveNumber() {
  const positiveError = i18n.t("errors.general.positive", { ns: "common" });
  return yup
    .string()
    .test("positive", positiveError, (value) => {
      return value === undefined || value === null || Number(value.replace(",", ".")) >= 0;
    })
    .nullable();
}

export function yupNumberWithMaxDecimals(maxDecimals: number) {
  const maxDecimalsError = i18n.t("errors.general.maxDecimals", { maxDecimals, ns: "common" });
  const number = yupNumber();
  const decimalsRegex = getMaxDecimalsRegex(maxDecimals);
  return number.test("max-decimals", maxDecimalsError, (value) => !value || decimalsRegex.test(String(value)));
}

export function yupPositiveNumberWithMaxDecimals(maxDecimals: number) {
  const maxDecimalsError = i18n.t("errors.general.maxDecimals", { maxDecimals, ns: "common" });
  const positiveNumber = yupPositiveNumber();
  const decimalsRegex = getMaxDecimalsRegex(maxDecimals);
  return positiveNumber.test("max-decimals", maxDecimalsError, (value) => !value || decimalsRegex.test(String(value)));
}

export function yupRequiredBoolean() {
  const required = i18n.t("errors.general.boolean", { ns: "common" });

  return yup
    .bool()
    .test("boolean", required, (value) => isBoolean(value))
    .typeError(required);
}

export function yupRequiredWithMinMaxLength({ min, max }: { min: number; max: number }) {
  const required = i18n.t("errors.general.required", { ns: "common" });
  const minMaxLength = i18n.t("errors.general.minMaxLength", { min, max, ns: "common" });
  return yup.string().required(required).min(min, minMaxLength).max(max, minMaxLength);
}

export function yupCupsField() {
  const required = i18n.t("errors.general.required", { ns: "common" });
  const CUPS_MAX = 22;
  const CUPS_MIN = 20;
  const cupsError = i18n.t("errors.general.cups", { ns: "common" });
  return yup
    .string()
    .required(required)
    .test("cups", cupsError, (value) => value?.length === CUPS_MAX || value?.length === CUPS_MIN);
}
