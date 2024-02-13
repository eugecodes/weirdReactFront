import type { Id } from "@/src/common/utils/types";
import { Delete, Disable, Enable, Payments } from "@/src/ui/assets/icons";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import FakeInput from "@/src/ui/components/fake_input/fake_input";
import LinkAsButton from "@/src/ui/components/LinkAsButton/link_as_button";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import EnergyCostController from "../../controllers/energy_cost_controller";
import { useMutationEnergyCostProvider } from "../../provider/mutatiton_energy_cost.provider";
import Styled from "./detail_energy_cost_page.styled";

export default function DetailEnergyCostPage() {
  const { t } = useTranslation(["energy_cost", "common"]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const { energyCostId } = useParams();
  const energyCost = useMutationEnergyCostProvider((state) => state.item);
  const getEnergyCostById = useMutationEnergyCostProvider((state) => state.getById);
  const { showToast } = useShowToast();
  const navigate = useNavigate();

  const onCloseModal = useCallback(() => setShowModal(false), []);

  const getEnergyCost = useCallback(async () => {
    if (energyCostId) {
      const id = Number(energyCostId);
      const response = await getEnergyCostById(id);
      if (!response) {
        navigate(paths.energyCost.index);
      }
    }
  }, [getEnergyCostById, energyCostId, navigate]);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("energy_cost:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await EnergyCostController.delete(id);
          onCloseModal();
          showToast({ message: t("energy_cost:actions.deleted") });
          navigate(paths.energyCost.index);
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
        description: currentActiveValue ? t("energy_cost:sure.disable") : t("energy_cost:sure.enable"),
        primaryModalButtonText: currentActiveValue ? t("common:actions.disable") : t("common:actions.enable"),
        onClickPrimaryButton: async () => {
          await EnergyCostController.toogleActive(id, currentActiveValue);
          onCloseModal();
          await getEnergyCost();
          showToast({ message: t(currentActiveValue ? "energy_cost:actions.disabled" : "energy_cost:actions.enabled") });
        }
      };
      setModalData(newModalData);
    },
    [getEnergyCost, onCloseModal, t, showToast]
  );

  useEffect(() => {
    getEnergyCost();
  }, [getEnergyCost]);

  const actions = useMemo(
    () =>
      energyCost
        ? [
            {
              Icon: energyCost.enabled ? Disable : Enable,
              text: energyCost.enabled ? t("common:actions.disable") : t("common:actions.enable"),
              onClick: () => onClickActive(Number(energyCostId), energyCost.enabled)
            },
            {
              Icon: Delete,
              text: t("energy_cost:actions.delete"),
              onClick: () => onClickDelete(Number(energyCostId))
            }
          ]
        : [],
    [energyCost, onClickActive, onClickDelete, energyCostId, t]
  );

  return (
    <>
      <DetailPageHeader
        Icon={Payments}
        showBreadcrumbs
        resourcePath={paths.energyCost.index}
        resourceName={t("energy_cost:energyCosts")}
        headerText={energyCost ? energyCost.concept : ""}
        creationInformation={energyCost ? energyCost.creationData() : undefined}
        actions={actions}
        showModal={showModal}
        onCloseModal={onCloseModal}
        modalPrimaryButtonText={modalData?.primaryModalButtonText}
        modalDescription={modalData?.description}
        onPrimaryButtonClick={modalData?.onClickPrimaryButton}
      />
      <Styled.Data>
        <Styled.EnergyCostData>
          <div>
            <FakeInput label={t("energy_cost:columns.concept")} value={energyCost?.concept} />
            <FakeInput label={t("energy_cost:columns.amount")} value={energyCost?.amount} />
          </div>
        </Styled.EnergyCostData>
      </Styled.Data>
      <LinkAsButton to={paths.energyCost.index + paths.energyCost.edit + energyCostId}>{t("common:actions.edit")}</LinkAsButton>
    </>
  );
}
