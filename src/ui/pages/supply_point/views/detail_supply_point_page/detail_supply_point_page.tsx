import { BarChart, Delete } from "@/src/ui/assets/icons";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import SupplyPointController from "@/src/ui/pages/supply_point/controllers/supply_point_controller";
import { useMutationSupplyPointProvider } from "@/src/ui/pages/supply_point/provider/mutation_supply_point.provider";
import Styled from "./detail_supply_point_page.styled";
import type { Id } from "@/src/common/utils/types";
import Tabs from "@/src/ui/components/tabs/tabs";
import DetailSupplyPoint from "@/src/ui/pages/supply_point/views/detail_supply_point_page/components/detail_supply_point/tabs/detail_supply_point/detail_supply_point";

enum SUPPLY_POINT_CLIENT_TABS {
  DETAIL_CLIENT
}

export enum SUPPLY_POINT_TABS_QUERY_PARAMS {
  DETAIL_CLIENT = ""
}

export default function DetailSupplyPointPage() {
  const { t } = useTranslation(["supply_point", "common"]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const navigate = useNavigate();
  const { showToast } = useShowToast();
  const getSupplyPointById = useMutationSupplyPointProvider((state) => state.getById);
  const supply_point = useMutationSupplyPointProvider((state) => state.item);
  const { supplyPointId } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchParams] = useSearchParams();

  const onCloseModal = useCallback(() => setShowModal(false), []);

  useEffectRunOnce(() => {
    switch (searchParams.get("tab")) {
      default:
        setSelectedTab(SUPPLY_POINT_CLIENT_TABS.DETAIL_CLIENT);
    }
  }, [searchParams]);

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  }, []);

  const getSupplyPoint = useCallback(async () => {
    if (supplyPointId) {
      const id = Number(supplyPointId);
      const response = await getSupplyPointById(id);
      if (!response) {
        navigate(paths.supplyPoint.index);
      }
    }
  }, [getSupplyPointById, supplyPointId, navigate]);

  useEffectRunOnce(() => {
    getSupplyPoint();
  }, [getSupplyPoint]);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("supply_point:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await SupplyPointController.delete(id);
          onCloseModal();
          navigate(paths.supplyPoint.index);
          showToast({ message: t("supply_point:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [navigate, onCloseModal, t, showToast]
  );

  const actions = useMemo(
    () =>
      supply_point
        ? [
            {
              Icon: Delete,
              text: t("supply_point:actions.delete", { ns: "supply_point" }),
              onClick: () => onClickDelete(Number(supplyPointId))
            }
          ]
        : [],
    [supply_point, onClickDelete, supplyPointId, t]
  );

  const tabs = useMemo(
    () => [
      {
        title: t("supply_point:tabs.data"),
        element: <DetailSupplyPoint supply_point={supply_point} />
      }
    ],
    [supply_point, t]
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
        actions={actions}
        showModal={showModal}
        onCloseModal={onCloseModal}
        modalPrimaryButtonText={modalData?.primaryModalButtonText}
        modalDescription={modalData?.description}
        onPrimaryButtonClick={modalData?.onClickPrimaryButton}
      />
      <Styled.TabWrapper>
        <Tabs tabs={tabs} selectedTab={selectedTab} onChangeTab={handleTabChange} />
      </Styled.TabWrapper>
    </Styled.Page>
  );
}
