import { Delete, Disable, Enable, Face } from "@/src/ui/assets/icons";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import FakeInput from "@/src/ui/components/fake_input/fake_input";
import LinkAsButton from "@/src/ui/components/LinkAsButton/link_as_button";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ProfileController from "@/src/ui/pages/profile/controllers/profile_controller";
import { useMutationProfileProvider } from "@/src/ui/pages/profile/provider/mutation_profile.provider";
import Styled from "./detail_profile_page.styled";
import type { Id } from "@/src/common/utils/types";

export default function DetailProfilePage() {
  const { t } = useTranslation("profile");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const { profileId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useShowToast();
  const getProfileById = useMutationProfileProvider((state) => state.getById);
  const profile = useMutationProfileProvider((state) => state.item);

  const onCloseModal = useCallback(() => setShowModal(false), []);

  const getProfile = useCallback(async () => {
    if (profileId) {
      const id = Number(profileId);
      const response = await getProfileById(id);
      if (!response) {
        navigate(paths.profile.index);
      }
    }
  }, [getProfileById, profileId, navigate]);

  useEffectRunOnce(() => {
    getProfile();
  }, [getProfile]);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("sure.delete"),
        primaryModalButtonText: t("actions.remove"),
        onClickPrimaryButton: async () => {
          await ProfileController.delete(id);
          onCloseModal();
          navigate(paths.profile.index);
          showToast({ message: t("actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [navigate, onCloseModal, t, showToast]
  );

  const onClickActive = useCallback(
    (id: Id, currentActiveValue: boolean) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: currentActiveValue ? t("sure.disable") : t("sure.enable"),
        primaryModalButtonText: currentActiveValue ? t("actions.disable") : t("actions.enable"),
        onClickPrimaryButton: async () => {
          await ProfileController.toogleActive(id, currentActiveValue);
          onCloseModal();
          showToast({ message: t(currentActiveValue ? "actions.disabled" : "actions.enabled") });
          await getProfile();
        }
      };
      setModalData(newModalData);
    },
    [getProfile, onCloseModal, t, showToast]
  );

  const actions = useMemo(
    () =>
      profile
        ? [
            {
              Icon: profile.enabled ? Disable : Enable,
              text: profile.enabled ? t("actions.disable") : t("actions.enable"),
              onClick: () => onClickActive(Number(profileId), profile.enabled)
            },
            {
              Icon: Delete,
              text: t("actions.delete"),
              onClick: () => onClickDelete(Number(profileId))
            }
          ]
        : [],
    [profile, onClickActive, onClickDelete, profileId, t]
  );

  return (
    <>
      <DetailPageHeader
        Icon={Face}
        showBreadcrumbs
        resourcePath={paths.profile.index}
        resourceName={t("profiles")}
        headerText={profile ? profile.fullName() : ""}
        creationInformation={profile ? profile.creationData() : undefined}
        actions={actions}
        showModal={showModal}
        onCloseModal={onCloseModal}
        modalPrimaryButtonText={modalData?.primaryModalButtonText}
        modalDescription={modalData?.description}
        onPrimaryButtonClick={modalData?.onClickPrimaryButton}
      />
      <Styled.Data>
        <FakeInput label={t("profileType")} value="Admin" />
        <Styled.ProfileData>
          <h2>{t("profileData")}</h2>
          <div>
            <FakeInput label={t("columns.name")} value={profile?.name} />
            <FakeInput label={t("columns.surnames")} value={profile?.surnames} />
            <FakeInput label={t("columns.mail")} value={profile?.email} />
          </div>
        </Styled.ProfileData>
      </Styled.Data>
      <LinkAsButton to={paths.profile.index + paths.profile.edit + profileId}>{t("actions.edit")}</LinkAsButton>
    </>
  );
}
