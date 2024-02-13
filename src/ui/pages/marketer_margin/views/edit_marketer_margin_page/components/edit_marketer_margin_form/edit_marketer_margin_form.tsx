import type { CreateMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/create_marketer_margin_model";
import { Button } from "@mui/material";
import { Form } from "formik";
import { FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./edit_marketer_margin_form.styled";
import useCreateEditMarketerMarginForm from "@/src/ui/pages/marketer_margin/controllers/create_edit_marketer_margin_controller";
import Selector from "@/src/ui/components/selector/selector";
import { InputFormik } from "@/src/ui/components/input/input";
import { marginOptions } from "@/src/ui/utils/selector_options";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import { MarginType } from "@/src/core/app/enums/margin_type";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import type { Option, Optional } from "@/src/common/utils/types";
import type { MarketerMarginModel } from "@/src/core/marketer_margin/domain/models/marketer_margin_model";
import { useMemo } from "react";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";

interface Props {
  onSubmitForm: (input: CreateMarketerMarginModel) => Promise<void>;
  marketerMargin: Optional<MarketerMarginModel>;
}

export default function EditMarketerMarginForm({ onSubmitForm, marketerMargin }: Props) {
  const { t } = useTranslation(["marketer_margin", "common"]);
  const initialValues = useMemo(() => {
    return marketerMargin
      ? {
          ...marketerMargin,
          rate: marketerMargin.rate ? { id: marketerMargin.rate.id, label: marketerMargin.rate.name } : undefined,
          rateType: marketerMargin.rateType ? { id: marketerMargin.rateType.id, label: marketerMargin.rateType.name } : undefined
        }
      : undefined;
  }, [marketerMargin]);

  const { formSchema, isFormEmpty, onChangeRate, onChangeRateType, onChangeMarginType } = useCreateEditMarketerMarginForm({
    onSubmitForm,
    initialValues
  });

  const { rates, setRateFilterName, rateFilterName } = useAutocompleteRateProvider((state) => ({
    rates: state.items,
    setRateFilterName: state.setFilterName,
    rateFilterName: state.filterName
  }));

  const { rateTypes, setRateTypeFilterName, rateTypeFilterName } = useAutocompleteRateTypesProvider((state) => ({
    rateTypes: state.items,
    setRateTypeFilterName: state.setFilterName,
    rateTypeFilterName: state.filterName
  }));

  const rateValue = useMemo(() => formSchema.values.rate || null, [formSchema.values.rate]);
  const rateTypeValue = useMemo(() => formSchema.values.rateType || null, [formSchema.values.rateType]);

  return (
    <Styled.FormWrapper>
      <Styled.Header>
        <h1>{t("marketer_margin:actions.edit")}</h1>
        <p>{t("common:editDescription")}</p>
      </Styled.Header>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <div>
            <h2>{t("marketer_margin:data")}</h2>
          </div>
          <Styled.Data>
            <Autocomplete
              label={t("marketer_margin:columns.rate")}
              disabled
              value={rateValue}
              options={rates}
              inputValue={rateFilterName}
              onInputChange={setRateFilterName}
              onChange={(value) => {
                const newValue: Option | undefined = (value as Option) ?? undefined;
                onChangeRate(newValue);
              }}
              hasError={!!formSchema.errors.rate}
              //eslint-disable-next-line @typescript-eslint/no-explicit-any
              errorMessage={(formSchema.errors.rate as any)?.id}
              required
            />
            <Selector
              disabled
              errorMessage={formSchema.errors.type}
              label={t("marketer_margin:columns.type")}
              name="type"
              options={marginOptions}
              value={formSchema.values.type}
              onChange={(newValue) => {
                onChangeMarginType(newValue as MarginType);
              }}
              required
            />
            {formSchema.values.type === MarginType.CONSUME_RANGE ? (
              <>
                <InputFormik label={t("marketer_margin:columns.minConsume")} id="minConsume" name="minConsume" type="number" required />
                <InputFormik label={t("marketer_margin:columns.maxConsume")} id="maxConsume" name="maxConsume" type="number" required />
              </>
            ) : null}
            {formSchema.values.type === MarginType.RATE_TYPE ? (
              <Autocomplete
                disabled
                label={t("marketer_margin:columns.rateType")}
                value={rateTypeValue}
                options={rateTypes}
                inputValue={rateTypeFilterName}
                onInputChange={setRateTypeFilterName}
                onChange={(value) => {
                  const newValue: Option | undefined = (value as Option) ?? undefined;
                  onChangeRateType(newValue);
                }}
                hasError={!!formSchema.errors.rateType}
                /* TODO: Check why rateType is an string when it should be an object */
                //eslint-disable-next-line @typescript-eslint/no-explicit-any
                errorMessage={(formSchema.errors.rateType as any)?.id}
                required
              />
            ) : null}

            <InputFormik label={t("marketer_margin:columns.minMargin")} id="minMargin" name="minMargin" type="number" required />
            <InputFormik label={t("marketer_margin:columns.maxMargin")} id="maxMargin" name="maxMargin" type="number" required />
          </Styled.Data>
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
