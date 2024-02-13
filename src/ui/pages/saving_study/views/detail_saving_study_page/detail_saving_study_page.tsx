import { BarChart, Delete, Duplicate } from "@/src/ui/assets/icons";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import SavingStudyController from "@/src/ui/pages/saving_study/controllers/saving_study_controller";
import { useMutationSavingStudyProvider } from "@/src/ui/pages/saving_study/provider/mutation_saving_study.provider";
import Styled from "./detail_saving_study_page.styled";
import type { Id } from "@/src/common/utils/types";
import Tabs from "@/src/ui/components/tabs/tabs";
import SavingStudyParameter from "./components/saving_study_parameters/saving_study_parameters";
import SavingStudySelectedRate from "./components/saving_study_selected_rate/saving_study_selected_rate";
import SavingStudyMarketer from "./components/saving_study_marketer/saving_study_marketer";
import i18n from "@/src/ui/i18n";

export default function DetailSavingStudyPage() {
  const { t } = useTranslation(["saving_study", "common"]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const [selecetedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const { showToast } = useShowToast();
  const getSavingStudyById = useMutationSavingStudyProvider((state) => state.getById);
  const savingStudy = useMutationSavingStudyProvider((state) => state.item);
  const { savingStudyId } = useParams();

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  }, []);

  const onCloseModal = useCallback(() => setShowModal(false), []);

  const getSavingStudy = useCallback(async () => {
    if (savingStudyId) {
      const id = Number(savingStudyId);
      const response = await getSavingStudyById(id);
      if (!response) {
        navigate(paths.savingStudy.index);
      }
    }
  }, [getSavingStudyById, savingStudyId, navigate]);

  useEffectRunOnce(() => {
    getSavingStudy();
  }, [getSavingStudy]);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("saving_study:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await SavingStudyController.delete(id);
          onCloseModal();
          navigate(paths.savingStudy.index);
          showToast({ message: t("saving_study:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [navigate, onCloseModal, t, showToast]
  );

  const onClickDuplicate = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("saving_study:sure.duplicate"),
        primaryModalButtonText: t("saving_study:actions.duplicate"),
        onClickPrimaryButton: async () => {
          await SavingStudyController.duplicate(id);
          onCloseModal();
          navigate(paths.savingStudy.index);
          showToast({ message: t("saving_study:actions.duplicated") });
        }
      };
      setModalData(newModalData);
    },
    [onCloseModal, t, showToast, navigate]
  );

  const actions = useMemo(
    () =>
      savingStudy
        ? [
            {
              Icon: Delete,
              text: i18n.t("actions.delete", { ns: "saving_study" }),
              onClick: () => onClickDelete(Number(savingStudyId))
            },
            {
              Icon: Duplicate,
              text: t("saving_study:actions.duplicate"),
              onClick: () => onClickDuplicate(Number(savingStudyId))
            }
          ]
        : [],
    [savingStudy, onClickDelete, savingStudyId, onClickDuplicate, t]
  );

  const tabs = [
    {
      title: i18n.t("tabs.parameters", { ns: "saving_study" }),
      element: <SavingStudyParameter />
    },
    {
      title: i18n.t("tabs.marketer", { ns: "saving_study" }),
      element: <SavingStudyMarketer />
    },
    {
      title: i18n.t("tabs.rate", { ns: "saving_study" }),
      element: <SavingStudySelectedRate />
    }
  ];

  return (
    <Styled.Page>
      <DetailPageHeader
        Icon={BarChart}
        showBreadcrumbs
        resourcePath={paths.savingStudy.index}
        resourceName={t("saving_study:savingStudies")}
        headerText={savingStudy ? savingStudy.cups : ""}
        creationInformation={savingStudy ? savingStudy.creationData() : undefined}
        actions={actions}
        showModal={showModal}
        onCloseModal={onCloseModal}
        modalPrimaryButtonText={modalData?.primaryModalButtonText}
        modalDescription={modalData?.description}
        onPrimaryButtonClick={modalData?.onClickPrimaryButton}
      />
      <Styled.TabWrapper>
        <Tabs tabs={tabs} selectedTab={selecetedTab} onChangeTab={handleTabChange} />
      </Styled.TabWrapper>
    </Styled.Page>
  );
}
