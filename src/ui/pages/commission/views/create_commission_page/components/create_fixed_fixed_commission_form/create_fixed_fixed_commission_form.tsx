import type { Option } from "@/src/common/utils/types";
import type { RangeTypes } from "@/src/core/app/enums/range_type";
import { InputFormik } from "@/src/ui/components/input/input";
import RadioButtons from "@/src/ui/components/radio_buttons/radio_buttons";
import Selector from "@/src/ui/components/selector/selector";
import { booleanOptions, rangeTypeOptions } from "@/src/ui/utils/selector_options";
import { useTranslation } from "react-i18next";
import type { FormCreateCommissionValues } from "@/src/ui/pages/commission/view_models/formCreateCommissionValues";
import type { FormikErrors } from "formik";
import RangeTypeCommissionForm from "@/src/ui/pages/commission/views/components/range_type_commission_form/range_type_commission_form";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import CreateRateTypeSegmentationForm from "../create_rate_type_segmentation_commission_form/create_rate_type_segmentation_commission_form";

interface Props {
  rateTypeSegmentation?: boolean;
  rangeType?: RangeTypes;
  rateType?: Option;
  rateTypeOptions?: Option[];
  energyType?: EnergyTypes;
  errors: FormikErrors<FormCreateCommissionValues>;
  onChangeRangeType: (value: RangeTypes) => void;
  onChangeRateTypeSegmentation: (value: string) => void;
  onChangeRateType: (value: Option | undefined) => void;
}

export default function CreateFixedFixedCommissionForm({
  rateTypeSegmentation,
  rangeType,
  rateTypeOptions = [],
  rateType,
  errors,
  onChangeRateTypeSegmentation,
  onChangeRangeType,
  onChangeRateType,
  energyType
}: Props) {
  const { t } = useTranslation("commission");

  return (
    <>
      <RadioButtons
        name="rateTypeSegmentation"
        options={booleanOptions}
        label={t("columns.rateTypeSegmentation")}
        value={rateTypeSegmentation || false}
        onChange={onChangeRateTypeSegmentation}
        required
      />

      <CreateRateTypeSegmentationForm
        errors={errors}
        rateTypeOptions={rateTypeOptions}
        rateTypeSegmentation={rateTypeSegmentation}
        rateType={rateType}
        onChangeRateType={onChangeRateType}
      />

      <Selector
        errorMessage={errors.rangeType}
        label={t("columns.range")}
        name="rangeType"
        options={rangeTypeOptions}
        value={rangeType}
        onChange={(newValue) => {
          onChangeRangeType(newValue as RangeTypes);
        }}
        disabled={energyType === EnergyTypes.GAS}
        required
      />

      <RangeTypeCommissionForm rangeType={rangeType} />

      <InputFormik label={t("columns.testCommission")} id="testCommission" name="testCommission" type="number" required />
    </>
  );
}
