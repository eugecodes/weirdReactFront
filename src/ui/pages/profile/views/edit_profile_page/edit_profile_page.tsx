import type { CreateProfileModel } from "@/src/core/profile/domain/models/create_profile_model";
import { Form, FormikProvider } from "formik";
import useCreateEditProfileForm from "../../controllers/create_edit_profile_controller";
import { AdminProfileGrid } from "../../components/form_profiles/admin_profile_form/admin_profile_form";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import { Face } from "@/src/ui/assets/icons";
import { useTranslation } from "react-i18next";
import Styled from "./edit_profile_page.styled";
import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import { useNavigate, useParams } from "react-router-dom";
import { Admin, selectorRoles } from "@/src/common/utils/roles";
import Selector from "@/src/ui/components/selector/selector";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import LinkAsButton from "@/src/ui/components/LinkAsButton/link_as_button";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useMutationProfileProvider } from "@/src/ui/pages/profile/provider/mutation_profile.provider";
import { useUserProvider } from "@/src/ui/provider/user.slice";

export default function EditProfilePage() {
  const { t } = useTranslation(["profile", "common", "reset_password"]);
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [profileType, setProfileType] = useState<string>(Admin);
  const { getById: getProfileById, item: profile, edit: editProfile } = useMutationProfileProvider((state) => state);
  const { showToast } = useShowToast();
  const user = useUserProvider((state) => state.user);

  const onSubmitForm = async (input: CreateProfileModel) => {
    await editProfile(input, Number(profileId));
    showToast({ message: t("profile:actions.edited") });
    navigate(paths.profile.index);
  };
  const { formSchema, isFormEmpty } = useCreateEditProfileForm({
    onSubmitForm,
    initialValues: profile ? { email: profile.email, name: profile.name, surname: profile.surnames, id: profile.id } : undefined,
    id: Number(profileId)
  });
  const { showModal, onCloseModal, onCancel, cancelAction } = useCancelButton({ condition: isFormEmpty });

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

  const onChangeProfile = (value: string) => {
    setProfileType(value);
  };

  return (
    <>
      <DetailPageHeader
        Icon={Face}
        headerText={profile ? profile.fullName() : ""}
        actions={cancelAction}
        showModal={showModal}
        modalPrimaryButtonText={t("common:keepEditing")}
        modalDescription={t("common:cancelDescription")}
        onSecondaryButtonClick={onCancel}
        onPrimaryButtonClick={onCloseModal}
      />
      <Styled.Header>
        <h2>{t("profile:actions.editProfile")}</h2>
        <p>{t("common:editDescription")}</p>
      </Styled.Header>
      <Styled.ProfileType>
        <Selector name="type" options={selectorRoles} value={profileType} onChange={(value) => onChangeProfile(value as string)} disabled />
      </Styled.ProfileType>
      <FormikProvider value={formSchema}>
        <Form>
          <AdminProfileGrid />
          <Styled.Button>
            <Button variant="contained" disabled={isFormEmpty} type="submit">
              {t("common:actions.save")}
            </Button>
          </Styled.Button>
        </Form>
      </FormikProvider>
      {Number(profileId) !== user?.id ? (
        <Styled.Password>
          <h2>{t("reset_password:form.fields.password.placeholder")}</h2>
          <LinkAsButton to={paths.profile.index + paths.profile.changePassword + profileId}>{t("reset_password:changePasswordSubmit")}</LinkAsButton>
        </Styled.Password>
      ) : null}
    </>
  );
}
