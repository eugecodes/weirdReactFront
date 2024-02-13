import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import useShowToast from "@/src/ui/hooks/useShowToast";
import { useTranslation } from "react-i18next";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import { Business } from "@/src/ui/assets/icons";
import { useMutationCostProvider } from "@/src/ui/pages/cost/provider/mutation_cost.provider";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import paths from "@/src/ui/router/paths";
import CostController from "../../controllers/cost_controller";
import type { CreateCostModel } from "@/src/core/cost/domain/models/create_cost_model";
import EditCostForm from "./components/edit_cost_form/edit_cost_form";
import { MARKETER_TABS_QUERY_PARAMS } from "@/src/ui/pages/marketer/views/detail_marketer_page/detail_marketer_page";
import { getTabResourcePath } from "@/src/ui/utils";

export default function EditCostPage() {
  const { t } = useTranslation(["common", "cost"]);
  const navigate = useNavigate();
  const { costId } = useParams();
  const cost = useMutationCostProvider((state) => state.item);
  const backUrl = getTabResourcePath(MARKETER_TABS_QUERY_PARAMS.COST, cost?.marketerId);

  const { showModal, onCloseModal, onCancel, cancelAction } = useCancelButton({
    condition: true,
    onCancelUrl: backUrl
  });

  const getRateById = useMutationCostProvider((state) => state.getById);
  const { showToast } = useShowToast();

  const onEditCost = useCallback(
    async (input: CreateCostModel) => {
      await CostController.edit(input, Number(costId));
      showToast({ message: t("cost:actions.edited") });
      navigate(backUrl);
    },
    [navigate, t, showToast, costId, backUrl]
  );

  const getCost = useCallback(async () => {
    if (costId) {
      const id = Number(costId);
      const response = await getRateById(id);
      if (!response) {
        navigate(paths.marketer.detail + cost?.marketerId);
      }
    }
  }, [getRateById, costId, navigate, cost?.marketerId]);

  useEffectRunOnce(() => {
    getCost();
  }, [getCost]);

  return (
    <>
      <DetailPageHeader
        Icon={Business}
        headerText={cost ? cost.name : ""}
        actions={cancelAction}
        showModal={showModal}
        modalPrimaryButtonText={t("common:keepEditing")}
        modalDescription={t("common:cancelDescription")}
        onSecondaryButtonClick={onCancel}
        onPrimaryButtonClick={onCloseModal}
      />
      <EditCostForm onSubmitForm={onEditCost} cost={cost}></EditCostForm>
    </>
  );
}
