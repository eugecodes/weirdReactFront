import { Form, FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./edit_supply_point.styled";
import { InputFormik } from "@/src/ui/components/input/input";
import { counterTypeOptions, energyTypeOptions, ownerTypeOptions } from "@/src/ui/utils/selector_options";
import Selector from "@/src/ui/components/selector/selector";
import Switch from "@/src/ui/components/switch/switch";
import type { EditSupplyPointModel } from "@/src/core/supply_point/domain/models/edit_supply_point_model";
import { Button } from "@mui/material";
import { useCallback, useMemo } from "react";
import paths from "@/src/ui/router/paths";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { useMutationSupplyPointProvider } from "@/src/ui/pages/supply_point/provider/mutation_supply_point.provider";
import { useNavigate, useParams } from "react-router-dom";
import useCreateEditSupplyPointForm from "@/src/ui/pages/supply_point/controllers/create_edit_supply_point_controller";

interface Props {
  onSubmitForm: (input: EditSupplyPointModel) => Promise<void>;
}

export default function EditSupplyPoint({ onSubmitForm }: Props) {
  const { t } = useTranslation(["supply_point", "common"]);
  const navigate = useNavigate();
  const { supplyPointId } = useParams();
  const getSupplyPointById = useMutationSupplyPointProvider((state) => state.getById);
  const supply_point = useMutationSupplyPointProvider((state) => state.item);

  const initialValues = useMemo(() => {
    return supply_point
      ? {
          ...supply_point,
          client: undefined
        }
      : undefined;
  }, [supply_point]);

  const { formSchema, isFormEmpty } = useCreateEditSupplyPointForm({
    onSubmitForm,
    initialValues
  });

  const getSupplyPoint = useCallback(async () => {
    if (supplyPointId) {
      const id = Number(supplyPointId);
      const response = await getSupplyPointById(id);
      if (!response) {
        navigate(paths.client.index);
      }
    }
  }, [getSupplyPointById, navigate, supplyPointId]);

  useEffectRunOnce(() => {
    getSupplyPoint();
  }, [getSupplyPoint]);

  return (
    <>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <Styled.SupplyPointData>
            <Styled.FormGroupLabel>{t("supply_point:form.titles.data")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <Selector
                label={t("supply_point:columns.energyType")}
                options={energyTypeOptions}
                name="energyType"
                id="energyType"
                value={supply_point?.energyType}
                onChange={(value) => {
                  formSchema.setFieldValue("energyType", value);
                }}
                required
              />

              <InputFormik name="alias" label={t("supply_point:columns.alias")} id="alias" value={supply_point?.alias} />
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
              <Switch
                label={t("supply_point:columns.isRenewable")}
                id="isRenewable"
                name="isRenewable"
                checked={formSchema.values.isRenewable}
                onChange={(event) => formSchema.setFieldValue("isRenewable", event.target.checked)}
              />
            </Styled.FormGrid>

            <Styled.FormGroupLabel>{t("supply_point:form.titles.counter")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <Selector
                label={t("supply_point:columns.counterType")}
                options={counterTypeOptions}
                name="counterType"
                id="counterType"
                value={supply_point?.counterType}
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
                value={supply_point?.counterProperty}
                onChange={(value) => {
                  formSchema.setFieldValue("counterProperty", value);
                }}
                required
              />
              <InputFormik name="counterPrice" label={t("supply_point:columns.counterPrice")} id="counterPrice" />
            </Styled.FormGrid>
          </Styled.SupplyPointData>

          <Styled.Button>
            <Button type="submit" variant="contained" disabled={isFormEmpty}>
              {t("common:actions.save")}
            </Button>
          </Styled.Button>
        </Form>
      </FormikProvider>
    </>
  );
}
