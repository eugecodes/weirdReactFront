import { useTranslation } from "react-i18next";
import { useMutationClientProvider } from "../../provider/mutation_client.provider";
import EditClient from "./components/create_client/edit_client";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import { BarChart } from "@/src/ui/assets/icons";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import { useCallback } from "react";
import type { EditClientModel } from "@/src/core/client/domain/models/edit_client_model";
import useShowToast from "@/src/ui/hooks/useShowToast";
import ClientController from "@/src/ui/pages/client/controllers/client_controller";
import { useNavigate, useParams } from "react-router-dom";

export default function EditClientPage() {
  const { t } = useTranslation(["client", "common"]);
  const navigate = useNavigate();
  const { showModal, onCloseModal, onCancel, cancelAction } = useCancelButton({ condition: true });
  const client = useMutationClientProvider((state) => state.item);
  const { clientId } = useParams();
  const { showToast } = useShowToast();

  const onEditClient = useCallback(
    async (input: EditClientModel) => {
      await ClientController.edit(input, Number(clientId));
      showToast({ message: t("client:actions.edited") });
      navigate(-1);
    },
    [navigate, t, showToast, clientId]
  );

  return (
    <>
      <DetailPageHeader
        Icon={BarChart}
        headerText={client?.cif || ""}
        actions={cancelAction}
        showModal={showModal}
        modalPrimaryButtonText={t("common:keepEditing")}
        modalDescription={t("common:cancelDescription")}
        onSecondaryButtonClick={onCancel}
        onPrimaryButtonClick={onCloseModal}
      />
      <EditClient onSubmitForm={onEditClient} />
    </>
  );
}
