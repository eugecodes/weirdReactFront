import { FakeInputWithLabelCaseUnset } from "@/src/ui/components/fake_input/fake_input";
import { useTranslation } from "react-i18next";
import Styled from "./range_fake_form.styled";

interface Props {
  minPower?: number;
  maxPower?: number;
}

export function RateRangeFakeForm({ minPower, maxPower }: Props) {
  const { t } = useTranslation("rate");

  return (
    <Styled.RateRangeFormGrid>
      <h2>{t("columns.powerRange")}</h2>
      <div>
        <FakeInputWithLabelCaseUnset label={t("form.labels.minPower")} value={minPower} />
        <FakeInputWithLabelCaseUnset label={t("form.labels.maxPower")} value={maxPower} />
      </div>
    </Styled.RateRangeFormGrid>
  );
}
