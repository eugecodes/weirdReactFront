/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./edit_saving_study.styled";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { CreateSavingStudyModel } from "@/src/core/saving_study/domain/models/create_saving_study_model";
import type { FormCreateSavingStudyValues } from "../../../../controllers/create_edit_saving_study_controller";
import useCreateEditSavingStudy, { validationSchemaForSelectRateButton } from "../../../../controllers/create_edit_saving_study_controller";
import { InputFormik } from "@/src/ui/components/input/input";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import { Alert, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useShowToast from "@/src/ui/hooks/useShowToast";
import { useMutationSavingStudyProvider } from "../../../../provider/mutation_saving_study.provider";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import paths from "@/src/ui/router/paths";
import { useCallback, useMemo, useState } from "react";
import Selector from "@/src/ui/components/selector/selector";
import { clientTypeOptions, energyTypeOptions } from "@/src/ui/utils/selector_options";
import IconWithTooltip from "@/src/ui/components/icon_with_tooltip/icon_with_tooltip";
import { Information } from "@/src/ui/assets/icons";
import ErrorMessage from "@/src/ui/components/error_message/error_message";
import SavingStudyController from "@/src/ui/pages/saving_study/controllers/saving_study_controller";

import { yup } from "@front_web_mrmilu/utils";
import type { Option, Optional } from "@/src/common/utils/types";
import Switch from "@/src/ui/components/switch/switch";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import { MAX_PRICES } from "@/src/common/utils";
import { StudyStatus } from "@/src/core/app/enums/study_status";

const useEditSavingStudyInitialValues = () => {
  const savingStudy = useMutationSavingStudyProvider((state) => state.item);
  return useMemo(() => {
    if (!savingStudy) return undefined;

    return {
      ...savingStudy,
      rate: savingStudy.selectedRate
        ? {
            label: savingStudy.selectedRate.name,
            id: savingStudy.selectedRate.id
          }
        : undefined,
      rateType: savingStudy?.rateType
        ? {
            label: savingStudy.rateType.name,
            id: savingStudy.rateType.id
          }
        : undefined,
      energyType: savingStudy.energyType || savingStudy.rateType?.energyType
    };
  }, [savingStudy]);
};

const checkIsValidForSelectRateButton = (savingStudy: Optional<FormCreateSavingStudyValues>) => {
  if (!savingStudy || !savingStudy?.rateType || !savingStudy.energyType) return false;

  const test = yup
    .object()
    .shape(
      validationSchemaForSelectRateButton({
        energyType: savingStudy.energyType,
        isFromSips: savingStudy.isFromSIPS,
        isCompareConditions: savingStudy.isCompareConditions
      })
    )
    .isValidSync(savingStudy);

  return test;
};

interface EditSavingStudyButtonsProps {
  savingStudy: FormCreateSavingStudyValues;
  isFormEmpty: boolean;
}

function EditSavingStudyButtons({ isFormEmpty, savingStudy }: EditSavingStudyButtonsProps) {
  const navigate = useNavigate();
  const [isStudyValidForSelectRate, setIsStudyValidForSelectRate] = useState(false);
  const { t } = useTranslation(["saving_study", "common"]);

  const onGenerateSuggestedRates = async () => {
    if (!savingStudy?.id || !savingStudy.clientType) return;
    await SavingStudyController.edit(savingStudy as CreateSavingStudyModel, savingStudy.id);
    await SavingStudyController.generateSuggestedRates(savingStudy.id);
    navigate(paths.savingStudy.index + "/" + savingStudy?.id + paths.savingStudy.selectRate);
  };

  useEffectRunOnce(() => {
    const timeout = setTimeout(() => {
      const isValid = checkIsValidForSelectRateButton(savingStudy);
      setIsStudyValidForSelectRate(isValid);
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [savingStudy, checkIsValidForSelectRateButton]);

  return (
    <Styled.Button>
      <Button variant="contained" disabled={isFormEmpty} type="submit">
        {t("common:actions.save")}
      </Button>
      <Button variant="outlined" onClick={onGenerateSuggestedRates} disabled={!isStudyValidForSelectRate}>
        {t("saving_study:actions.selectRate")}
      </Button>
    </Styled.Button>
  );
}

interface Props {
  optionalSavingStudyId?: number;
}

export default function EditSavingStudy({ optionalSavingStudyId = undefined }: Props) {
  const { savingStudyId } = useParams();
  const ediSavingStudy = useMutationSavingStudyProvider((state) => state.edit);
  const geSavingStudyById = useMutationSavingStudyProvider((state) => state.getById);
  const savingStudy = useMutationSavingStudyProvider((state) => state.item);
  const { showToast } = useShowToast();
  const navigate = useNavigate();
  const { t } = useTranslation(["saving_study", "common"]);
  const initialValues = useEditSavingStudyInitialValues();

  const onSubmitForm = async (input: CreateSavingStudyModel) => {
    if (!savingStudy) throw new Error("Saving study it's null");
    const _input = {
      ...input,
      isExistingClient: savingStudy.isExistingClient,
      isFromSIPS: savingStudy.isFromSIPS,
      isCompareConditions: input.isCompareConditions
    };
    await ediSavingStudy(_input, Number(savingStudyId));
    showToast({ message: t("saving_study:actions.edited") });
    navigate(paths.savingStudy.index);
  };

  const { formSchema, isFormEmpty, onChangeEnergyType } = useCreateEditSavingStudy({
    onSubmitForm,
    enableReinitialize: true,
    initialValues,
    id: Number(savingStudyId)
  });

  const areRateTypesLoading = useAutocompleteRateTypesProvider((state) => state.isLoading);
  const setRateTypeFilterName = useAutocompleteRateTypesProvider((state) => state.setFilterName);
  const rateTypeFilter = useAutocompleteRateTypesProvider((state) => state.filterName);
  const rateTypes = useAutocompleteRateTypesProvider((state) => state.items);

  const geSavingStudy = useCallback(async () => {
    let querySavingStudyId;
    if (savingStudyId) {
      querySavingStudyId = savingStudyId;
    } else {
      querySavingStudyId = optionalSavingStudyId;
    }
    if (querySavingStudyId) {
      const id = Number(querySavingStudyId);
      const response = await geSavingStudyById(id);
      if (!response || response.status === StudyStatus.COMPLETED) {
        navigate(paths.savingStudy.index);
      }
    }
  }, [geSavingStudyById, navigate, savingStudyId, optionalSavingStudyId]);

  useEffectRunOnce(() => {
    geSavingStudy();
  }, [geSavingStudy]);

  return (
    <>
      <Styled.Header>
        <h1>{t("saving_study:actions.edit")}</h1>
        <p>{t("common:editDescription")}</p>

        <Styled.AlertWrapper>
          <Alert severity="info">{t("saving_study:infoSelectRateRequired")}</Alert>
        </Styled.AlertWrapper>
      </Styled.Header>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <h2>{t("saving_study:form.titles.studyType")}</h2>
          <Styled.SavingStudyData>
            <Styled.FormGrid>
              <Switch
                label={t("saving_study:columns.existingClient")}
                id="existingClient"
                name="existingClient"
                checked={formSchema.values.isExistingClient}
                disabled
              />
              <Switch
                label={t("saving_study:columns.extractSipsConsume")}
                tooltip={t("saving_study:tooltip.extractSips")}
                id="isFromSIPS"
                name="isFromSIPS"
                checked={formSchema.values.isFromSIPS}
                disabled
              />
              <Switch
                label={t("saving_study:columns.compareConditions")}
                id="isCompareConditions"
                name="isCompareConditions"
                checked={formSchema.values.isCompareConditions}
                onChange={(event) => formSchema.setFieldValue("isCompareConditions", event.target.checked)}
                required
              />
            </Styled.FormGrid>
            <h2>{t("saving_study:form.titles.data")}</h2>
            <Styled.FormGrid>
              <InputFormik
                name="cups"
                label={t("saving_study:columns.cups")}
                value={formSchema.values.cups}
                disabled={formSchema.values.isFromSIPS}
                required
              />
              <Selector
                label={t("saving_study:columns.energyType")}
                options={energyTypeOptions}
                value={formSchema.values?.energyType}
                name="energyType"
                id="energyType"
                onChange={(value) => {
                  onChangeEnergyType(value as EnergyTypes);
                }}
                disabled={formSchema.values.isFromSIPS}
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
              <div>
                <Autocomplete
                  label={t("saving_study:columns.rateType")}
                  options={rateTypes}
                  inputValue={rateTypeFilter}
                  onInputChange={setRateTypeFilterName}
                  onChange={(value) => {
                    const newValue: Option | undefined = (value as Option) ?? undefined;
                    formSchema.setFieldValue("rateType", newValue);
                  }}
                  isLoading={areRateTypesLoading}
                  value={formSchema.values.rateType}
                  required
                />
                {formSchema.errors.rateType ? (
                  <ErrorMessage>
                    <p>{formSchema.errors.rateType}</p>
                  </ErrorMessage>
                ) : null}
              </div>
              <Styled.InputWithTooltip>
                <InputFormik
                  name="analyzedDays"
                  label={t("saving_study:columns.analysedDays")}
                  id="analyzedDays"
                  type="number"
                  disabled={formSchema.values.isFromSIPS}
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
                disabled={formSchema.values.isFromSIPS}
                required
              />
            </Styled.FormGrid>
          </Styled.SavingStudyData>

          {formSchema.values.energyType === EnergyTypes.LIGHT ? (
            <Styled.SavingStudyData>
              <h2>{t("saving_study:form.titles.actualPower")}</h2>
              <Styled.FormGrid>
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
                      disabled={formSchema.values.isFromSIPS}
                    />
                  );
                })}
              </Styled.FormGrid>
            </Styled.SavingStudyData>
          ) : null}

          <Styled.SavingStudyData>
            <h2>{t("saving_study:form.titles.actualEnergy")}</h2>
            <Styled.FormGrid>
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
                    disabled={formSchema.values.isFromSIPS}
                  />
                );
              })}
            </Styled.FormGrid>
          </Styled.SavingStudyData>

          <Styled.SavingStudyData>
            <h2>{t("saving_study:form.titles.currentData")}</h2>
            <Styled.FormGroupLabel>{t("saving_study:columns.currentMarketer")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <InputFormik name="marketer" label={t("saving_study:columns.currentMarketer")} id="marketer" />
            </Styled.FormGrid>

            {formSchema.values.isCompareConditions && (
              <>
                <Styled.FormGroupLabel>{t("saving_study:form.titles.actualEnergyPrices")}</Styled.FormGroupLabel>

                <Styled.FormGrid>
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
                </Styled.FormGrid>
              </>
            )}

            {formSchema.values.energyType === EnergyTypes.LIGHT && formSchema.values.isCompareConditions && (
              <>
                <Styled.FormGroupLabel>{t("saving_study:form.titles.actualPowerPrices")}</Styled.FormGroupLabel>
                <Styled.FormGrid>
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
                </Styled.FormGrid>
              </>
            )}

            {formSchema.values.energyType === EnergyTypes.GAS && (
              <>
                <Styled.FormGroupLabel>{t("saving_study:columns.fixedPrice")}</Styled.FormGroupLabel>
                <Styled.FormGrid>
                  <InputFormik
                    label={t("saving_study:columns.fixedPrice")}
                    name="fixedPrice"
                    id="fixedPrice"
                    type="number"
                    required={formSchema.values.isCompareConditions}
                  />
                </Styled.FormGrid>
              </>
            )}

            <Styled.FormGroupLabel>{t("saving_study:columns.otherCost")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <InputFormik label={t("saving_study:columns.otherCostEurMonth")} name="otherCostEurMonth" id="otherCostEurMonth" type="number" />
              <InputFormik label={t("saving_study:columns.otherCostEurKwh")} name="otherCostEurKwh" id="otherCostEurKwh" type="number" />
              <InputFormik label={t("saving_study:columns.otherCostPercentage")} name="otherCostPercentage" id="otherCostPercentage" type="number" />
            </Styled.FormGrid>
          </Styled.SavingStudyData>
          <EditSavingStudyButtons savingStudy={formSchema.values} isFormEmpty={isFormEmpty} />
        </Form>
      </FormikProvider>
    </>
  );
}
