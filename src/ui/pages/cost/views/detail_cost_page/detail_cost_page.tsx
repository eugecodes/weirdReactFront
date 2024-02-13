import type { Id, Optional } from "@/src/common/utils/types";
import { Business, Delete, Disable, Enable } from "@/src/ui/assets/icons";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import FakeInput from "@/src/ui/components/fake_input/fake_input";
import LinkAsButton from "@/src/ui/components/LinkAsButton/link_as_button";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useMutationCostProvider } from "@/src/ui/pages/cost/provider/mutation_cost.provider";
import Styled from "./detail_cost_page.styled";
import CostController from "@/src/ui/pages/cost/controllers/cost_controller";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { getBooleanTranslation, getClientTypeTranslation, getCostTypeTranslation } from "@/src/ui/i18n/utils";
import type { DetailCostModel } from "@/src/core/cost/domain/models/detail_cost_model";
import { MARKETER_TABS_QUERY_PARAMS } from "@/src/ui/pages/marketer/views/detail_marketer_page/detail_marketer_page";
import { getTabResourcePath } from "@/src/ui/utils";

const getClientTypeNames = (cost: Optional<DetailCostModel>) => {
  if (Array.isArray(cost?.clientTypes)) {
    return cost?.clientTypes?.map((clientType) => getClientTypeTranslation(clientType)).join(", ");
  }
  return cost?.clientTypes ? getClientTypeTranslation(cost.clientTypes) : "";
};

export default function DetailCostPage() {
  const { t } = useTranslation(["cost", "common"]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const { costId } = useParams();
  const cost = useMutationCostProvider((state) => state.item);
  const getCostById = useMutationCostProvider((state) => state.getById);
  const { showToast } = useShowToast();
  const navigate = useNavigate();

  const onCloseModal = useCallback(() => setShowModal(false), []);

  const getCost = useCallback(async () => {
    if (costId) {
      const id = Number(costId);
      await getCostById(id);
    }
  }, [getCostById, costId]);

  const resourcePath = getTabResourcePath(MARKETER_TABS_QUERY_PARAMS.COST, cost?.marketerId);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("cost:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await CostController.delete(id);
          onCloseModal();
          showToast({ message: t("cost:actions.deleted") });
          navigate(resourcePath);
        }
      };
      setModalData(newModalData);
    },
    [navigate, onCloseModal, t, showToast, resourcePath]
  );

  const onClickActive = useCallback(
    (id: Id, currentActiveValue: boolean) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: currentActiveValue ? t("cost:sure.disable") : t("cost:sure.enable"),
        primaryModalButtonText: currentActiveValue ? t("common:actions.disable") : t("common:actions.enable"),
        onClickPrimaryButton: async () => {
          await CostController.toogleActive(id, currentActiveValue);
          onCloseModal();
          await getCost();
          showToast({ message: t(currentActiveValue ? "cost:actions.disabled" : "cost:actions.enabled") });
        }
      };
      setModalData(newModalData);
    },
    [getCost, onCloseModal, t, showToast]
  );

  useEffect(() => {
    getCost();
  }, [getCost]);

  const actions = useMemo(
    () =>
      cost
        ? [
            {
              Icon: cost.enabled ? Disable : Enable,
              text: cost.enabled ? t("common:actions.disable") : t("common:actions.enable"),
              onClick: () => onClickActive(Number(costId), cost.enabled)
            },
            {
              Icon: Delete,
              text: t("cost:actions.delete"),
              onClick: () => onClickDelete(Number(costId))
            }
          ]
        : [],
    [cost, onClickDelete, costId, t, onClickActive]
  );

  return (
    <Styled.Page>
      <DetailPageHeader
        Icon={Business}
        showBreadcrumbs
        resourcePath={resourcePath}
        resourceName={t("cost:costs")}
        headerText={cost ? cost.name : ""}
        creationInformation={cost ? cost.creationData() : undefined}
        actions={actions}
        showModal={showModal}
        onCloseModal={onCloseModal}
        modalPrimaryButtonText={modalData?.primaryModalButtonText}
        modalDescription={modalData?.description}
        onPrimaryButtonClick={modalData?.onClickPrimaryButton}
      />
      <Styled.Data>
        <Styled.CostData>
          <h2>{t("cost:data")}</h2>
          <div>
            <FakeInput label={t("cost:columns.name")} value={cost?.name} />
            <FakeInput label={t("cost:columns.mandatory")} value={getBooleanTranslation(cost?.mandatory)} />
            <FakeInput label={t("cost:columns.clientType")} value={getClientTypeNames(cost)} />
            <FakeInput
              label={t("cost:columns.energyType")}
              value={cost?.energyType === EnergyTypes.LIGHT ? t("common:energyType.electricity") : t("common:energyType.gas")}
            />
            <FakeInput label={t("cost:columns.rates")} value={cost?.rates.map((rate) => rate.name).join(", ")} />
            {cost?.energyType === EnergyTypes.LIGHT && (
              <>
                <FakeInput label={t("cost:columns.minPower")} value={cost?.minPower} />
                <FakeInput label={t("cost:columns.maxPower")} value={cost?.maxPower} />
              </>
            )}
            <FakeInput label={t("cost:columns.costType")} value={getCostTypeTranslation(cost?.type)} />
            <FakeInput label={t("cost:columns.quantity")} value={cost?.quantity} />
            <FakeInput label={t("cost:columns.extraFee")} value={cost?.extraFee} />
          </div>
        </Styled.CostData>
      </Styled.Data>
      <LinkAsButton to={paths.cost.index + paths.cost.edit + costId}>{t("common:actions.edit")}</LinkAsButton>
    </Styled.Page>
  );
}
