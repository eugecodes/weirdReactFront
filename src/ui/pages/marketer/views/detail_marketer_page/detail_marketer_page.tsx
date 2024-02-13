import { Business, Delete, Disable, Enable } from "@/src/ui/assets/icons";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import MarketerController from "@/src/ui/pages/marketer/controllers/marketer_controller";
import { useMutationMarketerProvider } from "@/src/ui/pages/marketer/providers/mutation_marketer.provider";
import Styled from "./detail_marketer_page.styled";
import DetailMarketer from "@/src/ui/pages/marketer/views/detail_marketer_page/components/detail_marketer/tabs/detail_marketer/detail_marketer";
import type { Id } from "@/src/common/utils/types";
import Tabs from "@/src/ui/components/tabs/tabs";
import ListLightRatePage from "@/src/ui/pages/marketer/views/detail_marketer_page/components/detail_marketer/tabs/rates/list_light_rate/list_light_rate";
import { useListRateProvider } from "@/src/ui/pages/rate/provider/list_rate.provider";
import { useListMarketerMarginProvider } from "@/src/ui/pages/marketer_margin/provider/list_marketer_margin.provider";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import ListGasRatePage from "@/src/ui/pages/marketer/views/detail_marketer_page/components/detail_marketer/tabs/rates/list_gas_rate/list_gas_rate";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import ListMarketerMarginPage from "@/src/ui/pages/marketer/views/detail_marketer_page/components/detail_marketer/tabs/list_marketer_margin/list_marketer_margin";
import ListCostPage from "@/src/ui/pages/marketer/views/detail_marketer_page/components/detail_marketer/tabs/list_cost/list_cost_page";
import { useListCostProvider } from "@/src/ui/pages/marketer/views/detail_marketer_page/components/detail_marketer/tabs/list_cost/provider/list_cost.provider";
import ListCommissionPage from "@/src/ui/pages/marketer/views/detail_marketer_page/components/detail_marketer/tabs/list_commission/list_commision_page";
import { useListCommissionProvider } from "@/src/ui/pages/marketer/views/detail_marketer_page/components/detail_marketer/tabs/list_commission/provider/list_commission.provider";
import { useAutocompleteMarketersProvider } from "@/src/ui/pages/rate/provider/autocomplete_marketer.provider";

enum MARKETER_TABS {
  DETAIL_MARKETER,
  RATE_LIGHT,
  RATE_GAS,
  MARGIN,
  COST,
  COMMISSION
}

export enum MARKETER_TABS_QUERY_PARAMS {
  DETAIL_MARKETER = "",
  RATE_LIGHT = "rate-light",
  RATE_GAS = "rate-gas",
  MARGIN = "margin",
  COST = "cost",
  COMMISSION = "commission"
}

export default function DetailMarketerPage() {
  const { t } = useTranslation(["marketer", "common"]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const { showToast } = useShowToast();
  const getMarketerById = useMutationMarketerProvider((state) => state.getById);
  const marketer = useMutationMarketerProvider((state) => state.item);
  const [searchParams] = useSearchParams();
  const { marketerId } = useParams();
  const marketerIdAsNumber = useMemo(() => Number(marketerId), [marketerId]);

  useEffectRunOnce(() => {
    switch (searchParams.get("tab")) {
      case MARKETER_TABS_QUERY_PARAMS.RATE_LIGHT:
        setSelectedTab(MARKETER_TABS.RATE_LIGHT);
        break;
      case MARKETER_TABS_QUERY_PARAMS.RATE_GAS:
        setSelectedTab(MARKETER_TABS.RATE_GAS);
        break;
      case MARKETER_TABS_QUERY_PARAMS.MARGIN:
        setSelectedTab(MARKETER_TABS.MARGIN);
        break;
      case MARKETER_TABS_QUERY_PARAMS.COST:
        setSelectedTab(MARKETER_TABS.COST);
        break;
      case MARKETER_TABS_QUERY_PARAMS.COMMISSION:
        setSelectedTab(MARKETER_TABS.COMMISSION);
        break;
      default:
        setSelectedTab(MARKETER_TABS.DETAIL_MARKETER);
    }
  }, [searchParams]);

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  }, []);

  const onCloseModal = useCallback(() => setShowModal(false), []);

  const getMarketer = useCallback(async () => {
    if (marketerId) {
      const id = Number(marketerId);
      const response = await getMarketerById(id);
      if (!response) {
        navigate(paths.marketer.index);
      }
    }
  }, [getMarketerById, marketerId, navigate]);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("marketer:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await MarketerController.delete(id);
          onCloseModal();
          navigate(paths.marketer.index);
          showToast({ message: t("marketer:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [navigate, onCloseModal, t, showToast]
  );

  const onClickActive = useCallback(
    (id: Id, currentActiveValue: boolean) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: currentActiveValue ? t("marketer:sure.disable") : t("marketer:sure.enable"),
        primaryModalButtonText: currentActiveValue ? t("common:actions.disable") : t("common:actions.enable"),
        onClickPrimaryButton: async () => {
          await MarketerController.toogleActive(id, currentActiveValue);
          onCloseModal();
          showToast({ message: t(currentActiveValue ? "marketer:actions.disabled" : "marketer:actions.enabled") });
          await getMarketer();
        }
      };
      setModalData(newModalData);
    },
    [getMarketer, onCloseModal, t, showToast]
  );

  useEffectRunOnce(() => {
    getMarketer();
  }, [getMarketer]);

  const actions = useMemo(
    () =>
      marketer
        ? [
            {
              Icon: marketer.enabled ? Disable : Enable,
              text: marketer.enabled ? t("common:actions.disable") : t("common:actions.enable"),
              onClick: () => onClickActive(Number(marketerId), marketer.enabled)
            },
            {
              Icon: Delete,
              text: t("marketer:actions.delete"),
              onClick: () => onClickDelete(Number(marketerId))
            }
          ]
        : [],
    [marketer, onClickActive, onClickDelete, marketerId, t]
  );

  const tabs = useMemo(
    () => [
      {
        title: t("marketer:tabs.data"),
        element: <DetailMarketer marketer={marketer} />
      },
      {
        title: t("marketer:tabs.lightRate"),
        element: (
          <useAutocompleteMarketersProvider.State>
            <useAutocompleteRateTypesProvider.State builderProps={{ energyType: EnergyTypes.LIGHT }}>
              <useListRateProvider.State
                builderProps={{
                  filters: {
                    energyType: EnergyTypes.LIGHT,
                    marketer: marketerId ? { id: marketerIdAsNumber, label: "" } : undefined
                  }
                }}
              >
                <ListLightRatePage />
              </useListRateProvider.State>
            </useAutocompleteRateTypesProvider.State>
          </useAutocompleteMarketersProvider.State>
        )
      },
      {
        title: t("marketer:tabs.gasRate"),
        element: (
          <useAutocompleteMarketersProvider.State>
            <useAutocompleteRateTypesProvider.State builderProps={{ energyType: EnergyTypes.GAS }}>
              <useListRateProvider.State
                builderProps={{
                  filters: {
                    energyType: EnergyTypes.GAS,
                    marketer: marketerId ? { id: marketerIdAsNumber, label: "" } : undefined
                  }
                }}
              >
                <ListGasRatePage />
              </useListRateProvider.State>
            </useAutocompleteRateTypesProvider.State>
          </useAutocompleteMarketersProvider.State>
        )
      },
      {
        title: t("marketer:tabs.marketerMargin"),
        element: (
          <useAutocompleteRateProvider.State>
            <useAutocompleteRateTypesProvider.State>
              <useListMarketerMarginProvider.State
                builderProps={{
                  filters: {
                    marketerId: marketerIdAsNumber
                  }
                }}
              >
                <ListMarketerMarginPage />
              </useListMarketerMarginProvider.State>
            </useAutocompleteRateTypesProvider.State>
          </useAutocompleteRateProvider.State>
        )
      },
      {
        title: t("marketer:tabs.cost"),
        element: (
          <useAutocompleteRateProvider.State>
            <useListCostProvider.State
              builderProps={{
                filters: {
                  marketerId: marketerIdAsNumber
                }
              }}
            >
              <ListCostPage />
            </useListCostProvider.State>
          </useAutocompleteRateProvider.State>
        )
      },
      {
        title: t("marketer:tabs.commission"),
        element: (
          <useAutocompleteRateProvider.State>
            <useAutocompleteRateTypesProvider.State>
              <useListCommissionProvider.State
                builderProps={{
                  filters: {
                    marketerId: marketerIdAsNumber
                  }
                }}
              >
                <ListCommissionPage />
              </useListCommissionProvider.State>
            </useAutocompleteRateTypesProvider.State>
          </useAutocompleteRateProvider.State>
        )
      }
    ],
    [marketer, marketerId, marketerIdAsNumber, t]
  );

  return (
    <Styled.Page>
      <DetailPageHeader
        Icon={Business}
        showBreadcrumbs
        resourcePath={paths.marketer.index}
        resourceName={t("marketer:marketers")}
        headerText={marketer ? marketer.name : ""}
        creationInformation={marketer ? marketer.creationData() : undefined}
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
