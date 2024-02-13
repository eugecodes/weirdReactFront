import SureModal from "@/src/ui/components/sure_modal/sure_modal";
import { Form, FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./create_contract.styled";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import { InputFormik } from "@/src/ui/components/input/input";
import CreateContractButtons from "../create_contract_buttons/create_contract_buttons";
import { useAutocompleteClientsProvider } from "@/src/ui/pages/contract/provider/autocomplete_client.provider";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import type { CreateContractModel } from "@/src/core/contract/domain/models/create_contract_model";
import { useCallback } from "react";
import { debounce } from "lodash";
import { DEFAULT_DEBOUNCE_TIME, MAX_PRICES } from "@/src/common/utils";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import useCreateContractForm from "@/src/ui/pages/contract/controllers/create_contract_controller";
import { useAutocompleteSupplyPointsProvider } from "../../../../provider/autocomplete_supply_points.provider";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import dayjs from "dayjs";
import { DATE_FORMAT_DATABASE } from "@/src/common/utils/dates";
import { useAutocompleteMarketersProvider } from "@/src/ui/pages/rate/provider/autocomplete_marketer.provider";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";

interface Props {
  onSubmitForm: (input: CreateContractModel) => Promise<void>;
}

export default function CreateContract({ onSubmitForm }: Props) {
  const { t } = useTranslation(["contract", "common"]);
  const { formSchema, isFormEmpty } = useCreateContractForm({
    onSubmitForm: onSubmitForm
  });
  const { showModal, onCancel, onClickCancel, onCloseModal } = useCancelButton({ condition: isFormEmpty });

  const { clients, setClientFilterName, isLoadingClients, getClientsByName } = useAutocompleteClientsProvider((state) => ({
    clients: state.items,
    setClientFilterName: state.setFilterName,
    isLoadingClients: state.isLoading,
    getClientsByName: state.getByName
  }));

  const { supplyPoints, setSupplyPointFilterName, setSupplyPointClient, isLoadingSupplyPoints, getSupplyPointsByName } =
    useAutocompleteSupplyPointsProvider((state) => ({
      supplyPoints: state.items,
      setSupplyPointFilterName: state.setFilterName,
      setSupplyPointClient: state.setClient,
      isLoadingSupplyPoints: state.isLoading,
      getSupplyPointsByName: state.getByName
    }));

  const { rateTypes, setRateTypeFilterName, setRateTypeEnergyType, areRateTypesLoading, getRateTypesByName } = useAutocompleteRateTypesProvider(
    (state) => ({
      rateTypes: state.items,
      setRateTypeFilterName: state.setFilterName,
      setRateTypeEnergyType: state.setEnergyType,
      areRateTypesLoading: state.isLoading,
      getRateTypesByName: state.getByName
    })
  );

  const { marketers, setMarketerFilterName, areMarketersLoading, getMarketersByName } = useAutocompleteMarketersProvider((state) => ({
    marketers: state.items,
    setMarketerFilterName: state.setFilterName,
    areMarketersLoading: state.isLoading,
    getMarketersByName: state.getByName
  }));

  const { rates, setRateFilterName, setRateType, setMarketerId, areRatesLoading, getRatesByName } = useAutocompleteRateProvider((state) => ({
    rates: state.items,
    setRateFilterName: state.setFilterName,
    setRateType: state.setRateType,
    setMarketerId: state.setMarketerId,
    areRatesLoading: state.isLoading,
    getRatesByName: state.getByName
  }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceClients = useCallback(debounce(getClientsByName, DEFAULT_DEBOUNCE_TIME), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSupplyPoints = useCallback(debounce(getSupplyPointsByName, DEFAULT_DEBOUNCE_TIME), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceRateTypes = useCallback(debounce(getRateTypesByName, DEFAULT_DEBOUNCE_TIME), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceMarketers = useCallback(debounce(getMarketersByName, DEFAULT_DEBOUNCE_TIME), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceRates = useCallback(debounce(getRatesByName, DEFAULT_DEBOUNCE_TIME), []);

  useEffectRunOnce(() => {
    debounceClients();
  }, [debounceClients, getClientsByName]);

  return (
    <>
      <Styled.Header>
        <h1>{t("contract:formTitle")}</h1>
        <p>{t("contract:formSubtitle")}</p>
      </Styled.Header>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <Styled.ContractData>
            <Styled.FormGroupLabel>{t("contract:form.titles.data")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <Autocomplete
                options={clients}
                onInputChange={setClientFilterName}
                onChange={(newValue) => {
                  if (newValue) {
                    formSchema.setFieldValue("client", newValue);
                    if ("id" in newValue) {
                      setSupplyPointClient(newValue.id);
                      debounceSupplyPoints();
                    }
                  }
                }}
                isLoading={isLoadingClients}
                label={t("contract:columns.client")}
                required
              />
              <Autocomplete
                options={supplyPoints}
                onInputChange={setSupplyPointFilterName}
                onChange={(newValue) => {
                  if (newValue) {
                    formSchema.setFieldValue("supplyPoint", newValue);
                    if ("id" in newValue) {
                      formSchema.setFieldValue("supplyPointId", newValue?.id);
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      setRateTypeEnergyType(newValue?.energyType);
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      formSchema.setFieldValue("energyType", newValue?.energyType);
                      debounceRateTypes();
                      debounceMarketers();
                    }
                  }
                }}
                isLoading={isLoadingSupplyPoints}
                label={t("contract:columns.supplyPoint")}
                required
                disabled={supplyPoints.length == 0}
              />
              <Autocomplete
                options={rateTypes}
                onInputChange={setRateTypeFilterName}
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
                disabled={rateTypes.length == 0}
              />
              <Autocomplete
                options={marketers}
                onInputChange={setMarketerFilterName}
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
                onInputChange={setRateFilterName}
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

          <Styled.ButtonsWrapper>
            <CreateContractButtons isFormEmpty={isFormEmpty} onClickCancel={onClickCancel} />
          </Styled.ButtonsWrapper>
        </Form>
      </FormikProvider>
      {showModal && (
        <SureModal
          primaryButtonText={t("common:actions.keepEditing")}
          description={t("common:sure.cancelCreate")}
          secondaryButtonText={t("common:actions.cancelChanges")}
          onSecondaryButtonClick={onCancel}
          onPrimaryButtonClick={onCloseModal}
        />
      )}
    </>
  );
}
