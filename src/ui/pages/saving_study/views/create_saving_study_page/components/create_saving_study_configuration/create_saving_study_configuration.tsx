import SureModal from "@/src/ui/components/sure_modal/sure_modal";
import { Alert, Button } from "@mui/material";
import { Form } from "formik";
import { FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./create_saving_study_configuration.styled";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import useCreateSavingStudyConfigurationForm from "./controller/create_saving_study_configuration";
import { InputFormik } from "@/src/ui/components/input/input";
import Selector from "@/src/ui/components/selector/selector";
import { energyTypeOptions } from "@/src/ui/utils/selector_options";
import Switch from "@/src/ui/components/switch/switch";
import type { CreateSavingStudyConfigurationModel } from "@/src/core/saving_study/domain/models/create_saving_study_configuration_model";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { emptyString } from "@/src/common/utils";

interface Props {
  onSubmitForm: (input: CreateSavingStudyConfigurationModel) => Promise<void>;
  errorMessage?: string;
}

export default function CreateSavingStudyConfiguration({ onSubmitForm, errorMessage = emptyString }: Props) {
  const { t } = useTranslation(["saving_study", "common"]);

  const { formSchema, isFormEmpty } = useCreateSavingStudyConfigurationForm({
    onSubmitForm: (input) => onSubmitForm(input as CreateSavingStudyConfigurationModel)
  });

  const { showModal, onCancel, onClickCancel, onCloseModal } = useCancelButton({ condition: isFormEmpty });

  return (
    <Styled.FormWrapper>
      <h1>{t("saving_study:formTitle")}</h1>
      <p>{t("saving_study:formSubtitle")}</p>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <InputFormik label={t("saving_study:columns.cups")} id="cups" name="cups" required />
          <Selector
            label={t("saving_study:columns.energyType")}
            options={energyTypeOptions}
            name="energyType"
            id="energyType"
            value={formSchema.values.energyType}
            onChange={(value) => {
              if (value === EnergyTypes.GAS) {
                formSchema.setFieldValue("isFromSIPS", false);
              }
              formSchema.setFieldValue("energyType", value);
            }}
            errorMessage={formSchema.errors.energyType}
            required
          />
          <Switch label={t("saving_study:columns.existingClient")} id="existingClient" name="existingClient" disabled required />
          <Switch
            label={t("saving_study:columns.extractSipsConsume")}
            tooltip={t("saving_study:tooltip.extractSips")}
            id="isFromSIPS"
            name="isFromSIPS"
            checked={formSchema.values.isFromSIPS}
            onChange={(event) => formSchema.setFieldValue("isFromSIPS", event.target.checked)}
            disabled={formSchema.values.energyType === EnergyTypes.GAS}
            required
          />
          <Switch
            label={t("saving_study:columns.compareConditions")}
            id="isCompareConditions"
            name="isCompareConditions"
            checked={formSchema.values.isCompareConditions}
            onChange={(event) => formSchema.setFieldValue("isCompareConditions", event.target.checked)}
            required
          />
          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
          <Styled.ButtonsWrapper>
            <Button type="submit" variant="contained" disabled={isFormEmpty}>
              {t("common:actions.save")}
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
          description={t("common:sure.cancelCreate")}
          secondaryButtonText={t("common:actions.cancelChanges")}
          onSecondaryButtonClick={onCancel}
          onPrimaryButtonClick={onCloseModal}
        />
      )}
    </Styled.FormWrapper>
  );
}
