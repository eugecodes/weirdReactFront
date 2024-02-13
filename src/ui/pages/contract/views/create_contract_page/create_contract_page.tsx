import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CreateContract from "@/src/ui/pages/contract/views/create_contract_page/components/create_contract/create_contract";
import ContractController from "@/src/ui/pages/contract/controllers/contract_controller";
import useShowToast from "@/src/ui/hooks/useShowToast";
import type { CreateContractModel } from "@/src/core/contract/domain/models/create_contract_model";

export default function CreateContractPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(["contract"]);
  const { showToast } = useShowToast();

  const onCreateContract = useCallback(
    async (input: CreateContractModel) => {
      await ContractController.create(input as CreateContractModel);
      showToast({ message: t("contract:actions.added") });
      navigate(-1);
    },
    [navigate, t, showToast]
  );

  return <CreateContract onSubmitForm={onCreateContract} />;
}
