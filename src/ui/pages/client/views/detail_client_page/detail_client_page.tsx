import { BarChart, Delete } from "@/src/ui/assets/icons";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ClientController from "@/src/ui/pages/client/controllers/client_controller";
import { useMutationClientProvider } from "@/src/ui/pages/client/provider/mutation_client.provider";
import Styled from "./detail_client_page.styled";
import type { Id } from "@/src/common/utils/types";
import Tabs from "@/src/ui/components/tabs/tabs";
import DetailClient from "@/src/ui/pages/client/views/detail_client_page/components/detail_client/tabs/detail_client/detail_client";
import ListContactPage from "@/src/ui/pages/client/views/detail_client_page/components/detail_client/tabs/list_contacts/list_contacts_page";
import { useListContactProvider } from "@/src/ui/pages/client/views/detail_client_page/components/detail_client/tabs/list_contacts/provider/list_contacts.provider";
import ListSupplyPointPage from "@/src/ui/pages/client/views/detail_client_page/components/detail_client/tabs/list_supply_points/list_supply_points_page";
import { useListSupplyPointProvider } from "./components/detail_client/tabs/list_supply_points/provider/list_supply_points.provider";

enum CLIENT_TABS {
  DETAIL_CLIENT,
  LIST_CONTACTS,
  LIST_SUPPLY_POINTS
}

export enum CLIENT_TABS_QUERY_PARAMS {
  DETAIL_CLIENT = "",
  LIST_CONTACTS = "contacts",
  LIST_SUPPLY_POINTS = "supply_points"
}

export default function DetailClientPage() {
  const { t } = useTranslation(["client", "common"]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const navigate = useNavigate();
  const { showToast } = useShowToast();
  const getClientById = useMutationClientProvider((state) => state.getById);
  const client = useMutationClientProvider((state) => state.item);
  const { clientId } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchParams] = useSearchParams();
  const clientIdAsNumber = useMemo(() => Number(clientId), [clientId]);

  const onCloseModal = useCallback(() => setShowModal(false), []);

  useEffectRunOnce(() => {
    switch (searchParams.get("tab")) {
      case CLIENT_TABS_QUERY_PARAMS.LIST_CONTACTS:
        setSelectedTab(CLIENT_TABS.LIST_CONTACTS);
        break;
      case CLIENT_TABS_QUERY_PARAMS.LIST_SUPPLY_POINTS:
        setSelectedTab(CLIENT_TABS.LIST_SUPPLY_POINTS);
        break;
      case CLIENT_TABS_QUERY_PARAMS.DETAIL_CLIENT:
      default:
        setSelectedTab(CLIENT_TABS.DETAIL_CLIENT);
    }
  }, [searchParams]);

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  }, []);

  const getClient = useCallback(async () => {
    if (clientId) {
      const id = Number(clientId);
      const response = await getClientById(id);
      if (!response) {
        navigate(paths.client.index);
      }
    }
  }, [getClientById, clientId, navigate]);

  useEffectRunOnce(() => {
    getClient();
  }, [getClient]);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("client:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await ClientController.delete(id);
          onCloseModal();
          navigate(paths.client.index);
          showToast({ message: t("client:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [navigate, onCloseModal, t, showToast]
  );

  const actions = useMemo(
    () =>
      client
        ? [
            {
              Icon: Delete,
              text: t("client:actions.delete", { ns: "client" }),
              onClick: () => onClickDelete(Number(clientId))
            }
          ]
        : [],
    [client, onClickDelete, clientId, t]
  );

  const tabs = useMemo(
    () => [
      {
        title: t("client:tabs.data"),
        element: <DetailClient client={client} />
      },
      {
        title: t("client:tabs.contacts"),
        element: (
          <useListContactProvider.State
            builderProps={{
              filters: {
                clientId: clientId ? clientIdAsNumber : undefined
              }
            }}
          >
            <ListContactPage />
          </useListContactProvider.State>
        )
      },
      {
        title: t("client:tabs.supply_points"),
        element: (
          <useListSupplyPointProvider.State
            builderProps={{
              filters: {
                clientId: clientId ? clientIdAsNumber : undefined
              }
            }}
          >
            <ListSupplyPointPage />
          </useListSupplyPointProvider.State>
        )
      }
    ],
    [client, t, clientIdAsNumber, clientId]
  );

  return (
    <Styled.Page>
      <DetailPageHeader
        Icon={BarChart}
        showBreadcrumbs
        resourcePath={paths.client.index}
        resourceName={t("client:clients")}
        headerText={client ? client.cif : ""}
        creationInformation={client ? client.creationData() : undefined}
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
