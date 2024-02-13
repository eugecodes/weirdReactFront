import type { CreateProfileModel } from "@/src/core/profile/domain/models/create_profile_model";
import CreateEditProfileForm from "../../components/create_edit_profile_form/create_edit_profile_form";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import useShowToast from "@/src/ui/hooks/useShowToast";
import { useTranslation } from "react-i18next";
import paths from "@/src/ui/router/paths";
import ProfileController from "../../controllers/profile_controller";

export default function CreateProfilePage() {
  const { t } = useTranslation("profile");
  const navigate = useNavigate();
  const { showToast } = useShowToast();

  const onCreateProfile = useCallback(
    async (input: CreateProfileModel) => {
      await ProfileController.create(input);
      showToast({ message: t("actions.added") });
      navigate(paths.profile.index);
    },
    [navigate, t, showToast]
  );

  return <CreateEditProfileForm onSubmitForm={onCreateProfile}></CreateEditProfileForm>;
}
