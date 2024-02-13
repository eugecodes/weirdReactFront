import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import EditSupplyPoint from "@/src/ui/pages/supply_point/views/edit_supply_point_page/components/edit_supply_point/edit_supply_point";
import SupplyPointController from "@/src/ui/pages/supply_point/controllers/supply_point_controller";
import useShowToast from "@/src/ui/hooks/useShowToast";
import type { EditSupplyPointModel } from "@/src/core/supply_point/domain/models/edit_supply_point_model";
import Styled from "@/src/ui/pages/supply_point/views/detail_supply_point_page/detail_supply_point_page.styled";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import { BarChart } from "@/src/ui/assets/icons";
import paths from "@/src/ui/router/paths";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import { useMutationSupplyPointProvider } from "@/src/ui/pages/supply_point/provider/mutation_supply_point.provider";

export default function EditSupplyPointPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(["supply_point"]);
  const { supplyPointId } = useParams();
  const { showToast } = useShowToast();
  const [showModal, setShowModal] = useState(false);
  const [modalData] = useState<ModalData>();
  const onCloseModal = useCallback(() => setShowModal(false), []);
  const supply_point = useMutationSupplyPointProvider((state) => state.item);

  const onEditSupplyPoint = useCallback(
    async (input: EditSupplyPointModel) => {
      await SupplyPointController.edit(input, Number(supplyPointId));
      showToast({ message: t("supply_point:actions.edited") });
      navigate(-1);
    },
    [navigate, t, showToast, supplyPointId]
  );

  return (
    <Styled.Page>
      <DetailPageHeader
        Icon={BarChart}
        showBreadcrumbs
        resourcePath={paths.supplyPoint.index}
        resourceName={t("supply_point:supply_points")}
        headerText={supply_point ? supply_point.cups : ""}
        creationInformation={supply_point ? supply_point.creationData() : undefined}
        showModal={showModal}
        onCloseModal={onCloseModal}
        modalPrimaryButtonText={modalData?.primaryModalButtonText}
        modalDescription={modalData?.description}
        onPrimaryButtonClick={modalData?.onClickPrimaryButton}
      />
      <EditSupplyPoint onSubmitForm={onEditSupplyPoint} />
    </Styled.Page>
  );
}
