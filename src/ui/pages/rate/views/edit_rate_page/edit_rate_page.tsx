import type { CreateRateModel } from "@/src/core/rate/domain/models/create_rate_model";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import useShowToast from "@/src/ui/hooks/useShowToast";
import { useTranslation } from "react-i18next";
import RateController from "../../controllers/rate_controller";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import { Business } from "@/src/ui/assets/icons";
import { useMutationRateProvider } from "../../provider/mutation_rate.provider";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import EditRateForm from "./components/edit_rate_form/edit_rate_form";
import { convertBooleanStringIntoBoolean } from "@/src/common/utils";
import paths from "@/src/ui/router/paths";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { MARKETER_TABS_QUERY_PARAMS } from "@/src/ui/pages/marketer/views/detail_marketer_page/detail_marketer_page";

export default function EditRatePage() {
  const { t } = useTranslation(["common", "rate"]);
  const navigate = useNavigate();
  const { rateId } = useParams();
  const rate = useMutationRateProvider((state) => state.item);
  const [searchParams] = useSearchParams();
  const isFromMarketerDetail = useMemo(() => convertBooleanStringIntoBoolean(searchParams.get("fromMarketerDetail")), [searchParams]);
  const getRateById = useMutationRateProvider((state) => state.getById);
  const { showToast } = useShowToast();

  const getResourcePath = useMemo(() => {
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

  const { showModal, onCloseModal, onCancel, cancelAction } = useCancelButton({ condition: true, onCancelUrl: getResourcePath });

  const onEditRate = useCallback(
    async (input: CreateRateModel) => {
      await RateController.edit(input, Number(rateId));
      showToast({ message: t("rate:actions.edited") });
      navigate(-1);
    },
    [navigate, t, showToast, rateId]
  );

  const getRate = useCallback(async () => {
    if (rateId) {
      const id = Number(rateId);
      const response = await getRateById(id);
      if (!response) {
        navigate(-1);
      }
    }
  }, [getRateById, rateId, navigate]);

  useEffectRunOnce(() => {
    getRate();
  }, [getRate]);

  return (
    <>
      <DetailPageHeader
        Icon={Business}
        headerText={rate ? rate.name : ""}
        actions={cancelAction}
        showModal={showModal}
        modalPrimaryButtonText={t("common:keepEditing")}
        modalDescription={t("common:cancelDescription")}
        onSecondaryButtonClick={onCancel}
        onPrimaryButtonClick={onCloseModal}
      />
      <EditRateForm onSubmitForm={onEditRate} rate={rate}></EditRateForm>
    </>
  );
}
