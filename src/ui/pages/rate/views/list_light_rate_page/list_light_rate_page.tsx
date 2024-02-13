import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import paths from "@/src/ui/router/paths";
import { useListRateProvider } from "@/src/ui/pages/rate/provider/list_rate.provider";
import BackofficePage from "@/src/ui/components/backoffice_page/backoffice_page";
import { LightBulb } from "@/src/ui/assets/icons";
import ListLightRates from "@/src/ui/pages/rate/components/list_rates/list_light_rates/list_light_rates";

export default function ListGasRatePage() {
  const { t } = useTranslation(["rate", "common"]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();

  const filters = useListRateProvider((state) => state.filters);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <BackofficePage
      title={t("rate:rateLight")}
      Icon={LightBulb}
      createUrl={paths.rate.index + paths.rate.create + `?energyType=${filters.energyType}`}
      createButtonText={t("rate:actions.save")}
      showModal={showModal}
      onCloseModal={onCloseModal}
      modalPrimaryButtonText={modalData?.primaryModalButtonText}
      modalDescription={modalData?.description}
      onPrimaryButtonClick={modalData?.onClickPrimaryButton}>
      <ListLightRates setModalData={setModalData} setShowModal={setShowModal} withMarketerId />
    </BackofficePage>
  );
}
