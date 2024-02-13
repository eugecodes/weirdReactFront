import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import { Business } from "@/src/ui/assets/icons";
import { useTranslation } from "react-i18next";
import useCancelButton from "@/src/ui/hooks/useCancelButton";

import EditMarketerForm from "./components/edit_marketer_form/edit_marketer_form";
import { useMutationMarketerProvider } from "@/src/ui/pages/marketer/providers/mutation_marketer.provider";

export default function EditMarketerPage() {
  const { t } = useTranslation(["marketer", "common"]);
  const { showModal, onCloseModal, onCancel, cancelAction } = useCancelButton({ condition: true });
  const marketer = useMutationMarketerProvider((state) => state.item);

  return (
    <>
      <DetailPageHeader
        Icon={Business}
        headerText={marketer ? marketer.name : ""}
        actions={cancelAction}
        showModal={showModal}
        modalPrimaryButtonText={t("common:keepEditing")}
        modalDescription={t("common:cancelDescription")}
        onSecondaryButtonClick={onCancel}
        onPrimaryButtonClick={onCloseModal}
      />
      <EditMarketerForm />
    </>
  );
}
