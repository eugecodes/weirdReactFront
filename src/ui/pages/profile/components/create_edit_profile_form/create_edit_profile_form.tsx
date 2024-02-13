import type { CreateProfileModel } from "@/src/core/profile/domain/models/create_profile_model";
import SureModal from "@/src/ui/components/sure_modal/sure_modal";
import { Button } from "@mui/material";
import { Form } from "formik";
import { FormikProvider } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AdminProfileFlex } from "@/src/ui/pages/profile/components/form_profiles/admin_profile_form/admin_profile_form";
import Styled from "./create_edit_profile_form.styled";
import useCreateEditProfileForm from "../../controllers/create_edit_profile_controller";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import Selector from "@/src/ui/components/selector/selector";
import { selectorRoles } from "@/src/common/utils/roles";

interface Props {
  isUserLogedIn?: boolean;
  onSubmitForm: (input: CreateProfileModel) => Promise<void>;
}

export default function CreateEditProfileForm({ onSubmitForm }: Props) {
  const [profileType, setProfileType] = useState<string>();
  const { t } = useTranslation("profile");
  const { formSchema, isFormEmpty } = useCreateEditProfileForm({ onSubmitForm, initialValues: undefined });
  const { showModal, onCancel, onClickCancel, onCloseModal } = useCancelButton({ condition: isFormEmpty });

  const onChangeProfile = (value: string) => {
    setProfileType(value);
  };

  return (
    <Styled.FormWrapper>
      <h1>{t("formTitle")}</h1>
      <p>{t("formSubtitle")}</p>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <Selector
            label={t("columns.type")}
            name="type"
            options={selectorRoles}
            value={profileType}
            onChange={(value) => onChangeProfile(value as string)}
            required
          />
          {profileType ? <AdminProfileFlex /> : null}
          <Styled.ButtonsWrapper>
            <Button type="submit" variant="contained" disabled={isFormEmpty}>
              {t("actions.save")}
            </Button>
            <Button variant="text" onClick={onClickCancel}>
              {t("actions.cancel")}
            </Button>
          </Styled.ButtonsWrapper>
        </Form>
      </FormikProvider>
      {showModal && (
        <SureModal
          primaryButtonText={t("actions.keepEditing")}
          description={t("sure.cancelCreate")}
          secondaryButtonText={t("actions.cancelChanges")}
          onSecondaryButtonClick={onCancel}
          onPrimaryButtonClick={onCloseModal}
        />
      )}
    </Styled.FormWrapper>
  );
}
