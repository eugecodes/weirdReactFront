import type { CreateCostModel } from "@/src/core/cost/domain/models/create_cost_model";
import { Button } from "@mui/material";
import { Form } from "formik";
import { FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./edit_cost_form.styled";
import useCreateEditCostForm from "../../../../controllers/create_edit_cost_controller";
import Selector from "@/src/ui/components/selector/selector";
import { InputFormik } from "@/src/ui/components/input/input";
import { booleanOptions, clientTypeOptions, costOptions, energyTypeOptions } from "@/src/ui/utils/selector_options";
import type { Option, Optional } from "@/src/common/utils/types";
import { useMemo } from "react";
import RadioButtons from "@/src/ui/components/radio_buttons/radio_buttons";
import { convertBooleanStringIntoBoolean, convertNumberIntoString } from "@/src/common/utils";
import type { DetailCostModel } from "@/src/core/cost/domain/models/detail_cost_model";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";

interface Props {
  onSubmitForm: (input: CreateCostModel) => Promise<void>;
  cost: Optional<DetailCostModel>;
}

export default function EditCostForm({ onSubmitForm, cost }: Props) {
  const { t } = useTranslation(["cost", "common"]);
  const initialValues = useMemo(() => {
    return cost
      ? {
          ...cost,
          rates: cost.rates.map((rate) => ({ id: rate.id, label: rate.name })),
          minPower: convertNumberIntoString(cost.minPower),
          maxPower: convertNumberIntoString(cost.maxPower),
          quantity: convertNumberIntoString(cost.quantity),
          extraFee: convertNumberIntoString(cost.extraFee)
        }
      : undefined;
  }, [cost]);

  const { formSchema, isFormEmpty, onChangeRate, onChangeEnergyType } = useCreateEditCostForm({
    onSubmitForm,
    initialValues
  });

  const { rates, setRateFilterName } = useAutocompleteRateProvider((state) => ({
    rates: state.items,
    setRateFilterName: state.setFilterName
  }));

  const ratesValue = useMemo(() => formSchema.values.rates || [], [formSchema.values.rates]);

  return (
    <Styled.FormWrapper>
      <Styled.Header>
        <h1>{t("cost:actions.edit")}</h1>
        <p>{t("common:editDescription")}</p>
      </Styled.Header>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <div>
            <h2>{t("cost:data")}</h2>
            <Styled.Data>
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
                disabled
                errorMessage={formSchema.errors.energyType}
                label={t("cost:columns.energyType")}
                name="energyType"
                options={energyTypeOptions}
                value={cost?.rates.at(0)?.rateType?.energyType}
                onChange={(newValue) => {
                  onChangeEnergyType(newValue as EnergyTypes);
                }}
                required
              />
              <Autocomplete
                multiple
                options={rates}
                label={t("cost:columns.rates")}
                value={ratesValue}
                onInputChange={setRateFilterName}
                onChange={(value) => {
                  const newValue: Option[] | undefined = (value as Option[]) ?? undefined;
                  onChangeRate(newValue);
                }}
                hasError={!!formSchema.errors.rates}
                errorMessage={formSchema.errors.rates}
                required
              />
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
            </Styled.Data>
          </div>
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
