import SureModal from "@/src/ui/components/sure_modal/sure_modal";
import { Button } from "@mui/material";
import { Form } from "formik";
import { FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./create_edit_rate_type_form.styled";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import Selector from "@/src/ui/components/selector/selector";
import useCreateEditRateTypeForm from "../../controllers/create_edit_rate_type_controller";
import type { CreateRateTypeModel } from "@/src/core/rate_type/domain/models/create_rate_type_model";
import { LightRateTypeFlex } from "../rate_types_forms/ligth_rate_type_form/light_rate_type_form";
import { InputFormik } from "@/src/ui/components/input/input";
import { energyTypeOptions } from "@/src/ui/utils/selector_options";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";

interface Props {
  onSubmitForm: (input: CreateRateTypeModel) => Promise<void>;
}

export default function CreateEditRateTypeForm({ onSubmitForm }: Props) {
  const { t } = useTranslation(["rate_type", "common"]);
  const { formSchema, isFormEmpty, onChangeEnergyType, energyType } = useCreateEditRateTypeForm({ onSubmitForm, initialValues: undefined });
  const { showModal, onCancel, onClickCancel, onCloseModal } = useCancelButton({ condition: isFormEmpty });

  return (
    <Styled.FormWrapper>
      <h1>{t("rate_type:formTitle")}</h1>
      <p>{t("rate_type:formSubtitle")}</p>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <InputFormik label={t("rate_type:columns.name")} id="name" name="name" required />
          <Selector
            label={t("rate_type:columns.energyType")}
            name="type"
            options={energyTypeOptions}
            value={energyType}
            onChange={(value) => onChangeEnergyType(value as EnergyTypes)}
            required
          />
          {energyType === EnergyTypes.LIGHT ? <LightRateTypeFlex /> : null}
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
