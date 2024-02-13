import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import type { CreateEnergyCostModel } from "@/src/core/energy_cost/domain/models/create_energy_cost_model";
import CreateEnergyCost from "../../components/create_energy_type/create_energy_type";
import EnergyCostController from "../../controllers/energy_cost_controller";
import paths from "@/src/ui/router/paths";
import { useTranslation } from "react-i18next";
import useShowToast from "@/src/ui/hooks/useShowToast";

export default function CreateEnergyCostPage() {
  const navigate = useNavigate();
  const { t } = useTranslation("energy_cost");
  const { showToast } = useShowToast();

  const onCreateEnergyCost = useCallback(
    async (input: CreateEnergyCostModel) => {
      await EnergyCostController.create(input);
      navigate(paths.energyCost.index);
      showToast({ message: t("actions.added") });
    },
    [navigate, t, showToast]
  );

  return <CreateEnergyCost onSubmitForm={onCreateEnergyCost}></CreateEnergyCost>;
}
