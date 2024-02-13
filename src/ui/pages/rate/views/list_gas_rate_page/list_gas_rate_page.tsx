import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import paths from "@/src/ui/router/paths";
import ListGasRates from "@/src/ui/pages/rate/components/list_rates/list_gas_rates/list_gas_rates";
import { useListRateProvider } from "@/src/ui/pages/rate/provider/list_rate.provider";
import BackofficePage from "@/src/ui/components/backoffice_page/backoffice_page";
import { Gas } from "@/src/ui/assets/icons";

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
      title={t("rate:rateGas")}
      Icon={Gas}
      createUrl={paths.rate.index + paths.rate.create + `?energyType=${filters.energyType}`}
      createButtonText={t("rate:actions.save")}
      showModal={showModal}
      onCloseModal={onCloseModal}
      modalPrimaryButtonText={modalData?.primaryModalButtonText}
      modalDescription={modalData?.description}
      onPrimaryButtonClick={modalData?.onClickPrimaryButton}>
      <ListGasRates setModalData={setModalData} setShowModal={setShowModal} withMarketerId />
    </BackofficePage>
  );
}
