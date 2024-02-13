import type { Id, Optional } from "@/src/common/utils/types";
import { Business, Delete, Disable, Enable } from "@/src/ui/assets/icons";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import FakeInput, { FakeInputWithLabelCaseUnset } from "@/src/ui/components/fake_input/fake_input";
import LinkAsButton from "@/src/ui/components/LinkAsButton/link_as_button";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import RateController from "../../controllers/rate_controller";
import { useMutationRateProvider } from "@/src/ui/pages/rate/provider/mutation_rate.provider";
import Styled from "./detail_rate_page.styled";
import { PriceType } from "@/src/core/app/enums/price_type";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { RateRangeFakeForm } from "./components/range_fake_form/range_fake_form";
import { RateConsumptionFakeForm } from "./components/consumption_fake_form/consumption_fake_form";
import { RatePriceFakeForm } from "./components/price_fake_form/price_fake_form";
import { getBooleanTranslation, getClientTypeTranslation } from "@/src/ui/i18n/utils";
import type { RateModel } from "@/src/core/rate/domain/models/rate_model";
import { MARKETER_TABS_QUERY_PARAMS } from "@/src/ui/pages/marketer/views/detail_marketer_page/detail_marketer_page";
import { convertBooleanStringIntoBoolean } from "@/src/common/utils";

const getClientTypeNames = (rate: Optional<RateModel>) => {
  if (Array.isArray(rate?.clientTypes)) {
    return rate?.clientTypes?.map((clientType) => getClientTypeTranslation(clientType)).join(",");
  }
  return rate?.clientTypes ? getClientTypeTranslation(rate.clientTypes) : "";
};

export default function DetailRatePage() {
  const { t } = useTranslation(["rate", "common"]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const { rateId } = useParams();
  const [searchParams] = useSearchParams();
  const isFromMarketerDetail = useMemo(() => convertBooleanStringIntoBoolean(searchParams.get("fromMarketerDetail")), [searchParams]);
  const rate = useMutationRateProvider((state) => state.item);
  const getRateById = useMutationRateProvider((state) => state.getById);
  const { showToast } = useShowToast();
  const navigate = useNavigate();

  const onCloseModal = useCallback(() => setShowModal(false), []);

  const getRate = useCallback(async () => {
    if (rateId) {
      const id = Number(rateId);
      await getRateById(id);
    }
  }, [getRateById, rateId]);

  const getResourcePath = useCallback(() => {
    if (isFromMarketerDetail) {
      return (
        paths.marketer.index +
        paths.marketer.detail +
        rate?.marketer?.id +
        `?tab=${rate?.rateType.energyType === EnergyTypes.LIGHT ? MARKETER_TABS_QUERY_PARAMS.RATE_LIGHT : MARKETER_TABS_QUERY_PARAMS.RATE_GAS}`
      );
    }
    return paths.rate.index + (rate?.rateType.energyType === EnergyTypes.LIGHT ? paths.rate.light : paths.rate.gas);
  }, [isFromMarketerDetail, rate]);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("rate:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await RateController.delete(id);
          onCloseModal();
          showToast({ message: t("rate:actions.deleted") });
          navigate(getResourcePath());
        }
      };
      setModalData(newModalData);
    },
    [navigate, onCloseModal, t, showToast, getResourcePath]
  );

  const onClickActive = useCallback(
    (id: Id, currentActiveValue: boolean) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: currentActiveValue ? t("rate:sure.disable") : t("rate:sure.enable"),
        primaryModalButtonText: currentActiveValue ? t("common:actions.disable") : t("common:actions.enable"),
        onClickPrimaryButton: async () => {
          await RateController.toogleActive(id, currentActiveValue);
          onCloseModal();
          await getRate();
          showToast({ message: t(currentActiveValue ? "rate:actions.disabled" : "rate:actions.enabled") });
        }
      };
      setModalData(newModalData);
    },
    [getRate, onCloseModal, t, showToast]
  );

  useEffect(() => {
    getRate();
  }, [getRate]);

  const actions = useMemo(
    () =>
      rate
        ? [
            {
              Icon: rate.enabled ? Disable : Enable,
              text: rate.enabled ? t("common:actions.disable") : t("common:actions.enable"),
              onClick: () => onClickActive(Number(rateId), rate.enabled)
            },
            {
              Icon: Delete,
              text: t("rate:actions.delete"),
              onClick: () => onClickDelete(Number(rateId))
            }
          ]
        : [],
    [rate, onClickActive, onClickDelete, rateId, t]
  );

  return (
    <Styled.Page>
      <DetailPageHeader
        Icon={Business}
        showBreadcrumbs
        resourcePath={getResourcePath()}
        resourceName={t("rate:rates")}
        headerText={rate ? rate.name : ""}
        creationInformation={rate ? rate.creationData() : undefined}
        actions={actions}
        showModal={showModal}
        onCloseModal={onCloseModal}
        modalPrimaryButtonText={modalData?.primaryModalButtonText}
        modalDescription={modalData?.description}
        onPrimaryButtonClick={modalData?.onClickPrimaryButton}
      />
      <Styled.Data>
        <Styled.RateData>
          <h2>{t("rate:data")}</h2>
          <div>
            <FakeInput label={t("rate:columns.marketer")} value={rate?.marketer.name} />
            <FakeInput label={t("rate:columns.name")} value={rate?.name} />
            <FakeInput
              label={t("rate:columns.priceType")}
              value={rate?.priceType === PriceType.FIXED_BASE ? t("common:priceType.fixedBase") : t("common:priceType.fixedFixed")}
            />
            <FakeInput
              label={t("rate:columns.energyType")}
              value={rate?.rateType.energyType === EnergyTypes.LIGHT ? t("common:energyType.electricity") : t("common:energyType.gas")}
            />
            <FakeInput label={t("rate:columns.clientType")} value={getClientTypeNames(rate)} />
            <FakeInput label={t("rate:columns.rateType")} value={rate?.rateType.name} />
            <FakeInput label={t("rate:columns.permanency")} value={getBooleanTranslation(rate?.permanency)} />
            <FakeInput label={t("rate:columns.length")} value={rate?.length} />
            {rate?.rateType.energyType === EnergyTypes.LIGHT ? (
              <>
                <FakeInput label={t("rate:columns.isFullRenewable")} value={getBooleanTranslation(rate?.isFullRenewable)} />
                <FakeInput label={t("rate:columns.compensationSurplus")} value={getBooleanTranslation(rate?.compensationSurplus)} />
                <FakeInputWithLabelCaseUnset label={t("rate:form.labels.compensationSurplusValue")} value={rate?.compensationSurplusValue} />
              </>
            ) : null}
          </div>
        </Styled.RateData>
        {rate?.priceType === PriceType.FIXED_FIXED && rate?.rateType.energyType === EnergyTypes.LIGHT ? (
          <RateRangeFakeForm minPower={rate?.minPower} maxPower={rate?.maxPower} />
        ) : null}
        {rate?.rateType.energyType === EnergyTypes.GAS ? (
          <RateConsumptionFakeForm minConsumption={rate?.minConsumption} maxConsumption={rate?.maxConsumption} />
        ) : null}
        {rate?.rateType.energyType ? <RatePriceFakeForm energyType={rate.rateType.energyType} prices={rate.prices()} /> : null}
      </Styled.Data>
      <LinkAsButton to={paths.rate.index + paths.rate.edit + rateId + `${isFromMarketerDetail ? "?fromMarketerDetail=true" : ""}`}>
        {t("common:actions.edit")}
      </LinkAsButton>
    </Styled.Page>
  );
}
