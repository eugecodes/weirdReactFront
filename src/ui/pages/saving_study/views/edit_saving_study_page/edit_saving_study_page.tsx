import { useTranslation } from "react-i18next";
import { useMutationSavingStudyProvider } from "../../provider/mutation_saving_study.provider";
import EditSavingStudy from "./components/create_saving_study/edit_saving_study";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import { BarChart } from "@/src/ui/assets/icons";
import useCancelButton from "@/src/ui/hooks/useCancelButton";

export default function EditSavingStudyPage() {
  const { t } = useTranslation(["saving_study", "common"]);
  const { showModal, onCloseModal, onCancel, cancelAction } = useCancelButton({ condition: true });
  const savingStudy = useMutationSavingStudyProvider((state) => state.item);

  return (
    <>
      <DetailPageHeader
        Icon={BarChart}
        headerText={savingStudy?.cups || ""}
        actions={cancelAction}
        showModal={showModal}
        modalPrimaryButtonText={t("common:keepEditing")}
        modalDescription={t("common:cancelDescription")}
        onSecondaryButtonClick={onCancel}
        onPrimaryButtonClick={onCloseModal}
      />
      <EditSavingStudy />
    </>
  );
}
