import type { CreateCommissionModel } from "@/src/core/commission/domain/models/create_commission_model";
import SureModal from "@/src/ui/components/sure_modal/sure_modal";
import { Button } from "@mui/material";
import { Form } from "formik";
import { FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./create_commission_form.styled";
import useCreateEditCommissionForm from "@/src/ui/pages/commission/controllers/create_edit_commission_controller";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import { convertBooleanStringIntoBoolean } from "@/src/common/utils";
import { PriceType } from "@/src/core/app/enums/price_type";
import FixedBasedCommissionForm from "../../../components/fixed_based_commission_form/fixed_based_commission_form";
import CreateCoreCommissionForm from "../create_core_commission_form/create_core_commission_form";
import FixedFixedCommissionForm from "../create_fixed_fixed_commission_form/create_fixed_fixed_commission_form";
import { useCallback } from "react";
import ErrorMessage from "@/src/ui/components/error_message/error_message";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import type { Option } from "@/src/common/utils/types";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";

interface Props {
  onSubmitForm: (input: CreateCommissionModel) => Promise<void>;
  backUrl?: string;
}

export default function CreateCommissionForm({ onSubmitForm, backUrl }: Props) {
  const { t } = useTranslation(["commission", "common"]);
  const { formSchema, isFormEmpty, onChangeEnergyType, onChangeRateType, onChangePriceType, onChangeRangeType, onChangeRate, rates, rateTypes } =
    useCreateEditCommissionForm({
      onSubmitForm,
      initialValues: undefined
    });
  const { showModal, onCancel, onClickCancel, onCloseModal } = useCancelButton({ condition: isFormEmpty, onCancelUrl: backUrl });

  const onChangeRateTypeSegmentation = useCallback(
    (value: string) => formSchema.setFieldValue("rateTypeSegmentation", convertBooleanStringIntoBoolean(value)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { setRateFilterName } = useAutocompleteRateProvider((state) => ({
    setRateFilterName: state.setFilterName
  }));

  return (
    <Styled.FormWrapper>
      <h1>{t("commission:formTitle")}</h1>
      <p>{t("commission:formSubtitle")}</p>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <CreateCoreCommissionForm
            onChangeEnergyType={onChangeEnergyType}
            onChangePriceType={onChangePriceType}
            errors={formSchema.errors}
            values={{ priceType: formSchema.values.priceType, energyType: formSchema.values.energyType }}
          />

          {formSchema.values.priceType === PriceType.FIXED_FIXED && (
            <FixedFixedCommissionForm
              energyType={formSchema.values.energyType}
              rateType={formSchema.values.rateType}
              rangeType={formSchema.values.rangeType}
              rateTypeSegmentation={formSchema.values.rateTypeSegmentation}
              onChangeRangeType={onChangeRangeType}
              onChangeRateType={onChangeRateType}
              onChangeRateTypeSegmentation={onChangeRateTypeSegmentation}
              rateTypeOptions={rateTypes}
              errors={formSchema.errors}
            />
          )}

          <FixedBasedCommissionForm priceType={formSchema.values.priceType} />

          <div>
            <Autocomplete
              multiple
              label={t("commission:columns.rates")}
              value={formSchema.values.rates}
              options={rates}
              onInputChange={setRateFilterName}
              onChange={(value) => {
                const newValue: Option[] | undefined = (value as Option[]) ?? undefined;
                onChangeRate(newValue);
              }}
              required
            />
            {formSchema.errors.rates ? (
              <ErrorMessage>
                {Array.isArray(formSchema.errors.rates) ? (
                  <div>
                    {formSchema.errors.rates.map((error) => (
                      <p key={error as string}>{error as string}</p>
                    ))}
                  </div>
                ) : (
                  <p>{formSchema.errors.rates}</p>
                )}
              </ErrorMessage>
            ) : null}
          </div>

          <Styled.ButtonsWrapper>
            <Button type="submit" variant="contained" disabled={isFormEmpty}>
              {t("commission:actions.save")}
            </Button>
            <Button variant="text" color="secondary" onClick={onClickCancel}>
              {t("common:actions.cancel")}
            </Button>
          </Styled.ButtonsWrapper>
        </Form>
      </FormikProvider>
      {showModal && (
        <SureModal
          primaryButtonText={t("common:actions.keepEditing")}
          description={t("commission:sure.cancelCreate")}
          secondaryButtonText={t("common:actions.cancelChanges")}
          onSecondaryButtonClick={onCancel}
          onPrimaryButtonClick={onCloseModal}
        />
      )}
    </Styled.FormWrapper>
  );
}
