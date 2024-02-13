import SureModal from "@/src/ui/components/sure_modal/sure_modal";
import { Form, FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./create_supply_point.styled";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import { InputFormik } from "@/src/ui/components/input/input";
import { counterTypeOptions, energyTypeOptions, ownerTypeOptions } from "@/src/ui/utils/selector_options";
import Selector from "@/src/ui/components/selector/selector";
import CreateSupplyPointButtons from "../create_supply_point_buttons/create_supply_point_buttons";
import useCreateEditSupplyPointForm from "@/src/ui/pages/supply_point/controllers/create_edit_supply_point_controller";
import Switch from "@/src/ui/components/switch/switch";
import { useAutocompleteClientsProvider } from "@/src/ui/pages/supply_point/provider/autocomplete_client.provider";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import type { CreateSupplyPointModel } from "@/src/core/supply_point/domain/models/create_supply_point_model";
import { useCallback } from "react";
import { debounce } from "lodash";
import { DEFAULT_DEBOUNCE_TIME } from "@/src/common/utils";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";

interface Props {
  onSubmitForm: (input: CreateSupplyPointModel) => Promise<void>;
}

export default function CreateSupplyPoint({ onSubmitForm }: Props) {
  const { t } = useTranslation(["supply_point", "common"]);
  const { formSchema, isFormEmpty } = useCreateEditSupplyPointForm({
    onSubmitForm: onSubmitForm
  });
  const { showModal, onCancel, onClickCancel, onCloseModal } = useCancelButton({ condition: isFormEmpty });

  const { clients, setClientFilterName, isLoadingClients, getClientsByName } = useAutocompleteClientsProvider((state) => ({
    clients: state.items,
    setClientFilterName: state.setFilterName,
    isLoadingClients: state.isLoading,
    getClientsByName: state.getByName
  }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceClients = useCallback(debounce(getClientsByName, DEFAULT_DEBOUNCE_TIME), []);

  useEffectRunOnce(() => {
    debounceClients();
  }, [debounceClients, getClientsByName]);

  return (
    <>
      <Styled.Header>
        <h1>{t("supply_point:formTitle")}</h1>
        <p>{t("supply_point:formSubtitle")}</p>
      </Styled.Header>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <Styled.SupplyPointData>
            <Styled.FormGroupLabel>{t("supply_point:form.titles.data")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <Autocomplete
                options={clients}
                value={formSchema.values.client}
                onInputChange={setClientFilterName}
                onChange={(newValue) => {
                  formSchema.setFieldValue("client", newValue);
                }}
                isLoading={isLoadingClients}
                label={t("supply_point:columns.client")}
                required
              />
              <Selector
                label={t("supply_point:columns.energyType")}
                options={energyTypeOptions}
                name="energyType"
                id="energyType"
                value={formSchema.values.energyType}
                onChange={(value) => {
                  formSchema.setFieldValue("energyType", value);
                }}
                required
              />

              <InputFormik name="alias" label={t("supply_point:columns.alias")} id="alias" />
              <InputFormik name="cups" label={t("supply_point:columns.cups")} id="cups" />
            </Styled.FormGrid>
            <Styled.FormGroupLabel>{t("supply_point:form.titles.address")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <InputFormik name="supplyAddress" label={t("supply_point:columns.supplyAddress")} id="supplyAddress" />
              <InputFormik name="supplyPostalCode" label={t("supply_point:columns.supplyPostalCode")} id="supplyPostalCode" />
              <InputFormik name="supplyCity" label={t("supply_point:columns.supplyCity")} id="supplyCity" />
              <InputFormik name="supplyProvince" label={t("supply_point:columns.supplyProvince")} id="supplyProvince" />
            </Styled.FormGrid>

            <Styled.FormGroupLabel>{t("supply_point:form.titles.invoicing")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <InputFormik name="bankAccountHolder" label={t("supply_point:columns.bankAccountHolder")} id="bankAccountHolder" />
              <InputFormik name="bankAccountNumber" label={t("supply_point:columns.bankAccountNumber")} id="bankAccountNumber" />
              <InputFormik name="fiscalAddress" label={t("supply_point:columns.fiscalAddress")} id="fiscalAddress" />
            </Styled.FormGrid>

            <Styled.FormGroupLabel>{t("supply_point:form.titles.others")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <InputFormik name="maxAvailablePower" label={t("supply_point:columns.maxAvailablePower")} id="maxAvailablePower" />
              <InputFormik name="voltage" label={t("supply_point:columns.voltage")} id="voltage" />
              <Switch label={t("supply_point:columns.isRenewable")} id="isRenewable" name="isRenewable" />
            </Styled.FormGrid>

            <Styled.FormGroupLabel>{t("supply_point:form.titles.counter")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <Selector
                label={t("supply_point:columns.counterType")}
                options={counterTypeOptions}
                name="counterType"
                id="counterType"
                value={formSchema.values.counterType}
                onChange={(value) => {
                  formSchema.setFieldValue("counterType", value);
                }}
                required
              />
              <Selector
                label={t("supply_point:columns.counterProperty")}
                options={ownerTypeOptions}
                name="counterProperty"
                id="counterProperty"
                value={formSchema.values.counterProperty}
                onChange={(value) => {
                  formSchema.setFieldValue("counterProperty", value);
                }}
                required
              />
              <InputFormik name="counterPrice" label={t("supply_point:columns.counterPrice")} id="counterPrice" />
            </Styled.FormGrid>
          </Styled.SupplyPointData>

          <Styled.ButtonsWrapper>
            <CreateSupplyPointButtons isFormEmpty={isFormEmpty} onClickCancel={onClickCancel} />
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
