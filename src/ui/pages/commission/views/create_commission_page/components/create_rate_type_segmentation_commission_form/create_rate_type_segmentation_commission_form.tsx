import type { Option } from "@/src/common/utils/types";
import ErrorMessage from "@/src/ui/components/error_message/error_message";
import type { FormikErrors } from "formik";
import type { FormCreateCommissionValues } from "@/src/ui/pages/commission/view_models/formCreateCommissionValues";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import { useTranslation } from "react-i18next";

interface Props {
  rateTypeSegmentation?: boolean;
  rateType?: Option;
  rateTypeOptions: Option[];
  onChangeRateType: (value: Option | undefined) => void;
  errors: FormikErrors<FormCreateCommissionValues>;
}

export default function CreateRateTypeSegmentationForm({ rateTypeSegmentation, rateType, rateTypeOptions, errors, onChangeRateType }: Props) {
  const { t } = useTranslation("commission");

  const { setRateTypeFilterName, rateTypesFilterName } = useAutocompleteRateTypesProvider((state) => ({
    setRateTypeFilterName: state.setFilterName,
    rateTypesFilterName: state.filterName
  }));

  return rateTypeSegmentation ? (
    <div>
      <Autocomplete
        label={t("columns.rateType")}
        value={rateType}
        options={rateTypeOptions}
        inputValue={rateTypesFilterName}
        onInputChange={setRateTypeFilterName}
        onChange={(value) => {
          const newValue: Option | undefined = (value as Option) ?? undefined;
          onChangeRateType(newValue);
        }}
        required
      />
      {errors.rateType ? (
        <ErrorMessage>
          <p>{errors.rateType}</p>
        </ErrorMessage>
      ) : null}
    </div>
  ) : null;
}
