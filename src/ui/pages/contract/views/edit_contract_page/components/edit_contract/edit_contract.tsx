import { Form, FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./edit_contract.styled";
import { InputFormik } from "@/src/ui/components/input/input";
import type { EditContractModel } from "@/src/core/contract/domain/models/edit_contract_model";
import { Button } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import useEditContractForm from "@/src/ui/pages/contract/controllers/edit_contract_controller";
import { DEFAULT_DEBOUNCE_TIME, MAX_PRICES } from "@/src/common/utils";
import dayjs from "dayjs";
import { DATE_FORMAT_DATABASE } from "@/src/common/utils/dates";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import { debounce } from "lodash";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import { useAutocompleteMarketersProvider } from "@/src/ui/pages/rate/provider/autocomplete_marketer.provider";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import type { Optional } from "@/src/common/utils/types";
import type { ContractModel } from "@/src/core/contract/domain/models/contract_model";

interface Props {
  onSubmitForm: (input: EditContractModel) => Promise<void>;
  contract: Optional<ContractModel>;
}

export default function EditContract({ onSubmitForm, contract }: Props) {
  const { t } = useTranslation(["contract", "common"]);

  const initialValues = useMemo(() => {
    return contract
      ? {
          ...contract,
          rateType: contract?.rate?.rateType
            ? { id: contract?.rate?.rateType?.id, label: contract?.rate?.rateType?.name, energyType: contract?.rate?.rateType?.energyType }
            : undefined,
          marketer: contract?.rate?.marketer ? { id: contract?.rate?.marketer?.id, label: contract?.rate?.marketer?.name } : undefined,
          rate: contract?.rate ? { id: contract?.rate?.id, label: contract?.rate?.name } : undefined,
          energyType: contract?.supplyPoint?.energyType
        }
      : undefined;
  }, [contract]);

  const { formSchema, isFormEmpty } = useEditContractForm({
    onSubmitForm,
    initialValues
  });

  const { rateTypes, setRateTypeFilterName, setRateTypeEnergyType, areRateTypesLoading, getRateTypesByName } = useAutocompleteRateTypesProvider(
    (state) => ({
      rateTypes: state.items,
      setRateTypeFilterName: state.setFilterName,
      setRateTypeEnergyType: state.setEnergyType,
      areRateTypesLoading: state.isLoading,
      getRateTypesByName: state.getByName
    })
  );

  const { marketers, areMarketersLoading, getMarketersByName } = useAutocompleteMarketersProvider((state) => ({
    marketers: state.items,
    setMarketerFilterName: state.setFilterName,
    areMarketersLoading: state.isLoading,
    getMarketersByName: state.getByName
  }));

  const { rates, setRateType, setMarketerId, areRatesLoading, getRatesByName } = useAutocompleteRateProvider((state) => ({
    rates: state.items,
    setRateFilterName: state.setFilterName,
    setRateType: state.setRateType,
    setMarketerId: state.setMarketerId,
    areRatesLoading: state.isLoading,
    getRatesByName: state.getByName
  }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceRateTypes = useCallback(debounce(getRateTypesByName, DEFAULT_DEBOUNCE_TIME), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceMarketers = useCallback(debounce(getMarketersByName, DEFAULT_DEBOUNCE_TIME), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceRates = useCallback(debounce(getRatesByName, DEFAULT_DEBOUNCE_TIME), []);

  useEffectRunOnce(() => {
    setRateTypeEnergyType(contract?.supplyPoint?.energyType);
    setRateTypeFilterName("");
    debounceRateTypes();
    debounceMarketers();
    setMarketerId(contract?.rate?.marketer?.id);
    debounceRates();
  }, [contract, setRateTypeFilterName]);

  const rateTypeValue = useMemo(() => formSchema.values.rateType || null, [formSchema.values.rateType]);
  const marketerValue = useMemo(() => formSchema.values.marketer || null, [formSchema.values.marketer]);
  const rateValue = useMemo(() => formSchema.values.rate || null, [formSchema.values.rate]);

  return (
    <>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <Styled.ContractData>
            <Styled.FormGroupLabel>{t("contract:form.titles.data")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <Autocomplete
                options={rateTypes}
                // onInputChange={setRateTypeFilterName}
                value={rateTypeValue}
                onChange={(newValue) => {
                  if (newValue) {
                    formSchema.setFieldValue("rateType", newValue);
                    if ("id" in newValue) {
                      setRateType([newValue]);
                      debounceRates();
                    }
                  }
                }}
                isLoading={areRateTypesLoading}
                label={t("contract:columns.rateType")}
                required
                disabled={rateTypes.length === 0}
              />
              <Autocomplete
                options={marketers}
                // onInputChange={setMarketerFilterName}
                value={marketerValue}
                onChange={(newValue) => {
                  if (newValue) {
                    formSchema.setFieldValue("marketer", newValue);
                    if ("id" in newValue) {
                      setMarketerId(newValue.id);
                      debounceRates();
                    }
                  }
                }}
                isLoading={areMarketersLoading}
                label={t("contract:columns.marketer")}
                required
                disabled={marketers.length == 0}
              />
              <Autocomplete
                options={rates}
                value={rateValue}
                onChange={(newValue) => {
                  if (newValue) {
                    formSchema.setFieldValue("rate", newValue);
                    if ("id" in newValue) {
                      formSchema.setFieldValue("rateId", newValue?.id);
                    }
                  }
                }}
                isLoading={areRatesLoading}
                label={t("contract:columns.rateName")}
                required
                disabled={rates.length == 0}
              />
            </Styled.FormGrid>
            {formSchema.values.energyType === EnergyTypes.LIGHT ? (
              <>
                <Styled.FormGroupLabel>{t("contract:form.titles.power")}</Styled.FormGroupLabel>
                <Styled.FormGrid>
                  {Array.from({ length: MAX_PRICES }).map((_, i) => {
                    const current = i + 1;
                    return (
                      <InputFormik
                        key={current}
                        className="numeric-input-without-arrows"
                        label={t("contract:columns.power", { current })}
                        id={"power" + current}
                        name={"power" + current}
                        type="number"
                      />
                    );
                  })}
                </Styled.FormGrid>
              </>
            ) : null}
            <Styled.FormGroupLabel>{t("contract:form.titles.dates")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <Styled.DatePickerS
                value={formSchema.values.preferredStartDate || null}
                label={t("contract:columns.preferredStartDate")}
                onChange={(value) => {
                  let formatedDate = null;
                  if (value) {
                    formatedDate = dayjs(value).format(DATE_FORMAT_DATABASE);
                  }
                  formSchema.setFieldValue("preferredStartDate", formatedDate);
                }}
              />
              <InputFormik name="period" label={t("contract:columns.period")} id="period" />
            </Styled.FormGrid>
            <Styled.FormGroupLabel>{t("contract:form.titles.signature")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <InputFormik name="signatureFirstName" label={t("contract:columns.signatureFirstName")} id="signatureFirstName" />
              <InputFormik name="signatureLastName" label={t("contract:columns.signatureLastName")} id="signatureLastName" />
              <InputFormik name="signatureDni" label={t("contract:columns.signatureDni")} id="signatureDni" />
              <InputFormik name="signatureEmail" label={t("contract:columns.signatureEmail")} id="signatureEmail" />
              <InputFormik name="signaturePhone" label={t("contract:columns.signaturePhone")} id="signaturePhone" />
            </Styled.FormGrid>
          </Styled.ContractData>

          <Styled.Button>
            <Button type="submit" variant="contained" disabled={isFormEmpty}>
              {t("common:actions.save")}
            </Button>
          </Styled.Button>
        </Form>
      </FormikProvider>
    </>
  );
}
