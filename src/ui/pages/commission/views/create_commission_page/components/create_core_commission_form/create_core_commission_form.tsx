import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { PriceType } from "@/src/core/app/enums/price_type";
import { InputFormik } from "@/src/ui/components/input/input";
import Selector from "@/src/ui/components/selector/selector";
import { energyTypeOptions, priceTypeOptions } from "@/src/ui/utils/selector_options";
import type { FormikErrors } from "formik";
import { useTranslation } from "react-i18next";
import type { FormCreateCommissionValues } from "@/src/ui/pages/commission/view_models/formCreateCommissionValues";

interface Props {
  values: {
    priceType?: PriceType;
    energyType?: EnergyTypes;
  };
  errors: FormikErrors<FormCreateCommissionValues>;
  onChangePriceType: (value: PriceType) => void;
  onChangeEnergyType: (value: EnergyTypes) => void;
}

export default function CreateCoreCommissionForm({ values, errors, onChangeEnergyType, onChangePriceType }: Props) {
  const { t } = useTranslation("commission");

  return (
    <>
      <InputFormik name="name" label={t("columns.name")} id="name" required />
      <Selector
        errorMessage={errors.priceType}
        label={t("columns.priceType")}
        name="priceType"
        options={priceTypeOptions}
        value={values.priceType}
        onChange={(newValue) => {
          onChangePriceType(newValue as PriceType);
        }}
        required
      />
      <Selector
        errorMessage={errors.energyType}
        label={t("columns.energyType")}
        name="energyType"
        options={energyTypeOptions}
        value={values.energyType}
        onChange={(newValue) => {
          onChangeEnergyType(newValue as EnergyTypes);
        }}
        required
      />
    </>
  );
}
