import { BarChart, Delete } from "@/src/ui/assets/icons";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ContractController from "@/src/ui/pages/contract/controllers/contract_controller";
import { useMutationContractProvider } from "@/src/ui/pages/contract/provider/mutation_contract.provider";
import Styled from "./detail_contract_page.styled";
import type { Id } from "@/src/common/utils/types";
import Tabs from "@/src/ui/components/tabs/tabs";
import DetailContract from "@/src/ui/pages/contract/views/detail_contract_page/components/detail_contract/tabs/detail_contract/detail_contract";

enum SUPPLY_POINT_CLIENT_TABS {
  DETAIL_CLIENT
}

export enum SUPPLY_POINT_TABS_QUERY_PARAMS {
  DETAIL_CLIENT = ""
}

export default function DetailContractPage() {
  const { t } = useTranslation(["contract", "common"]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const navigate = useNavigate();
  const { showToast } = useShowToast();
  const getContractById = useMutationContractProvider((state) => state.getById);
  const contract = useMutationContractProvider((state) => state.item);
  const { contractId } = useParams();
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

  const getContract = useCallback(async () => {
    if (contractId) {
      const id = Number(contractId);
      const response = await getContractById(id);
      if (!response) {
        navigate(paths.contract.index);
      }
    }
  }, [getContractById, contractId, navigate]);

  useEffectRunOnce(() => {
    getContract();
  }, [getContract]);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("contract:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await ContractController.delete(id);
          onCloseModal();
          navigate(paths.contract.index);
          showToast({ message: t("contract:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [navigate, onCloseModal, t, showToast]
  );

  const actions = useMemo(
    () =>
      contract
        ? [
            {
              Icon: Delete,
              text: t("contract:actions.delete", { ns: "contract" }),
              onClick: () => onClickDelete(Number(contractId))
            }
          ]
        : [],
    [contract, onClickDelete, contractId, t]
  );

  const tabs = useMemo(
    () => [
      {
        title: t("contract:tabs.data"),
        element: <DetailContract contract={contract} />
      }
    ],
    [contract, t]
  );

  return (
    <Styled.Page>
      <DetailPageHeader
        Icon={BarChart}
        showBreadcrumbs
        resourcePath={paths.contract.index}
        resourceName={t("contract:contracts")}
        headerText={contract ? String(contract.id) : ""}
        creationInformation={contract ? contract.creationData() : undefined}
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
