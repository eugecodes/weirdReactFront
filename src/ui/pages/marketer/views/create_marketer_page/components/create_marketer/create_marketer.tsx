import SureModal from "@/src/ui/components/sure_modal/sure_modal";
import { Button } from "@mui/material";
import { Form } from "formik";
import { FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./create_marketer.styled";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import useCreateMarketerForm from "@/src/ui/pages/marketer/controllers/create_edit_marketer_controller";
import { CreateMarketerFormFlex } from "@/src/ui/pages/marketer/views/create_marketer_page/components/create_marketer_form/create_marketer_form";
import type { EditMarketerModel } from "@/src/core/marketer/domain/models/edit_marketer_model";

interface Props {
  onSubmitForm: (input: EditMarketerModel) => Promise<void>;
}

export default function CreateMarketer({ onSubmitForm }: Props) {
  const { t } = useTranslation(["marketer", "common"]);
  const { formSchema, isFormEmpty } = useCreateMarketerForm({ onSubmitForm, initialValues: undefined });
  const { showModal, onCancel, onClickCancel, onCloseModal } = useCancelButton({ condition: isFormEmpty });

  return (
    <Styled.FormWrapper>
      <h1>{t("marketer:formTitle")}</h1>
      <p>{t("marketer:formSubtitle")}</p>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <CreateMarketerFormFlex />
          <Styled.ButtonsWrapper>
            <Button type="submit" variant="contained" disabled={isFormEmpty}>
              {t("common:actions.save")}
            </Button>
            <Button variant="text" color="secondary" onClick={onClickCancel}>
              {t("common:actions.cancel")}
            </Button>
          </Styled.ButtonsWrapper>
        </Form>
      </FormikProvider>
      {showModal && (
        <SureModal
          primaryButtonText={t("common:actions.keepEditing")}
          description={t("common:sure.cancelCreate")}
          secondaryButtonText={t("common:actions.cancelChanges")}
          onSecondaryButtonClick={onCancel}
          onPrimaryButtonClick={onCloseModal}
        />
      )}
    </Styled.FormWrapper>
  );
}
