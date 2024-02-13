import { useTranslation } from "react-i18next";
import { useMutationContactProvider } from "../../provider/mutation_contact.provider";
import EditContact from "@/src/ui/pages/contact/views/edit_contact_page/components/edit_contact/edit_contact";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import { BarChart } from "@/src/ui/assets/icons";
import useCancelButton from "@/src/ui/hooks/useCancelButton";

export default function EditContactPage() {
  const { t } = useTranslation(["contact", "common"]);
  const { showModal, onCloseModal, onCancel, cancelAction } = useCancelButton({ condition: true });
  const contact = useMutationContactProvider((state) => state.item);

  return (
    <>
      <DetailPageHeader
        Icon={BarChart}
        headerText={contact?.name || ""}
        actions={cancelAction}
        showModal={showModal}
        modalPrimaryButtonText={t("common:keepEditing")}
        modalDescription={t("common:cancelDescription")}
        onSecondaryButtonClick={onCancel}
        onPrimaryButtonClick={onCloseModal}
      />
      <EditContact />
    </>
  );
}
