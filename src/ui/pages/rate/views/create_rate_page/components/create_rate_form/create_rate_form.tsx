import type { CreateRateModel } from "@/src/core/rate/domain/models/create_rate_model";
import SureModal from "@/src/ui/components/sure_modal/sure_modal";
import { Button } from "@mui/material";
import { Form } from "formik";
import { FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./create_rate_form.styled";
import useCreateEditRateForm from "../../../../controllers/create_edit_rate_controller";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import Selector from "@/src/ui/components/selector/selector";
import { InputFormik } from "@/src/ui/components/input/input";
import { booleanOptions, clientTypeOptions, energyTypeOptions, priceTypeOptions } from "@/src/ui/utils/selector_options";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import { PriceType } from "@/src/core/app/enums/price_type";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { RateRangeFormFlex } from "../../../../components/form_rates/range_form/range_form";
import { RateConsumptionFormFlex } from "../../../../components/form_rates/consumption_form/consumption_form";
import { RatePriceFormFlex } from "../../../../components/form_rates/price_form/price_form";
import RadioButtons from "@/src/ui/components/radio_buttons/radio_buttons";
import { convertBooleanStringIntoBoolean } from "@/src/common/utils";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import type { Option } from "@/src/common/utils/types";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { useAutocompleteMarketersProvider } from "@/src/ui/pages/rate/provider/autocomplete_marketer.provider";

interface Props {
  onSubmitForm: (input: CreateRateModel) => Promise<void>;
  backUrl?: string;
}

export default function CreateRateForm({ onSubmitForm, backUrl }: Props) {
  const { t } = useTranslation(["rate", "common"]);
  const [searchParams] = useSearchParams();

  const marketerId = useMemo(() => {
    const marketerIdParam = searchParams.get("marketerId");
    if (marketerIdParam) {
      return Number(marketerIdParam);
    }
    return undefined;
  }, [searchParams]);

  const { formSchema, isFormEmpty, onChangeEnergyType, onChangePriceType, onChangeRateType, onChangecompensationSurplus } = useCreateEditRateForm({
    onSubmitForm,
    initialValues: undefined,
    marketerId
  });
  const { showModal, onCancel, onClickCancel, onCloseModal } = useCancelButton({ condition: isFormEmpty, onCancelUrl: backUrl });
  const { rateTypes, setRateTypeFilterName, areRateTypesLoading } = useAutocompleteRateTypesProvider((state) => ({
    rateTypes: state.items,
    setRateTypeFilterName: state.setFilterName,
    areRateTypesLoading: state.isLoading
  }));

  const { marketers, setMarketerFilterName, isLoadingMarketers } = useAutocompleteMarketersProvider((state) => ({
    marketers: state.items,
    setMarketerFilterName: state.setFilterName,
    isLoadingMarketers: state.isLoading
  }));

  return (
    <Styled.FormWrapper>
      <h1>{t("rate:formTitle")}</h1>
      <p>{t("rate:formSubtitle")}</p>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <InputFormik label={t("rate:columns.name")} id="name" name="name" required />
          {!marketerId && (
            <Autocomplete
              options={marketers}
              value={formSchema.values.marketer}
              onInputChange={setMarketerFilterName}
              onChange={(newValue) => {
                formSchema.setFieldValue("marketer", newValue);
              }}
              isLoading={isLoadingMarketers}
              label={t("rate:columns.marketer")}
              hasError={!!formSchema.errors.marketer}
              /* TODO: Check why marketerId is an string when it should be an object */
              //eslint-disable-next-line @typescript-eslint/no-explicit-any
              errorMessage={(formSchema.errors.marketer as any)?.id}
              required
            />
          )}

          <Selector
            errorMessage={formSchema.errors.priceType}
            label={t("rate:columns.priceType")}
            name="priceType"
            options={priceTypeOptions}
            value={formSchema.values.priceType}
            onChange={(newValue) => {
              onChangePriceType(newValue as PriceType);
            }}
            required
          />
          <Selector
            errorMessage={formSchema.errors.energyType}
            label={t("rate:columns.energyType")}
            name="energyType"
            options={energyTypeOptions}
            value={formSchema.values.energyType}
            onChange={(value) => {
              onChangeEnergyType(value as EnergyTypes);
            }}
            required
          />
          <Selector
            errorMessage={formSchema.errors.clientTypes}
            label={t("rate:columns.clientType")}
            multiple
            name="clientTypes"
            options={clientTypeOptions}
            value={formSchema.values.clientTypes}
            onChange={(newValue) => formSchema.setFieldValue("clientTypes", newValue)}
            required
          />

          <Autocomplete
            options={rateTypes}
            onInputChange={setRateTypeFilterName}
            onChange={(value) => {
              const newValue: Option | undefined = (value as Option) ?? undefined;
              onChangeRateType(newValue);
            }}
            label={t("rate:columns.rateType")}
            isLoading={areRateTypesLoading}
            value={formSchema.values.rateType}
            hasError={!!formSchema.errors.rateType}
            /* TODO: Check why rateType is an string when it should be an object */
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            errorMessage={(formSchema.errors.rateType as any)?.id}
            required
          />

          <RadioButtons
            errorMessage={formSchema.errors.permanency}
            name="permanency"
            options={booleanOptions}
            label={t("rate:columns.permanency")}
            value={formSchema.values.permanency || false}
            onChange={(value) => formSchema.setFieldValue("permanency", convertBooleanStringIntoBoolean(value))}
            required
          />
          <InputFormik label={t("rate:columns.length")} id="length" name="length" required />
          {formSchema.values.energyType === EnergyTypes.LIGHT && (
            <>
              <RadioButtons
                errorMessage={formSchema.errors.isFullRenewable}
                name="isFullRenewable"
                options={booleanOptions}
                label={t("rate:columns.isFullRenewable")}
                value={formSchema.values.isFullRenewable || false}
                onChange={(value) => formSchema.setFieldValue("isFullRenewable", convertBooleanStringIntoBoolean(value))}
                required
              />
              <RadioButtons
                errorMessage={formSchema.errors.compensationSurplus}
                name="compensationSurplus"
                options={booleanOptions}
                label={t("rate:columns.compensationSurplus")}
                value={formSchema.values.compensationSurplus || false}
                onChange={(value) => {
                  // formSchema.setFieldValue("compensationSurplus", convertBooleanStringIntoBoolean(value))
                  onChangecompensationSurplus(convertBooleanStringIntoBoolean(value));
                }}
              />
              {formSchema.values.compensationSurplus ? (
                <InputFormik
                  label={t("rate:columns.compensationSurplusValue")}
                  id="compensationSurplusValue"
                  name="compensationSurplusValue"
                  type="number"
                  required
                />
              ) : null}
            </>
          )}
          {formSchema.values.priceType === PriceType.FIXED_FIXED && formSchema.values.energyType === EnergyTypes.LIGHT ? <RateRangeFormFlex /> : null}
          {formSchema.values.energyType === EnergyTypes.GAS ? <RateConsumptionFormFlex /> : null}
          {formSchema.values.energyType ? <RatePriceFormFlex energyType={formSchema.values.energyType} /> : null}
          <Styled.ButtonsWrapper>
            <Button type="submit" variant="contained" disabled={isFormEmpty}>
              {t("rate:actions.save")}
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
          description={t("rate:sure.cancelCreate")}
          secondaryButtonText={t("common:actions.cancelChanges")}
          onSecondaryButtonClick={onCancel}
          onPrimaryButtonClick={onCloseModal}
        />
      )}
    </Styled.FormWrapper>
  );
}
