import type { CreateRateModel } from "@/src/core/rate/domain/models/create_rate_model";
import { Button } from "@mui/material";
import { Form } from "formik";
import { FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./edit_rate_form.styled";
import useCreateEditRateForm from "../../../../controllers/create_edit_rate_controller";
import Selector from "@/src/ui/components/selector/selector";
import { InputFormik } from "@/src/ui/components/input/input";
import { booleanOptions, clientTypeOptions, energyTypeOptions, priceTypeOptions } from "@/src/ui/utils/selector_options";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import { PriceType } from "@/src/core/app/enums/price_type";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { RateRangeFormGrid } from "../../../../components/form_rates/range_form/range_form";
import { RateConsumptionFormGrid } from "../../../../components/form_rates/consumption_form/consumption_form";
import { RatePriceFormGrid } from "../../../../components/form_rates/price_form/price_form";
import type { RateModel } from "@/src/core/rate/domain/models/rate_model";
import type { Option, Optional } from "@/src/common/utils/types";
import { useMemo } from "react";
import RadioButtons from "@/src/ui/components/radio_buttons/radio_buttons";
import { convertBooleanStringIntoBoolean } from "@/src/common/utils";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import { useSearchParams } from "react-router-dom";
import { useAutocompleteMarketersProvider } from "../../../../provider/autocomplete_marketer.provider";

interface Props {
  onSubmitForm: (input: CreateRateModel) => Promise<void>;
  rate: Optional<RateModel>;
}

export default function EditRateForm({ onSubmitForm, rate }: Props) {
  const { t } = useTranslation(["rate", "common"]);
  const initialValues = useMemo(() => {
    return rate
      ? {
          ...rate,
          rateType: { id: rate.rateType.id, label: rate.rateType.name },
          energyType: rate.rateType.energyType,
          marketer: rate.marketer ? { id: rate.marketer.id, label: rate.marketer.name } : undefined,
          length: String(rate.length)
        }
      : undefined;
  }, [rate]);
  const [searchParams] = useSearchParams();
  const marketerId = useMemo(() => {
    const marketerIdParam = searchParams.get("marketerId");
    if (marketerIdParam) {
      return Number(marketerIdParam);
    }
    return undefined;
  }, [searchParams]);
  const { formSchema, isFormEmpty, onChangeEnergyType, onChangePriceType, onChangeRateType } = useCreateEditRateForm({
    onSubmitForm,
    initialValues,
    marketerId
  });

  const { rateTypes, setRateTypeFilterName, rateTypesFilterName } = useAutocompleteRateTypesProvider((state) => ({
    rateTypes: state.items,
    setRateTypeFilterName: state.setFilterName,
    rateTypesFilterName: state.filterName
  }));

  const { marketers, isLoadingMarketers } = useAutocompleteMarketersProvider((state) => ({
    marketers: state.items,
    setMarketerFilterName: state.setFilterName,
    isLoadingMarketers: state.isLoading
  }));

  const rateTypeValue = useMemo(() => formSchema.values.rateType || null, [formSchema.values.rateType]);

  return (
    <Styled.FormWrapper>
      <Styled.Header>
        <h1>{t("rate:actions.edit")}</h1>
        <p>{t("common:editDescription")}</p>
      </Styled.Header>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <div>
            <h2>{t("rate:data")}</h2>
            <Styled.Data>
              <InputFormik label={t("rate:columns.name")} id="name" name="name" required />
              {!marketerId && (
                <Autocomplete
                  disabled
                  options={marketers}
                  value={formSchema.values.marketer}
                  isLoading={isLoadingMarketers}
                  label={t("rate:columns.marketer")}
                  required
                />
              )}
              <Selector
                disabled
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
                disabled
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
                multiple
                errorMessage={formSchema.errors.clientTypes}
                label={t("rate:columns.clientType")}
                name="clientTypes"
                options={clientTypeOptions}
                value={Array.isArray(formSchema.values.clientTypes) ? formSchema.values.clientTypes : [formSchema.values.clientTypes]}
                onChange={(newValue) => formSchema.setFieldValue("clientTypes", newValue)}
                required
              />
              <div>
                <Autocomplete
                  label={t("rate:columns.rateType")}
                  options={rateTypes}
                  value={rateTypeValue}
                  inputValue={rateTypesFilterName}
                  onInputChange={setRateTypeFilterName}
                  onChange={(value) => {
                    const newValue: Option | undefined = (value as Option) ?? undefined;
                    onChangeRateType(newValue);
                  }}
                  required
                />
                {formSchema.errors.rateType ? (
                  <Styled.Error>
                    {/* TODO: why is rateType astring if it's an object */}
                    {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <p>{(formSchema.errors.rateType as any).id}</p>
                  </Styled.Error>
                ) : null}
              </div>
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
                    onChange={(value) => formSchema.setFieldValue("compensationSurplus", convertBooleanStringIntoBoolean(value))}
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
            </Styled.Data>
          </div>
          {formSchema.values.priceType === PriceType.FIXED_FIXED && formSchema.values.energyType === EnergyTypes.LIGHT ? <RateRangeFormGrid /> : null}
          {formSchema.values.energyType === EnergyTypes.GAS ? <RateConsumptionFormGrid /> : null}
          {formSchema.values.energyType ? <RatePriceFormGrid energyType={formSchema.values.energyType} /> : null}
          <Styled.Button>
            <Button type="submit" variant="contained" disabled={isFormEmpty}>
              {t("common:actions.save")}
            </Button>
          </Styled.Button>
        </Form>
      </FormikProvider>
    </Styled.FormWrapper>
  );
}
