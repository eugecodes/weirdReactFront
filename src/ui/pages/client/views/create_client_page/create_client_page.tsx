import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import paths from "@/src/ui/router/paths";
import CreateClient from "@/src/ui/pages/client/views/create_client_page/components/create_client/create_client";
import ClientController from "@/src/ui/pages/client/controllers/client_controller";
import useShowToast from "@/src/ui/hooks/useShowToast";
import type { EditClientModel } from "@/src/core/client/domain/models/edit_client_model";
import type { CreateClientModel } from "@/src/core/client/domain/models/create_client_model";

export default function CreateClientPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(["client"]);
  const { showToast } = useShowToast();

  const onCreateClient = useCallback(
    async (input: EditClientModel) => {
      await ClientController.create(input as CreateClientModel);
      navigate(paths.client.index);
      showToast({ message: t("client:actions.added") });
    },
    [navigate, t, showToast]
  );

  return <CreateClient onSubmitForm={onCreateClient} />;
}
