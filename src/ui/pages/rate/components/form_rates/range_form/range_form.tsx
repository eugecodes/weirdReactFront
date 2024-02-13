import { InputFormik } from "@/src/ui/components/input/input";
import { useTranslation } from "react-i18next";
import Styled from "./range_form.styled";

interface Props {
  className?: string;
}

export function RateRangeForm({ className = "" }: Props) {
  const { t } = useTranslation("rate");

  return (
    <div className={className}>
      <h2>{t("columns.powerRange")}</h2>
      <div>
        <InputFormik label={t("columns.minPower")} id="minPower" name="minPower" type="number" />
        <InputFormik label={t("columns.maxPower")} id="maxPower" name="maxPower" type="number" />
      </div>
    </div>
  );
}

export const RateRangeFormFlex = Styled.RateRangeFormFlex;
export const RateRangeFormGrid = Styled.RateRangeFormGrid;
