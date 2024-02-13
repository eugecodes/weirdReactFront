import SureModal from "@/src/ui/components/sure_modal/sure_modal";
import { Form } from "formik";
import { FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./create_saving_study.styled";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { CreateSavingStudyModel } from "@/src/core/saving_study/domain/models/create_saving_study_model";
import useCreateEditSavingStudy from "../../../../controllers/create_edit_saving_study_controller";
import FormAccordion from "@/src/ui/components/form_ accordion/form_accordion";
import { InputFormik } from "@/src/ui/components/input/input";
import { clientTypeOptions, energyTypeOptions } from "@/src/ui/utils/selector_options";
import Selector from "@/src/ui/components/selector/selector";
import { useEffect } from "react";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import type { Option } from "@/src/common/utils/types";
import CreateSavingStudyButtons from "../create_saving_study_buttons/create_saving_study_buttons";
import type { CreateSavingStudyConfigurationModel } from "@/src/core/saving_study/domain/models/create_saving_study_configuration_model";
import { Alert } from "@mui/material";
import IconWithTooltip from "@/src/ui/components/icon_with_tooltip/icon_with_tooltip";
import { Information } from "@/src/ui/assets/icons";
import { MAX_PRICES } from "@/src/common/utils";

interface Props {
  onSubmitForm: (input: CreateSavingStudyModel) => Promise<void>;
  onClickSelectRate: () => Promise<void>;
  configurationValues: CreateSavingStudyConfigurationModel;
  isSelectRateDisabled: boolean;
}

export default function CreateSavingStudy({ onSubmitForm, configurationValues, onClickSelectRate, isSelectRateDisabled }: Props) {
  const { t } = useTranslation(["saving_study", "common"]);

  const { formSchema, isFormEmpty, onChangeEnergyType } = useCreateEditSavingStudy({
    onSubmitForm: onSubmitForm
  });

  const { showModal, onCancel, onClickCancel, onCloseModal } = useCancelButton({ condition: isFormEmpty });

  useEffect(() => {
    formSchema.setFieldValue("cups", configurationValues.cups);
    onChangeEnergyType(configurationValues.energyType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configurationValues.cups, configurationValues.energyType]);

  const { rateTypes, setRateTypeFilterName, areRateTypesLoading } = useAutocompleteRateTypesProvider((state) => ({
    rateTypes: state.items,
    setRateTypeFilterName: state.setFilterName,
    areRateTypesLoading: state.isLoading
  }));

  return (
    <Styled.FormWrapper>
      <h1>{t("saving_study:formTitle")}</h1>
      <p>{t("saving_study:formSubtitle")}</p>
      {configurationValues.isFromSIPS && (
        <Styled.AlertWrapper>
          <Alert severity="info">{t("saving_study:infoFromSips")}</Alert>
        </Styled.AlertWrapper>
      )}

      <Styled.AlertWrapper>
        <Alert severity="info">{t("saving_study:infoSelectRate")}</Alert>
      </Styled.AlertWrapper>

      <Styled.AlertWrapper>
        <Alert severity="info">{t("saving_study:infoSelectRateRequired")}</Alert>
      </Styled.AlertWrapper>

      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <FormAccordion title={t("saving_study:form.titles.data")}>
            <>
              <InputFormik
                name="cups"
                label={t("saving_study:columns.cups")}
                value={configurationValues.cups}
                disabled={configurationValues.isFromSIPS}
                required
              />
              <Selector
                label={t("saving_study:columns.energyType")}
                options={energyTypeOptions}
                name="energyType"
                id="energyType"
                value={configurationValues.energyType}
                onChange={(value) => onChangeEnergyType(value as EnergyTypes)}
                disabled={configurationValues.isFromSIPS}
                required
              />
              <Selector
                label={t("saving_study:columns.clientType")}
                options={clientTypeOptions}
                name="clientType"
                id="clientType"
                value={formSchema.values.clientType}
                onChange={(value) => {
                  formSchema.setFieldValue("clientType", value);
                }}
                required
              />
              <InputFormik name="clientName" label={t("saving_study:columns.clientName")} id="clientName" />
              <InputFormik name="clientNif" label={t("saving_study:columns.clientNif")} id="clientNif" />
              <Autocomplete
                options={rateTypes}
                onInputChange={setRateTypeFilterName}
                onChange={(value) => {
                  const newValue: Option | undefined = (value as Option) ?? undefined;
                  formSchema.setFieldValue("rateType", newValue);
                }}
                label={t("saving_study:columns.rateType")}
                isLoading={areRateTypesLoading}
                value={formSchema.values.rateType}
                hasError={!!formSchema.errors.rateType}
                /* TODO: Check why rateType is an string when it should be an object */
                //eslint-disable-next-line @typescript-eslint/no-explicit-any
                errorMessage={(formSchema.errors.rateType as any)?.id}
                required
              />
              <Styled.InputWithTooltip>
                <InputFormik
                  name="analyzedDays"
                  label={t("saving_study:columns.analysedDays")}
                  id="analyzedDays"
                  type="number"
                  disabled={configurationValues.isFromSIPS}
                  required
                />
                <IconWithTooltip tooltip={t("saving_study:tooltip.analyzedDays")}>
                  <Information />
                </IconWithTooltip>
              </Styled.InputWithTooltip>
              <InputFormik
                name="anualConsumption"
                label={t("saving_study:columns.anualConsumption")}
                id="anualConsumption"
                type="number"
                disabled={configurationValues.isFromSIPS}
                required
              />
            </>
          </FormAccordion>
          {configurationValues.energyType === EnergyTypes.LIGHT ? (
            <FormAccordion title={t("saving_study:form.titles.actualPower")}>
              <>
                {Array.from({ length: MAX_PRICES }).map((_, i) => {
                  const current = i + 1;
                  return (
                    <InputFormik
                      key={current}
                      className="numeric-input-without-arrows"
                      label={t("saving_study:columns.power", { current })}
                      id={"power" + current}
                      name={"power" + current}
                      type="number"
                      disabled={configurationValues.isFromSIPS}
                    />
                  );
                })}
              </>
            </FormAccordion>
          ) : null}
          <FormAccordion title={t("saving_study:form.titles.actualEnergy")}>
            <>
              {Array.from({ length: MAX_PRICES }).map((_, i) => {
                const current = i + 1;
                return (
                  <InputFormik
                    key={current}
                    className="numeric-input-without-arrows"
                    label={t("saving_study:columns.consumption", { current })}
                    id={"consumption" + current}
                    name={"consumption" + current}
                    type="number"
                    disabled={configurationValues.isFromSIPS}
                  />
                );
              })}
            </>
          </FormAccordion>
          <FormAccordion title={t("saving_study:form.titles.actualPrices")}>
            <>
              <InputFormik name="marketer" label={t("saving_study:columns.marketer")} id="marketer" />

              <Styled.FormGroupLabel>{t("saving_study:form.titles.actualEnergyPrices")}</Styled.FormGroupLabel>
              {Array.from({ length: MAX_PRICES }).map((_, i) => {
                const current = i + 1;
                return (
                  <InputFormik
                    key={current}
                    className="numeric-input-without-arrows"
                    label={t("saving_study:columns.energyPrice", { current })}
                    id={"energyPrice" + current}
                    name={"energyPrice" + current}
                    type="number"
                  />
                );
              })}

              {configurationValues.energyType === EnergyTypes.LIGHT && (
                <>
                  <Styled.FormGroupLabel>{t("saving_study:form.titles.actualPowerPrices")}</Styled.FormGroupLabel>
                  {Array.from({ length: MAX_PRICES }).map((_, i) => {
                    const current = i + 1;
                    return (
                      <InputFormik
                        key={current}
                        className="numeric-input-without-arrows"
                        label={t("saving_study:columns.energyPrice", { current })}
                        id={"powerPrice" + current}
                        name={"powerPrice" + current}
                        type="number"
                      />
                    );
                  })}
                </>
              )}

              {configurationValues.energyType === EnergyTypes.GAS && (
                <InputFormik
                  label={t("saving_study:columns.fixedPrice")}
                  name="fixedPrice"
                  id="fixedPrice"
                  type="number"
                  required={formSchema.values.isCompareConditions}
                />
              )}
              <Styled.FormGroupLabel>{t("saving_study:columns.otherCost")}</Styled.FormGroupLabel>
              <InputFormik label={t("saving_study:columns.otherCostEurMonth")} name="otherCostEurMonth" id="otherCostEurMonth" type="number" />
              <InputFormik label={t("saving_study:columns.otherCostEurKwh")} name="otherCostEurKwh" id="otherCostEurKwh" type="number" />
              <InputFormik label={t("saving_study:columns.otherCostPercentage")} name="otherCostPercentage" id="otherCostPercentage" type="number" />
            </>
          </FormAccordion>
          <Styled.ButtonsWrapper>
            <CreateSavingStudyButtons
              isFormEmpty={isFormEmpty}
              onClickCancel={onClickCancel}
              onClickSelectRate={onClickSelectRate}
              isSelectRateDisabled={isSelectRateDisabled}
            />
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
    </Styled.FormWrapper>
  );
}
