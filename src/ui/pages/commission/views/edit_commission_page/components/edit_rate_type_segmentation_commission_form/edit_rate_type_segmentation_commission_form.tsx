import type { Option } from "@/src/common/utils/types";
import ErrorMessage from "@/src/ui/components/error_message/error_message";
import type { FormikErrors } from "formik";
import type { FormCreateCommissionValues } from "@/src/ui/pages/commission/view_models/formCreateCommissionValues";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import { useTranslation } from "react-i18next";

interface Props {
  rateTypeSegmentation?: boolean;
  rateType?: Option;
  rateTypeOptions: Option[];
  errors: FormikErrors<FormCreateCommissionValues>;
}

export default function EditRateTypeSegmentationForm({ rateTypeSegmentation, rateType, rateTypeOptions, errors }: Props) {
  const { t } = useTranslation("commission");

  return rateTypeSegmentation ? (
    <div>
      <Autocomplete disabled value={rateType} options={rateTypeOptions} label={t("columns.rateType")} required />
      {errors.rateType ? (
        <ErrorMessage>
          <p>{errors.rateType}</p>
        </ErrorMessage>
      ) : null}
    </div>
  ) : null;
}
