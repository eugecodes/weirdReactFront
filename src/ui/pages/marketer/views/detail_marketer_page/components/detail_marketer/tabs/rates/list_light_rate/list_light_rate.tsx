import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import paths from "@/src/ui/router/paths";
import { useListRateProvider } from "@/src/ui/pages/rate/provider/list_rate.provider";
import TabsListPage from "@/src/ui/components/tabs_list_page/tabs_list_page";
import ListLightRates from "@/src/ui/pages/rate/components/list_rates/list_light_rates/list_light_rates";

export default function ListLightRatePage() {
  const { t } = useTranslation(["rate", "common"]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const filters = useListRateProvider((state) => state.filters);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <TabsListPage
      title={t("rate:rateLight")}
      createUrl={paths.rate.index + paths.rate.create + `?marketerId=${filters.marketer?.id}&energyType=${filters.energyType}`}
      createButtonText={t("rate:actions.save")}
      showModal={showModal}
      onCloseModal={onCloseModal}
      modalPrimaryButtonText={modalData?.primaryModalButtonText}
      modalDescription={modalData?.description}
      onPrimaryButtonClick={modalData?.onClickPrimaryButton}>
      <ListLightRates setModalData={setModalData} setShowModal={setShowModal} />
    </TabsListPage>
  );
}
