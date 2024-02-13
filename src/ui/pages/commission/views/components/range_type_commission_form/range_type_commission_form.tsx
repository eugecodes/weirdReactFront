import { RangeTypes } from "@/src/core/app/enums/range_type";
import { InputFormik } from "@/src/ui/components/input/input";
import { useTranslation } from "react-i18next";

interface Props {
  rangeType?: RangeTypes;
}

export default function RangeTypeCommissionForm({ rangeType }: Props) {
  const { t } = useTranslation("commission");

  return (
    <>
      {rangeType === RangeTypes.POWER ? (
        <>
          <InputFormik label={t("columns.minPower")} id="minPower" name="minPower" type="number" required />
          <InputFormik label={t("columns.maxPower")} id="maxPower" name="maxPower" type="number" required />
        </>
      ) : null}

      {rangeType === RangeTypes.CONSUMPTION ? (
        <>
          <InputFormik label={t("columns.minConsumption")} id="minConsumption" name="minConsumption" type="number" required />
          <InputFormik label={t("columns.maxConsumption")} id="maxConsumption" name="maxConsumption" type="number" required />
        </>
      ) : null}
    </>
  );
}
