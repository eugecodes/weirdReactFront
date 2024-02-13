import { useState } from "react";
import CreateSavingStudyConfiguration from "@/src/ui/pages/saving_study/views/create_saving_study_page/components/create_saving_study_configuration/create_saving_study_configuration";
import { useTranslation } from "react-i18next";
import SavingStudyController from "@/src/ui/pages/saving_study/controllers/saving_study_controller";
import type { CreateSavingStudyConfigurationModel } from "@/src/core/saving_study/domain/models/create_saving_study_configuration_model";
import type { ApiError } from "@/src/common/interfaces/api_error_model";
import errorTranslations from "@/src/ui/i18n/locales/es/error.json";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import { BarChart } from "@/src/ui/assets/icons";
import EditSavingStudy from "@/src/ui/pages/saving_study/views/edit_saving_study_page/components/create_saving_study/edit_saving_study";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import type { DetailSavingStudyModel } from "@/src/core/saving_study/domain/models/detail_saving_study_model";
import { useNavigate } from "react-router-dom";
import paths from "@/src/ui/router/paths";

export default function CreateSavingStudyPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(["saving_study", "error", "common"]);
  const [savingStudyConfiguration, setSavingStudyConfiguration] = useState<DetailSavingStudyModel>();
  const [errorMessage, setErrorMessage] = useState("");
  const { showModal, onCloseModal, onCancel, cancelAction } = useCancelButton({ condition: true });

  const onCreateSavingStudyConfiguration = async (input: CreateSavingStudyConfigurationModel) => {
    try {
      const response = await SavingStudyController.create(input);
      setSavingStudyConfiguration(response);
      return navigate(paths.savingStudy.index + paths.savingStudy.edit + response?.id);
    } catch (e) {
      const error = (e as ApiError[])[0];
      const isTranslatedCode = Object.keys(errorTranslations).includes(error.code);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const message: string = isTranslatedCode ? t("error:" + error.code) : "";
      setErrorMessage(message);
    }
  };

  return !savingStudyConfiguration ? (
    <CreateSavingStudyConfiguration onSubmitForm={onCreateSavingStudyConfiguration} errorMessage={errorMessage} />
  ) : (
    <>
      <DetailPageHeader
        Icon={BarChart}
        headerText={savingStudyConfiguration?.cups || ""}
        actions={cancelAction}
        showModal={showModal}
        modalPrimaryButtonText={t("common:keepEditing")}
        modalDescription={t("common:cancelDescription")}
        onSecondaryButtonClick={onCancel}
        onPrimaryButtonClick={onCloseModal}
      />
      <EditSavingStudy optionalSavingStudyId={savingStudyConfiguration?.id} />
    </>
  );
}
