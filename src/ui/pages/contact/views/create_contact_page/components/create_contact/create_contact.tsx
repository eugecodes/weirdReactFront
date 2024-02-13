import SureModal from "@/src/ui/components/sure_modal/sure_modal";
import { Form, FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./create_contact.styled";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import { InputFormik } from "@/src/ui/components/input/input";
import CreateContactButtons from "../create_contact_buttons/create_contact_buttons";
import type { CreateContactModel } from "@/src/core/contact/domain/models/create_contact_model";
import useCreateContactForm from "@/src/ui/pages/contact/controllers/create_edit_contact_controller";
import Switch from "@/src/ui/components/switch/switch";

interface Props {
  onSubmitForm: (input: CreateContactModel) => Promise<void>;
}

export default function CreateContact({ onSubmitForm }: Props) {
  const { t } = useTranslation(["contact", "common"]);
  const { formSchema, isFormEmpty } = useCreateContactForm({
    onSubmitForm: onSubmitForm
  });
  const { showModal, onCancel, onClickCancel, onCloseModal } = useCancelButton({ condition: isFormEmpty });

  return (
    <>
      <Styled.Header>
        <h1>{t("contact:formTitle")}</h1>
        <p>{t("contact:formSubtitle")}</p>
      </Styled.Header>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <Styled.ContactData>
            <Styled.FormGrid>
              <InputFormik name="name" label={t("contact:columns.name")} id="name" />
              <InputFormik name="email" label={t("contact:columns.email")} id="email" />
              <InputFormik name="phone" label={t("contact:columns.phone")} id="phone" />
              <Switch
                label={t("contact:columns.isMainContact")}
                id="isMainContact"
                name="isMainContact"
                checked={formSchema.values.isMainContact}
                onChange={(event) => formSchema.setFieldValue("isMainContact", event.target.checked)}
              />
            </Styled.FormGrid>
          </Styled.ContactData>

          <Styled.ButtonsWrapper>
            <CreateContactButtons isFormEmpty={isFormEmpty} onClickCancel={onClickCancel} />
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
