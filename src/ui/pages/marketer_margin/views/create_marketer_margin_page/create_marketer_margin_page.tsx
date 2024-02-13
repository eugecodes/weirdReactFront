import type { CreateMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/create_marketer_margin_model";
import CreateMarketerMarginForm from "@/src/ui/pages/marketer_margin/views/create_marketer_margin_page/components/create_marketer_margin_form/create_marketer_margin_form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import useShowToast from "@/src/ui/hooks/useShowToast";
import { useTranslation } from "react-i18next";
import MarketerMarginController from "@/src/ui/pages/marketer_margin/controllers/marketer_margin_controller";
import { MARKETER_TABS_QUERY_PARAMS } from "@/src/ui/pages/marketer/views/detail_marketer_page/detail_marketer_page";
import { getTabResourcePath } from "@/src/ui/utils";

export default function CreateMarketerMarginPage() {
  const { t } = useTranslation("marketer_margin");
  const navigate = useNavigate();
  const { showToast } = useShowToast();
  const [searchParams] = useSearchParams();
  const marketerId = useMemo(() => Number(searchParams.get("marketerId")), [searchParams]);
  const backUrl = getTabResourcePath(MARKETER_TABS_QUERY_PARAMS.MARGIN, marketerId);

  const onCreateMarketerMargin = useCallback(
    async (input: CreateMarketerMarginModel) => {
      await MarketerMarginController.create(input);
      showToast({ message: t("actions.added") });
      navigate(-1);
    },
    [navigate, t, showToast]
  );

  return <CreateMarketerMarginForm onSubmitForm={onCreateMarketerMargin} backUrl={backUrl} />;
}
