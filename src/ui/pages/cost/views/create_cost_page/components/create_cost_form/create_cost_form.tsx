import type { CreateCostModel } from "@/src/core/cost/domain/models/create_cost_model";
import SureModal from "@/src/ui/components/sure_modal/sure_modal";
import { Button } from "@mui/material";
import { Form } from "formik";
import { FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./create_cost_form.styled";
import useCreateEditCostForm from "@/src/ui/pages/cost/controllers/create_edit_cost_controller";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import Selector from "@/src/ui/components/selector/selector";
import { InputFormik } from "@/src/ui/components/input/input";
import { booleanOptions, clientTypeOptions, costOptions, energyTypeOptions } from "@/src/ui/utils/selector_options";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import RadioButtons from "@/src/ui/components/radio_buttons/radio_buttons";
import { convertBooleanStringIntoBoolean } from "@/src/common/utils";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import type { Option } from "@/src/common/utils/types";

interface Props {
  onSubmitForm: (input: CreateCostModel) => Promise<void>;
  backUrl?: string;
}

export default function CreateCostForm({ onSubmitForm, backUrl }: Props) {
  const { t } = useTranslation(["cost", "common"]);
  const { formSchema, isFormEmpty, onChangeRate, onChangeEnergyType } = useCreateEditCostForm({
    onSubmitForm,
    initialValues: undefined
  });

  const { showModal, onCancel, onClickCancel, onCloseModal } = useCancelButton({ condition: isFormEmpty, onCancelUrl: backUrl });

  const { rates, setRateFilterName, areRatesLoading } = useAutocompleteRateProvider((state) => ({
    rates: state.items,
    setRateFilterName: state.setFilterName,
    areRatesLoading: state.isLoading
  }));

  return (
    <Styled.FormWrapper>
      <h1>{t("cost:formTitle")}</h1>
      <p>{t("cost:formSubtitle")}</p>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <InputFormik name="name" label={t("cost:columns.name")} id="name" required />
          <RadioButtons
            name="mandatory"
            options={booleanOptions}
            label={t("cost:columns.mandatory")}
            value={formSchema.values.mandatory || false}
            onChange={(value) => formSchema.setFieldValue("mandatory", convertBooleanStringIntoBoolean(value))}
            required
          />
          <Selector
            multiple
            errorMessage={formSchema.errors.clientTypes}
            label={t("cost:columns.clientType")}
            name="clientTypes"
            options={clientTypeOptions}
            value={formSchema.values.clientTypes}
            onChange={(newValue) => {
              formSchema.setFieldValue("clientTypes", newValue);
            }}
            required
          />
          <Selector
            errorMessage={formSchema.errors.energyType}
            label={t("cost:columns.energyType")}
            name="energyType"
            options={energyTypeOptions}
            value={formSchema.values.energyType}
            onChange={(newValue) => {
              onChangeEnergyType(newValue as EnergyTypes);
            }}
            required
          />
          <div>
            <Autocomplete
              multiple
              value={formSchema.values.rates}
              label={t("cost:columns.rates")}
              options={rates}
              onInputChange={setRateFilterName}
              onChange={(value) => {
                const newRates: Option[] | undefined = (value as Option[]) ?? undefined;
                onChangeRate(newRates);
              }}
              isLoading={areRatesLoading}
              hasError={!!formSchema.errors.rates}
              errorMessage={formSchema.errors.rates}
              required
            />
          </div>
          {formSchema.values.energyType === EnergyTypes.LIGHT ? (
            <>
              <InputFormik label={t("cost:columns.minPower")} id="minPower" name="minPower" type="number" required />
              <InputFormik label={t("cost:columns.maxPower")} id="maxPower" name="maxPower" type="number" required />
            </>
          ) : null}

          <Selector
            errorMessage={formSchema.errors.type}
            label={t("cost:columns.costType")}
            name="type"
            options={costOptions}
            value={formSchema.values.type}
            onChange={(newValue) => {
              formSchema.setFieldValue("type", newValue);
            }}
            required
          />

          <InputFormik label={t("cost:columns.quantity")} id="quantity" name="quantity" type="number" required />
          <InputFormik label={t("cost:columns.extraFee")} id="extraFee" name="extraFee" type="number" />

          <Styled.ButtonsWrapper>
            <Button type="submit" variant="contained" disabled={isFormEmpty}>
              {t("cost:actions.save")}
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
          description={t("cost:sure.cancelCreate")}
          secondaryButtonText={t("common:actions.cancelChanges")}
          onSecondaryButtonClick={onCancel}
          onPrimaryButtonClick={onCloseModal}
        />
      )}
    </Styled.FormWrapper>
  );
}
