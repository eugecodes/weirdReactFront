import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import useShowToast from "@/src/ui/hooks/useShowToast";
import { useTranslation } from "react-i18next";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import { Business } from "@/src/ui/assets/icons";
import { useMutationCommissionProvider } from "@/src/ui/pages/commission/provider/mutation_commission.provider";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import paths from "@/src/ui/router/paths";
import CommissionController from "../../controllers/commission_controller";
import type { CreateCommissionModel } from "@/src/core/commission/domain/models/create_commission_model";
import EditCommissionForm from "./components/edit_commission_form/edit_commission_form";
import { MARKETER_TABS_QUERY_PARAMS } from "@/src/ui/pages/marketer/views/detail_marketer_page/detail_marketer_page";
import { getTabResourcePath } from "@/src/ui/utils";

export default function EditCommissionPage() {
  const { t } = useTranslation(["common", "commission"]);
  const navigate = useNavigate();
  const { commissionId } = useParams();
  const commission = useMutationCommissionProvider((state) => state.item);
  const backUrl = getTabResourcePath(MARKETER_TABS_QUERY_PARAMS.COMMISSION, commission?.marketerId);
  const { showModal, onCloseModal, onCancel, cancelAction } = useCancelButton({ condition: true, onCancelUrl: backUrl });
  const getRateById = useMutationCommissionProvider((state) => state.getById);
  const { showToast } = useShowToast();

  const onEditCommission = useCallback(
    async (input: CreateCommissionModel) => {
      await CommissionController.edit(input, Number(commissionId));
      showToast({ message: t("commission:actions.edited") });
      navigate(-1);
    },
    [navigate, t, showToast, commissionId]
  );

  const getCommission = useCallback(async () => {
    if (commissionId) {
      const id = Number(commissionId);
      const response = await getRateById(id);
      if (!response) {
        navigate(paths.marketer.detail + commission?.marketerId);
      }
    }
  }, [getRateById, commissionId, navigate, commission?.marketerId]);

  useEffectRunOnce(() => {
    getCommission();
  }, [getCommission]);

  return (
    <>
      <DetailPageHeader
        Icon={Business}
        headerText={commission ? commission.name : ""}
        actions={cancelAction}
        showModal={showModal}
        modalPrimaryButtonText={t("common:keepEditing")}
        modalDescription={t("common:cancelDescription")}
        onSecondaryButtonClick={onCancel}
        onPrimaryButtonClick={onCloseModal}
      />
      <EditCommissionForm onSubmitForm={onEditCommission} commission={commission} />
    </>
  );
}
