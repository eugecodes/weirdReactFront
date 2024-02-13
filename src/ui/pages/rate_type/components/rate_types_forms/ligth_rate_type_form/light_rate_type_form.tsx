import { InputFormik } from "@/src/ui/components/input/input";
import { useTranslation } from "react-i18next";
import Styled from "./light_rate_type_form.styled";

interface Props {
  className?: string;
}

export function LightRateType({ className = "" }: Props) {
  const { t } = useTranslation("rate_type");

  return (
    <div className={className}>
      <InputFormik label={t("columns.minPower")} id="minPower" name="minPower" type="number" />
      <InputFormik label={t("columns.maxPower")} id="maxPower" name="maxPower" type="number" />
    </div>
  );
}

export function LightRateTypeGrid() {
  const { t } = useTranslation("rate_type");

  return (
    <>
      <InputFormik label={t("columns.minPower")} id="minPower" name="minPower" type="number" />
      <InputFormik label={t("columns.maxPower")} id="maxPower" name="maxPower" type="number" />
    </>
  );
}

export const LightRateTypeFlex = Styled.LightRateTypeFlex;
