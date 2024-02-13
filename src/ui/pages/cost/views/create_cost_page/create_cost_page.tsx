import type { CreateCostModel } from "@/src/core/cost/domain/models/create_cost_model";
import CreateCostForm from "@/src/ui/pages/cost/views/create_cost_page/components/create_cost_form/create_cost_form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import useShowToast from "@/src/ui/hooks/useShowToast";
import { useTranslation } from "react-i18next";
import CostController from "../../controllers/cost_controller";
import { MARKETER_TABS_QUERY_PARAMS } from "@/src/ui/pages/marketer/views/detail_marketer_page/detail_marketer_page";
import { getTabResourcePath } from "@/src/ui/utils";

export default function CreateCostPage() {
  const { t } = useTranslation("cost");
  const navigate = useNavigate();
  const { showToast } = useShowToast();
  const [searchParams] = useSearchParams();
  const marketerId = useMemo(() => Number(searchParams.get("marketerId")), [searchParams]);

  const backUrl = getTabResourcePath(MARKETER_TABS_QUERY_PARAMS.COST, marketerId);

  const onCreateCost = useCallback(
    async (input: CreateCostModel) => {
      await CostController.create(input);
      showToast({ message: t("actions.added") });
      navigate(backUrl);
    },
    [navigate, t, showToast, backUrl]
  );

  return <CreateCostForm onSubmitForm={onCreateCost} backUrl={backUrl} />;
}
