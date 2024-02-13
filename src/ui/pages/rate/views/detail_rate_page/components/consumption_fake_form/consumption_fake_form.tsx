import FakeInput from "@/src/ui/components/fake_input/fake_input";
import { useTranslation } from "react-i18next";
import Styled from "./consumption_fake_form.styled";

interface Props {
  minConsumption?: number;
  maxConsumption?: number;
}

export function RateConsumptionFakeForm({ minConsumption, maxConsumption }: Props) {
  const { t } = useTranslation("rate");

  return (
    <Styled.RateConsumptionFormGrid>
      <h2>{t("columns.consumptionRange")}</h2>
      <div>
        <FakeInput label={t("columns.minConsumption")} value={minConsumption} />
        <FakeInput label={t("columns.maxConsumption")} value={maxConsumption} />
      </div>
    </Styled.RateConsumptionFormGrid>
  );
}
