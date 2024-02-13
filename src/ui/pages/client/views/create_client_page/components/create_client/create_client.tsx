import SureModal from "@/src/ui/components/sure_modal/sure_modal";
import { Form, FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./create_client.styled";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import { InputFormik } from "@/src/ui/components/input/input";
import { clientTypeOptions, invoiceNotificationTypeOptions } from "@/src/ui/utils/selector_options";
import Selector from "@/src/ui/components/selector/selector";
import CreateClientButtons from "../create_client_buttons/create_client_buttons";
import type { EditClientModel } from "@/src/core/client/domain/models/edit_client_model";
import useCreateClientForm from "@/src/ui/pages/client/controllers/create_client_controller";
import Switch from "@/src/ui/components/switch/switch";
import { InvoiceNotificationType } from "@/src/core/app/enums/invoice_notification_type";
import CreateContactInline from "@/src/ui/pages/client/views/create_client_page/components/create_contact/create_contact_inline";

interface Props {
  onSubmitForm: (input: EditClientModel) => Promise<void>;
}

export default function CreateClient({ onSubmitForm }: Props) {
  const { t } = useTranslation(["client", "common"]);
  const { formSchema, isFormEmpty } = useCreateClientForm({
    onSubmitForm: onSubmitForm
  });
  const { showModal, onCancel, onClickCancel, onCloseModal } = useCancelButton({ condition: isFormEmpty });

  return (
    <>
      <Styled.Header>
        <h1>{t("client:formTitle")}</h1>
        <p>{t("client:formSubtitle")}</p>
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
              <Switch label={t("client:columns.isRenewable")} id="isRenewable" name="isRenewable" />
            </Styled.FormGrid>

            <Styled.FormGroupLabel>{t("client:form.titles.main_contact")}</Styled.FormGroupLabel>
            <CreateContactInline></CreateContactInline>
          </Styled.ClientData>

          <Styled.ButtonsWrapper>
            <CreateClientButtons isFormEmpty={isFormEmpty} onClickCancel={onClickCancel} />
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
    </>
  );
}
