/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./edit_contact.styled";
import type { CreateContactModel } from "@/src/core/contact/domain/models/create_contact_model";
import useCreateContactForm from "../../../../controllers/create_edit_contact_controller";
import { InputFormik } from "@/src/ui/components/input/input";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useShowToast from "@/src/ui/hooks/useShowToast";
import { useMutationContactProvider } from "../../../../provider/mutation_contact.provider";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import paths from "@/src/ui/router/paths";
import { useCallback, useMemo } from "react";
import Switch from "@/src/ui/components/switch/switch";

const useEditContactInitialValues = () => {
  const contact = useMutationContactProvider((state) => state.item);
  return useMemo(() => {
    if (!contact) return undefined;

    return {
      ...contact
    };
  }, [contact]);
};

export default function EditContact() {
  const { contactId } = useParams();
  const ediContact = useMutationContactProvider((state) => state.edit);
  const getContactById = useMutationContactProvider((state) => state.getById);
  const contact = useMutationContactProvider((state) => state.item);
  const { showToast } = useShowToast();
  const navigate = useNavigate();
  const { t } = useTranslation(["contact", "common"]);
  const initialValues = useEditContactInitialValues();

  const onSubmitForm = async (input: CreateContactModel) => {
    if (!contact) throw new Error("Contact it's null");
    await ediContact(input, Number(contactId));
    navigate(-1);
    showToast({ message: t("contact:actions.edited") });
  };

  const { formSchema, isFormEmpty } = useCreateContactForm({
    onSubmitForm,
    enableReinitialize: true,
    initialValues,
    id: Number(contactId)
  });

  const getContact = useCallback(async () => {
    if (contactId) {
      const id = Number(contactId);
      const response = await getContactById(id);
      if (!response) {
        navigate(paths.contact.index);
      }
    }
  }, [getContactById, navigate, contactId]);

  useEffectRunOnce(() => {
    getContact();
  }, [getContact]);

  return (
    <>
      <Styled.Header>
        <h1>{t("contact:actions.edit")}</h1>
        <p>{t("common:editDescription")}</p>
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

          <Styled.Button>
            <Button variant="contained" disabled={isFormEmpty} type="submit">
              {t("common:actions.save")}
            </Button>
          </Styled.Button>
        </Form>
      </FormikProvider>
    </>
  );
}
