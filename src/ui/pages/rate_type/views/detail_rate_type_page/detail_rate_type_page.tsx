import { Delete, DeviceHub, Disable, Enable } from "@/src/ui/assets/icons";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import FakeInput, { FakeInputWithLabelCaseUnset } from "@/src/ui/components/fake_input/fake_input";
import LinkAsButton from "@/src/ui/components/LinkAsButton/link_as_button";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import RateTypeController from "@/src/ui/pages/rate_type/controllers/rate_type_controller";
import { useMutationRateTypeProvider } from "@/src/ui/pages/rate_type/provider/mutation_rate_type.provider";
import Styled from "./detail_rate_type_page.styled";
import type { Id } from "@/src/common/utils/types";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";

export default function DetailRateTypePage() {
  const { t } = useTranslation(["rate_type", "common"]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const { rateTypeId } = useParams();
  const rateType = useMutationRateTypeProvider((state) => state.item);
  const getRateTypeById = useMutationRateTypeProvider((state) => state.getById);
  const { showToast } = useShowToast();
  const navigate = useNavigate();

  const onCloseModal = useCallback(() => setShowModal(false), []);

  const getRateType = useCallback(async () => {
    if (rateTypeId) {
      const id = Number(rateTypeId);
      const response = await getRateTypeById(id);
      if (!response) {
        navigate(paths.rateType.index);
      }
    }
  }, [getRateTypeById, rateTypeId, navigate]);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("rate_type:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await RateTypeController.delete(id);
          onCloseModal();
          showToast({ message: t("rate_type:actions.deleted") });
          await getRateType();
          navigate(paths.rateType.index);
        }
      };
      setModalData(newModalData);
    },
    [getRateType, onCloseModal, t, showToast, navigate]
  );

  const onClickActive = useCallback(
    (id: Id, currentActiveValue: boolean) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: currentActiveValue ? t("rate_type:sure.disable") : t("rate_type:sure.enable"),
        primaryModalButtonText: currentActiveValue ? t("common:actions.disable") : t("common:actions.enable"),
        onClickPrimaryButton: async () => {
          await RateTypeController.toogleActive(id, currentActiveValue);
          onCloseModal();
          await getRateType();
          showToast({ message: t(currentActiveValue ? "rate_type:actions.disabled" : "rate_type:actions.enabled") });
        }
      };
      setModalData(newModalData);
    },
    [getRateType, onCloseModal, t, showToast]
  );

  useEffect(() => {
    getRateType();
  }, [getRateType]);

  const actions = useMemo(
    () =>
      rateType
        ? [
            {
              Icon: rateType.enabled ? Disable : Enable,
              text: rateType.enabled ? t("common:actions.disable") : t("common:actions.enable"),
              onClick: () => onClickActive(Number(rateTypeId), rateType.enabled)
            },
            {
              Icon: Delete,
              text: t("rate_type:actions.delete"),
              onClick: () => onClickDelete(Number(rateTypeId))
            }
          ]
        : [],
    [rateType, onClickActive, onClickDelete, rateTypeId, t]
  );

  return (
    <>
      <DetailPageHeader
        Icon={DeviceHub}
        showBreadcrumbs
        resourcePath={paths.rateType.index}
        resourceName={t("rate_type:rateTypes")}
        headerText={rateType ? rateType.name : ""}
        creationInformation={rateType ? rateType.creationData() : undefined}
        actions={actions}
        showModal={showModal}
        onCloseModal={onCloseModal}
        modalPrimaryButtonText={modalData?.primaryModalButtonText}
        modalDescription={modalData?.description}
        onPrimaryButtonClick={modalData?.onClickPrimaryButton}
      />
      <Styled.Data>
        <Styled.RateTypeData>
          <div>
            <FakeInput
              label={t("rate_type:rateTypesData")}
              value={rateType?.energyType === EnergyTypes.LIGHT ? t("rate_type:energyType.electricity") : t("rate_type:energyType.gas")}
            />
            <FakeInput label={t("rate_type:columns.name")} value={rateType?.name} />
            {rateType?.energyType === EnergyTypes.LIGHT && (
              <>
                <FakeInputWithLabelCaseUnset label={t("rate_type:columns.minPowerUppercase")} value={rateType?.minPower} />
                <FakeInputWithLabelCaseUnset label={t("rate_type:columns.maxPowerUppercase")} value={rateType?.maxPower} />
              </>
            )}
          </div>
        </Styled.RateTypeData>
      </Styled.Data>
      <LinkAsButton to={paths.rateType.index + paths.rateType.edit + rateTypeId}>{t("common:actions.edit")}</LinkAsButton>
    </>
  );
}
