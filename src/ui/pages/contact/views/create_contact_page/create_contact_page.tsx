import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import paths from "@/src/ui/router/paths";
import CreateContact from "@/src/ui/pages/contact/views/create_contact_page/components/create_contact/create_contact";
import ContactController from "@/src/ui/pages/contact/controllers/contact_controller";
import useShowToast from "@/src/ui/hooks/useShowToast";
import type { CreateContactModel } from "@/src/core/contact/domain/models/create_contact_model";

export default function CreateContactPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(["contact", "common"]);
  const { showToast } = useShowToast();
  const [searchParams] = useSearchParams();
  const clientId = useMemo(() => Number(searchParams.get("clientId")), [searchParams]);

  const onCreateContact = useCallback(
    async (input: CreateContactModel) => {
      input.clientId = clientId;
      await ContactController.create(input as CreateContactModel);
      navigate(paths.client.index + paths.client.detail + clientId);
      showToast({ message: t("contact:actions.added") });
    },
    [navigate, t, showToast, clientId]
  );

  return <CreateContact onSubmitForm={onCreateContact} />;
}
