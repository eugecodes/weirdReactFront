import type { CreateCommissionModel } from "@/src/core/commission/domain/models/create_commission_model";
import { Button } from "@mui/material";
import { Form } from "formik";
import { FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./edit_commission_form.styled";
import useCreateEditCommissionForm from "@/src/ui/pages/commission/controllers/create_edit_commission_controller";
import { PriceType } from "@/src/core/app/enums/price_type";
import type { Option, Optional } from "@/src/common/utils/types";
import type { DetailCommissionModel } from "@/src/core/commission/domain/models/detail_commission_model";
import { useMemo } from "react";
import EditCoreCommissionForm from "../edit_core_commission_form/edit_core_commission_form";
import FixedBasedCommissionForm from "../../../components/fixed_based_commission_form/fixed_based_commission_form";
import FixedFixedCommissionForm from "../edit_fixed_fixed_commission_form/edit_fixed_fixed_commission_form";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import ErrorMessage from "@/src/ui/components/error_message/error_message";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";

interface Props {
  onSubmitForm: (input: CreateCommissionModel) => Promise<void>;
  commission: Optional<DetailCommissionModel>;
}

export default function EditCommissionForm({ onSubmitForm, commission }: Props) {
  const { t } = useTranslation(["commission", "common"]);

  const initialValues = useMemo(() => {
    return commission
      ? {
          ...commission,
          rateType: commission.rateType ? { label: commission.rateType.name, id: commission.rateType.id } : undefined,
          rates: commission.rates.map((rate) => ({ id: rate.id, label: rate.name }))
        }
      : undefined;
  }, [commission]);

  const { formSchema, isFormEmpty, onChangeRate, rates, rateTypes } = useCreateEditCommissionForm({
    onSubmitForm,
    initialValues
  });

  const { setRateFilterName } = useAutocompleteRateProvider((state) => ({
    setRateFilterName: state.setFilterName
  }));

  return (
    <Styled.FormWrapper>
      <Styled.Header>
        <h1>{t("commission:actions.edit")}</h1>
        <p>{t("common:editDescription")}</p>
      </Styled.Header>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <div>
            <h2>{t("commission:data")}</h2>
          </div>
          <Styled.Data>
            <EditCoreCommissionForm values={{ priceType: formSchema.values.priceType, energyType: formSchema.values.energyType }} />
            {formSchema.values.priceType === PriceType.FIXED_FIXED && (
              <FixedFixedCommissionForm
                rateTypeSegmentation={formSchema.values.rateTypeSegmentation}
                rangeType={formSchema.values.rangeType}
                rateType={formSchema.values.rateType}
                rateTypeOptions={rateTypes}
                errors={formSchema.errors}
              />
            )}

            <FixedBasedCommissionForm priceType={formSchema.values.priceType} />

            <div>
              <Autocomplete
                multiple
                label={t("commission:columns.rates")}
                value={formSchema.values.rates}
                options={rates}
                onInputChange={setRateFilterName}
                onChange={(value) => {
                  const newValue: Option[] | undefined = (value as Option[]) ?? undefined;
                  onChangeRate(newValue);
                }}
                required
              />
              {formSchema.errors.rates ? (
                <ErrorMessage>
                  {Array.isArray(formSchema.errors.rates) ? (
                    <div>
                      {formSchema.errors.rates.map((error) => (
                        <p key={error as string}>{error as string}</p>
                      ))}
                    </div>
                  ) : (
                    <p>{formSchema.errors.rates}</p>
                  )}
                </ErrorMessage>
              ) : null}
            </div>
          </Styled.Data>
          <Styled.Button>
            <Button type="submit" variant="contained" disabled={isFormEmpty}>
              {t("commission:actions.edit")}
            </Button>
          </Styled.Button>
        </Form>
      </FormikProvider>
    </Styled.FormWrapper>
  );
}
