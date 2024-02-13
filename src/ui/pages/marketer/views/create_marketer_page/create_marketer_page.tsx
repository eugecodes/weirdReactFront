import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import type { CreateMarketerModel } from "@/src/core/marketer/domain/models/create_marketer_model";
import CreateMarketer from "@/src/ui/pages/marketer/views/create_marketer_page/components/create_marketer/create_marketer";
import paths from "@/src/ui/router/paths";
import { useTranslation } from "react-i18next";
import useShowToast from "@/src/ui/hooks/useShowToast";
import MarketerController from "@/src/ui/pages/marketer/controllers/marketer_controller";
import type { EditMarketerModel } from "@/src/core/marketer/domain/models/edit_marketer_model";

export default function CreateMarketerPage() {
  const navigate = useNavigate();
  const { t } = useTranslation("marketer");
  const { showToast } = useShowToast();

  const onCreateMarketer = useCallback(
    async (input: EditMarketerModel) => {
      await MarketerController.create(input as CreateMarketerModel);
      navigate(paths.marketer.index);
      showToast({ message: t("actions.added") });
    },
    [navigate, t, showToast]
  );

  return <CreateMarketer onSubmitForm={onCreateMarketer} />;
}
