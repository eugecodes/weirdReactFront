import type { CreateRateModel } from "@/src/core/rate/domain/models/create_rate_model";
import CreateRateForm from "@/src/ui/pages/rate/views/create_rate_page/components/create_rate_form/create_rate_form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import useShowToast from "@/src/ui/hooks/useShowToast";
import { useTranslation } from "react-i18next";
import { MARKETER_TABS_QUERY_PARAMS } from "@/src/ui/pages/marketer/views/detail_marketer_page/detail_marketer_page";
import RateController from "@/src/ui/pages/rate/controllers/rate_controller";
import paths from "@/src/ui/router/paths";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";

export default function CreateRatePage() {
  const { t } = useTranslation("rate");
  const navigate = useNavigate();
  const { showToast } = useShowToast();
  const [searchParams] = useSearchParams();
  const marketerId = useMemo(() => Number(searchParams.get("marketerId")), [searchParams]);
  const energyType = useMemo(() => searchParams.get("energyType"), [searchParams]);
  const backUrl =
    paths.marketer.index +
    paths.marketer.detail +
    marketerId +
    `?tab=${energyType === EnergyTypes.GAS ? MARKETER_TABS_QUERY_PARAMS.RATE_GAS : MARKETER_TABS_QUERY_PARAMS.RATE_LIGHT}`;

  const onCreateRate = useCallback(
    async (input: CreateRateModel) => {
      await RateController.create(input);
      showToast({ message: t("actions.added") });
      navigate(-1);
    },
    [navigate, t, showToast]
  );

  return <CreateRateForm onSubmitForm={onCreateRate} backUrl={marketerId ? backUrl : undefined} />;
}
