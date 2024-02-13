/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./edit_client.styled";
import { InputFormik } from "@/src/ui/components/input/input";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useMutationClientProvider } from "../../../../provider/mutation_client.provider";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import paths from "@/src/ui/router/paths";
import { useCallback, useMemo } from "react";
import Selector from "@/src/ui/components/selector/selector";
import { clientTypeOptions, invoiceNotificationTypeOptions } from "@/src/ui/utils/selector_options";
import { InvoiceNotificationType } from "@/src/core/app/enums/invoice_notification_type";
import Switch from "@/src/ui/components/switch/switch";
import type { EditClientModel } from "@/src/core/client/domain/models/edit_client_model";
import useEditClientForm from "@/src/ui/pages/client/controllers/edit_client_controller";

interface Props {
  onSubmitForm: (input: EditClientModel) => Promise<void>;
}

export default function EditClient({ onSubmitForm }: Props) {
  const { t } = useTranslation(["client", "common"]);
  const navigate = useNavigate();
  const { clientId } = useParams();
  const getClientById = useMutationClientProvider((state) => state.getById);
  const client = useMutationClientProvider((state) => state.item);

  const initialValues = useMemo(() => {
    return client
      ? {
          ...client
        }
      : undefined;
  }, [client]);

  const { formSchema, isFormEmpty } = useEditClientForm({
    onSubmitForm,
    initialValues
  });

  const getClient = useCallback(async () => {
    if (clientId) {
      const id = Number(clientId);
      const response = await getClientById(id);
      if (!response) {
        navigate(paths.client.index);
      }
    }
  }, [getClientById, navigate, clientId]);

  useEffectRunOnce(() => {
    getClient();
  }, [getClient]);

  return (
    <>
      <Styled.Header>
        <h1>{t("client:actions.edit")}</h1>
        <p>{t("common:editDescription")}</p>
      </Styled.Header>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <Styled.ClientData>
            <Styled.FormGroupLabel>{t("client:form.titles.data")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <Selector
                label={t("client:columns.clientType")}
                options={clientTypeOptions}
                name="clientType"
                id="clientType"
                value={formSchema.values.clientType}
                onChange={(value) => {
                  formSchema.setFieldValue("clientType", value);
                }}
                required
              />

              <InputFormik name="alias" label={t("client:columns.alias")} id="alias" />
              <InputFormik name="fiscalName" label={t("client:columns.fiscalName")} id="fiscalName" />
              <InputFormik name="cif" label={t("client:columns.cif")} id="cif" />
            </Styled.FormGrid>

            <Styled.FormGroupLabel>{t("client:form.titles.notification")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <Selector
                label={t("client:columns.invoiceNotificationType")}
                options={invoiceNotificationTypeOptions}
                name="invoiceNotificationType"
                id="invoiceNotificationType"
                value={formSchema.values.invoiceNotificationType}
                onChange={(value) => {
                  formSchema.setFieldValue("invoiceNotificationType", value);
                }}
                required
              />

              <>
                <InputFormik
                  name="invoiceEmail"
                  label={t("client:columns.invoiceEmail")}
                  id="invoiceEmail"
                  disabled={formSchema.values.invoiceNotificationType === InvoiceNotificationType.POSTAL}
                />
                <InputFormik
                  name="invoicePostal"
                  label={t("client:columns.invoicePostal")}
                  id="invoicePostal"
                  disabled={formSchema.values.invoiceNotificationType === InvoiceNotificationType.EMAIL}
                />
              </>
            </Styled.FormGrid>

            <Styled.FormGroupLabel>{t("client:form.titles.invoicing")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <InputFormik name="bankAccountHolder" label={t("client:columns.bankAccountHolder")} id="bankAccountHolder" />
              <InputFormik name="bankAccountNumber" label={t("client:columns.bankAccountNumber")} id="bankAccountNumber" />
              <InputFormik name="fiscalAddress" label={t("client:columns.fiscalAddress")} id="fiscalAddress" />
            </Styled.FormGrid>

            <Styled.FormGroupLabel>{t("client:form.titles.others")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              <Switch
                label={t("client:columns.isRenewable")}
                id="isRenewable"
                name="isRenewable"
                checked={formSchema.values.isRenewable}
                onChange={(event) => formSchema.setFieldValue("isRenewable", event.target.checked)}
              />
            </Styled.FormGrid>
          </Styled.ClientData>

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
