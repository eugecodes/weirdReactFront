import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CreateSupplyPoint from "@/src/ui/pages/supply_point/views/create_supply_point_page/components/create_supply_point/create_supply_point";
import SupplyPointController from "@/src/ui/pages/supply_point/controllers/supply_point_controller";
import useShowToast from "@/src/ui/hooks/useShowToast";
import type { EditSupplyPointModel } from "@/src/core/supply_point/domain/models/edit_supply_point_model";
import type { CreateSupplyPointModel } from "@/src/core/supply_point/domain/models/create_supply_point_model";

export default function CreateSupplyPointPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(["supply_point"]);
  const { showToast } = useShowToast();

  const onCreateSupplyPoint = useCallback(
    async (input: EditSupplyPointModel) => {
      await SupplyPointController.create(input as CreateSupplyPointModel);
      showToast({ message: t("supply_point:actions.added") });
      navigate(-1);
    },
    [navigate, t, showToast]
  );

  return <CreateSupplyPoint onSubmitForm={onCreateSupplyPoint} />;
}
