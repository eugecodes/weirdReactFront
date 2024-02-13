import { InputFormik } from "@/src/ui/components/input/input";
import { useTranslation } from "react-i18next";
import Styled from "./consumption_form.styled";

interface Props {
  className?: string;
}

export function RateConsumptionForm({ className = "" }: Props) {
  const { t } = useTranslation("rate");

  return (
    <div className={className}>
      <h2>{t("columns.consumptionRange")}</h2>
      <div>
        <InputFormik label={t("columns.minConsumption")} id="minConsumption" name="minConsumption" type="number" />
        <InputFormik label={t("columns.maxConsumption")} id="maxConsumption" name="maxConsumption" type="number" />
      </div>
    </div>
  );
}

export const RateConsumptionFormFlex = Styled.RateConsumptionFormFlex;
export const RateConsumptionFormGrid = Styled.RateConsumptionFormGrid;
