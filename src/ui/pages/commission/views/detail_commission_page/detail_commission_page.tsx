import type { Id } from "@/src/common/utils/types";
import { Business, Delete } from "@/src/ui/assets/icons";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import FakeInput from "@/src/ui/components/fake_input/fake_input";
import LinkAsButton from "@/src/ui/components/LinkAsButton/link_as_button";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useMutationCommissionProvider } from "@/src/ui/pages/commission/provider/mutation_commission.provider";
import Styled from "./detail_commission_page.styled";
import CommissionController from "@/src/ui/pages/commission/controllers/commission_controller";
import { PriceType } from "@/src/core/app/enums/price_type";
import { RangeTypes } from "@/src/core/app/enums/range_type";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { getBooleanTranslation } from "@/src/ui/i18n/utils";
import { MARKETER_TABS_QUERY_PARAMS } from "@/src/ui/pages/marketer/views/detail_marketer_page/detail_marketer_page";
import { getTabResourcePath as getTabResourcePath } from "@/src/ui/utils";

export default function DetailCommissionPage() {
  const { t } = useTranslation(["commission", "common"]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const { commissionId } = useParams();
  const commission = useMutationCommissionProvider((state) => state.item);
  const getCommissionById = useMutationCommissionProvider((state) => state.getById);
  const { showToast } = useShowToast();
  const navigate = useNavigate();

  const onCloseModal = useCallback(() => setShowModal(false), []);

  const resourcePath = getTabResourcePath(MARKETER_TABS_QUERY_PARAMS.COMMISSION, commission?.marketerId);

  const getCommission = useCallback(async () => {
    if (commissionId) {
      const id = Number(commissionId);
      await getCommissionById(id);
    }
  }, [getCommissionById, commissionId]);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("commission:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await CommissionController.delete(id);
          onCloseModal();
          showToast({ message: t("commission:actions.deleted") });
          navigate(resourcePath);
        }
      };
      setModalData(newModalData);
    },
    [navigate, onCloseModal, t, showToast, resourcePath]
  );

  useEffect(() => {
    getCommission();
  }, [getCommission]);

  const actions = useMemo(
    () =>
      commission
        ? [
            {
              Icon: Delete,
              text: t("commission:actions.delete"),
              onClick: () => onClickDelete(Number(commissionId))
            }
          ]
        : [],
    [commission, onClickDelete, commissionId, t]
  );

  return (
    <Styled.Page>
      <DetailPageHeader
        Icon={Business}
        showBreadcrumbs
        resourcePath={resourcePath}
        resourceName={t("commission:commissions")}
        headerText={commission ? commission.name : ""}
        creationInformation={commission ? commission.creationData() : undefined}
        actions={actions}
        showModal={showModal}
        onCloseModal={onCloseModal}
        modalPrimaryButtonText={modalData?.primaryModalButtonText}
        modalDescription={modalData?.description}
        onPrimaryButtonClick={modalData?.onClickPrimaryButton}
      />
      <Styled.Data>
        <Styled.CommissionData>
          <h2>{t("commission:data")}</h2>
          <div>
            <FakeInput label={t("commission:columns.name")} value={commission?.name} />
            <FakeInput
              label={t("commission:columns.priceType")}
              value={commission?.priceType === PriceType.FIXED_BASE ? t("common:priceType.fixedBase") : t("common:priceType.fixedFixed")}
            />
            <FakeInput
              label={t("commission:columns.energyType")}
              value={commission?.energyType === EnergyTypes.LIGHT ? t("common:energyType.electricity") : t("common:energyType.gas")}
            />

            {commission?.priceType === PriceType.FIXED_FIXED && (
              <>
                <FakeInput label={t("commission:columns.rateTypeSegmentation")} value={getBooleanTranslation(commission?.rateTypeSegmentation)} />

                {commission.rateTypeSegmentation ? <FakeInput label={t("commission:columns.rateType")} value={commission?.rateType?.name} /> : null}
                <FakeInput label={t("commission:columns.rates")} value={commission?.rates?.map((rate) => rate.name).join(", ")} />
                <FakeInput
                  label={t("commission:columns.range")}
                  value={commission?.rangeType === RangeTypes.POWER ? t("common:rangeType.power") : t("common:rangeType.consumption")}
                />

                {commission?.rangeType === RangeTypes.POWER ? (
                  <>
                    <FakeInput label={t("commission:columns.minPower")} value={commission.minPower} />
                    <FakeInput label={t("commission:columns.maxPower")} value={commission.maxPower} />
                  </>
                ) : null}

                {commission?.rangeType === RangeTypes.CONSUMPTION ? (
                  <>
                    <FakeInput label={t("commission:columns.minConsumption")} value={commission.minConsumption} />
                    <FakeInput label={t("commission:columns.maxConsumption")} value={commission.maxConsumption} />
                  </>
                ) : null}

                <FakeInput label={t("commission:columns.testCommission")} value={commission.testCommission} />
              </>
            )}

            {commission?.priceType === PriceType.FIXED_BASE && (
              <FakeInput label={t("commission:columns.percentagetestCommission")} value={commission?.percentagetestCommission} />
            )}
          </div>
        </Styled.CommissionData>
      </Styled.Data>
      <LinkAsButton to={paths.commission.index + paths.commission.edit + commissionId}>{t("common:actions.edit")}</LinkAsButton>
    </Styled.Page>
  );
}
