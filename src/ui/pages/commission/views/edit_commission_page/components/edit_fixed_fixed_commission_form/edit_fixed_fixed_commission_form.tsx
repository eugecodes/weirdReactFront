import type { Option } from "@/src/common/utils/types";
import type { RangeTypes } from "@/src/core/app/enums/range_type";
import { InputFormik } from "@/src/ui/components/input/input";
import RadioButtons from "@/src/ui/components/radio_buttons/radio_buttons";
import Selector from "@/src/ui/components/selector/selector";
import { booleanOptions, rangeTypeOptions } from "@/src/ui/utils/selector_options";
import { useTranslation } from "react-i18next";
import RateTypeSegmentationForm from "../edit_rate_type_segmentation_commission_form/edit_rate_type_segmentation_commission_form";
import type { FormCreateCommissionValues } from "@/src/ui/pages/commission/view_models/formCreateCommissionValues";
import type { FormikErrors } from "formik";
import RangeTypeCommissionForm from "@/src/ui/pages/commission/views/components/range_type_commission_form/range_type_commission_form";

interface Props {
  rateTypeSegmentation?: boolean;
  rangeType?: RangeTypes;
  rateType?: Option;
  rateTypeOptions?: Option[];
  errors: FormikErrors<FormCreateCommissionValues>;
}

export default function EditFixedFixedCommissionForm({ rateTypeSegmentation, rangeType, rateTypeOptions = [], rateType, errors }: Props) {
  const { t } = useTranslation("commission");

  return (
    <>
      <RadioButtons
        disabled
        name="rateTypeSegmentation"
        options={booleanOptions}
        label={t("columns.rateTypeSegmentation")}
        value={rateTypeSegmentation || false}
        required
      />

      <RateTypeSegmentationForm rateTypeSegmentation={rateTypeSegmentation} rateType={rateType} rateTypeOptions={rateTypeOptions} errors={errors} />

      <Selector disabled label={t("columns.range")} name="rangeType" options={rangeTypeOptions} value={rangeType} required />

      <RangeTypeCommissionForm rangeType={rangeType} />

      <InputFormik label={t("columns.testCommission")} id="testCommission" name="testCommission" type="number" required />
    </>
  );
}
