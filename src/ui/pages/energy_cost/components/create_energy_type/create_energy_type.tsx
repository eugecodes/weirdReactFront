import SureModal from "@/src/ui/components/sure_modal/sure_modal";
import { Button } from "@mui/material";
import { Form } from "formik";
import { FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./create_energy_type.styled";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import useCreateEditEnergyCostForm from "../../controllers/create_edit_energy_cost_controller";
import type { CreateEnergyCostModel } from "@/src/core/energy_cost/domain/models/create_energy_cost_model";
import { CreateEditEnergyCostFormFlex } from "../energy_cost_form/create_edit_energy_cost_form/create_edit_energy_cost_form";

interface Props {
  onSubmitForm: (input: CreateEnergyCostModel) => Promise<void>;
}

export default function CreateEnergyCost({ onSubmitForm }: Props) {
  const { t } = useTranslation(["energy_cost", "common"]);
  const { formSchema, isFormEmpty } = useCreateEditEnergyCostForm({ onSubmitForm, initialValues: undefined });
  const { showModal, onCancel, onClickCancel, onCloseModal } = useCancelButton({ condition: isFormEmpty });

  return (
    <Styled.FormWrapper>
      <h1>{t("energy_cost:formTitle")}</h1>
      <p>{t("energy_cost:formSubtitle")}</p>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <CreateEditEnergyCostFormFlex />
          <Styled.ButtonsWrapper>
            <Button type="submit" variant="contained" disabled={isFormEmpty}>
              {t("common:actions.save")}
            </Button>
            <Button variant="text" onClick={onClickCancel}>
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
