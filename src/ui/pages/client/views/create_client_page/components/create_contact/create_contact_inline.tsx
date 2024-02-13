import { useTranslation } from "react-i18next";
import Styled from "./create_contact_inline.styled";
import { InputFormik } from "@/src/ui/components/input/input";

export default function CreateContactInline() {
  const { t } = useTranslation(["client", "common"]);

  return (
    <>
      <Styled.FormGrid>
        <InputFormik name="mainContact.name" label={t("client:contact.name")} id="mainContact.name" />
        <InputFormik name="mainContact.email" label={t("client:contact.email")} id="mainContact.email" />
        <InputFormik name="mainContact.phone" label={t("client:contact.phone")} id="mainContact.phone" />
      </Styled.FormGrid>
    </>
  );
}
