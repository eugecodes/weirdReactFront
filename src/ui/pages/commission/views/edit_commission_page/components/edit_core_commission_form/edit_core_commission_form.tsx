import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { PriceType } from "@/src/core/app/enums/price_type";
import { InputFormik } from "@/src/ui/components/input/input";
import Selector from "@/src/ui/components/selector/selector";
import { energyTypeOptions, priceTypeOptions } from "@/src/ui/utils/selector_options";
import { useTranslation } from "react-i18next";

interface Props {
  values: {
    priceType?: PriceType;
    energyType?: EnergyTypes;
  };
}

export default function EditCoreCommissionForm({ values }: Props) {
  const { t } = useTranslation("commission");

  return (
    <>
      <InputFormik name="name" label={t("columns.name")} id="name" required />
      <Selector disabled label={t("columns.priceType")} name="priceType" value={values.priceType} options={priceTypeOptions} required />
      <Selector disabled label={t("columns.energyType")} name="energyType" value={values.energyType} options={energyTypeOptions} required />
    </>
  );
}
