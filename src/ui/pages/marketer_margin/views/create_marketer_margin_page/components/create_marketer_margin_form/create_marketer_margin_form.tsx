import type { CreateMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/create_marketer_margin_model";
import SureModal from "@/src/ui/components/sure_modal/sure_modal";
import { Button } from "@mui/material";
import { Form } from "formik";
import { FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./create_marketer_margin_form.styled";
import useCreateEditMarketerMarginForm from "@/src/ui/pages/marketer_margin/controllers/create_edit_marketer_margin_controller";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import Selector from "@/src/ui/components/selector/selector";
import { InputFormik } from "@/src/ui/components/input/input";
import { marginOptions } from "@/src/ui/utils/selector_options";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import { MarginType } from "@/src/core/app/enums/margin_type";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import type { Option } from "@/src/common/utils/types";

interface Props {
  onSubmitForm: (input: CreateMarketerMarginModel) => Promise<void>;
  backUrl?: string;
}

export default function CreateMarketerMarginForm({ onSubmitForm, backUrl }: Props) {
  const { t } = useTranslation(["marketer_margin", "common"]);
  const { formSchema, isFormEmpty, onChangeRate, onChangeRateType, onChangeMarginType } = useCreateEditMarketerMarginForm({
    onSubmitForm,
    initialValues: undefined
  });
  const { showModal, onCancel, onClickCancel, onCloseModal } = useCancelButton({ condition: isFormEmpty, onCancelUrl: backUrl });

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

  return (
    <Styled.FormWrapper>
      <h1>{t("marketer_margin:formTitle")}</h1>
      <p>{t("marketer_margin:formSubtitle")}</p>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <Autocomplete
            label={t("marketer_margin:columns.rate")}
            options={rates}
            onInputChange={setRateFilterName}
            inputValue={rateFilterName}
            onChange={(value) => {
              const newValue: Option | undefined = (value as Option) ?? undefined;
              onChangeRate(newValue);
            }}
            value={formSchema.values.rate}
            hasError={!!formSchema.errors.rate}
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            errorMessage={(formSchema.errors.rate as any)?.id}
            required
          />
          <Selector
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
              label={t("marketer_margin:columns.rateType")}
              options={rateTypes}
              inputValue={rateTypeFilterName}
              onInputChange={setRateTypeFilterName}
              onChange={(value) => {
                const newValue: Option | undefined = (value as Option) ?? undefined;
                onChangeRateType(newValue);
              }}
              value={formSchema.values.rateType}
              hasError={!!formSchema.errors.rateType}
              /* TODO: Check why rateType is an string when it should be an object */
              //eslint-disable-next-line @typescript-eslint/no-explicit-any
              errorMessage={(formSchema.errors.rateType as any)?.id}
              required
            />
          ) : null}

          <InputFormik label={t("marketer_margin:columns.minMargin")} id="minMargin" name="minMargin" type="number" required />
          <InputFormik label={t("marketer_margin:columns.maxMargin")} id="maxMargin" name="maxMargin" type="number" required />

          <Styled.ButtonsWrapper>
            <Button type="submit" variant="contained" disabled={isFormEmpty}>
              {t("marketer_margin:actions.save")}
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
          description={t("marketer_margin:sure.cancelCreate")}
          secondaryButtonText={t("common:actions.cancelChanges")}
          onSecondaryButtonClick={onCancel}
          onPrimaryButtonClick={onCloseModal}
        />
      )}
    </Styled.FormWrapper>
  );
}
