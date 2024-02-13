import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import type { CreateRateTypeModel } from "@/src/core/rate_type/domain/models/create_rate_type_model";
import { useTranslation } from "react-i18next";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import RateTypeController from "@/src/ui/pages/rate_type/controllers/rate_type_controller";
import CreateEditRateTypeForm from "../../components/create_edit_rate_type_form/create_edit_rate_type_form";

export default function CreateRateTypePage() {
  const navigate = useNavigate();
  const { t } = useTranslation("rate_type");
  const { showToast } = useShowToast();

  const onCreateRateType = useCallback(
    async (input: CreateRateTypeModel) => {
      try {
        await RateTypeController.create(input);
        navigate(paths.rateType.index);
        showToast({ message: t("actions.added") });
      } catch (err) {
        console.error(err);
      }
    },
    [navigate, t, showToast]
  );

  return <CreateEditRateTypeForm onSubmitForm={onCreateRateType}></CreateEditRateTypeForm>;
}
