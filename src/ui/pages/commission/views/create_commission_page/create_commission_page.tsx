import type { CreateCommissionModel } from "@/src/core/commission/domain/models/create_commission_model";
import CreateCommissionForm from "@/src/ui/pages/commission/views/create_commission_page/components/create_commission_form/create_commission_form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import useShowToast from "@/src/ui/hooks/useShowToast";
import { useTranslation } from "react-i18next";
import CommissionController from "../../controllers/commission_controller";
import { MARKETER_TABS_QUERY_PARAMS } from "@/src/ui/pages/marketer/views/detail_marketer_page/detail_marketer_page";
import { getTabResourcePath } from "@/src/ui/utils";

export default function CreateCommissionPage() {
  const { t } = useTranslation("commission");
  const navigate = useNavigate();
  const { showToast } = useShowToast();
  const [searchParams] = useSearchParams();
  const marketerId = useMemo(() => Number(searchParams.get("marketerId")), [searchParams]);
  const backUrl = getTabResourcePath(MARKETER_TABS_QUERY_PARAMS.COMMISSION, marketerId);

  const onCreateCommission = useCallback(
    async (input: CreateCommissionModel) => {
      await CommissionController.create(input);
      showToast({ message: t("actions.added") });
      navigate(backUrl);
    },
    [navigate, t, showToast, backUrl]
  );

  return <CreateCommissionForm onSubmitForm={onCreateCommission} backUrl={backUrl} />;
}
