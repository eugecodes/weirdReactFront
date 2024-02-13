import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import useShowToast from "@/src/ui/hooks/useShowToast";
import { useTranslation } from "react-i18next";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import { Business } from "@/src/ui/assets/icons";
import { useMutationMarketerMarginProvider } from "@/src/ui/pages/marketer_margin/provider/mutation_marketer_margin.provider";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import paths from "@/src/ui/router/paths";
import MarketerMarginController from "../../controllers/marketer_margin_controller";
import type { CreateMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/create_marketer_margin_model";
import EditMarketerMarginForm from "./components/edit_marketer_margin_form/edit_marketer_margin_form";
import { MARKETER_TABS_QUERY_PARAMS } from "@/src/ui/pages/marketer/views/detail_marketer_page/detail_marketer_page";
import { getTabResourcePath } from "@/src/ui/utils";

export default function EditMarketerMarginPage() {
  const { t } = useTranslation(["common", "marketer_margin"]);
  const navigate = useNavigate();
  const { marketerMarginId } = useParams();
  const marketerMargin = useMutationMarketerMarginProvider((state) => state.item);
  const backUrl = getTabResourcePath(MARKETER_TABS_QUERY_PARAMS.MARGIN, marketerMargin?.marketerId);
  const { showModal, onCloseModal, onCancel, cancelAction } = useCancelButton({ condition: true, onCancelUrl: backUrl });
  const getRateById = useMutationMarketerMarginProvider((state) => state.getById);
  const { showToast } = useShowToast();

  const onEditMarketerMargin = useCallback(
    async (input: CreateMarketerMarginModel) => {
      await MarketerMarginController.edit(input, Number(marketerMarginId));
      showToast({ message: t("marketer_margin:actions.edited") });
      navigate(-1);
    },
    [navigate, t, showToast, marketerMarginId]
  );

  const getMarketerMargin = useCallback(async () => {
    if (marketerMarginId) {
      const id = Number(marketerMarginId);
      const response = await getRateById(id);
      if (!response) {
        navigate(paths.marketer.detail + marketerMargin?.marketerId);
      }
    }
  }, [getRateById, marketerMarginId, navigate, marketerMargin?.marketerId]);

  useEffectRunOnce(() => {
    getMarketerMargin();
  }, [getMarketerMargin]);

  return (
    <>
      <DetailPageHeader
        Icon={Business}
        headerText={marketerMargin?.rate?.name ? marketerMargin.rate.name : ""}
        actions={cancelAction}
        showModal={showModal}
        modalPrimaryButtonText={t("common:keepEditing")}
        modalDescription={t("common:cancelDescription")}
        onSecondaryButtonClick={onCancel}
        onPrimaryButtonClick={onCloseModal}
      />
      <EditMarketerMarginForm onSubmitForm={onEditMarketerMargin} marketerMargin={marketerMargin}></EditMarketerMarginForm>
    </>
  );
}
