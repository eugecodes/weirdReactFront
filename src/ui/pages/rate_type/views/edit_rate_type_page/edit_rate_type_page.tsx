import { Form, FormikProvider } from "formik";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import { DeviceHub } from "@/src/ui/assets/icons";
import { useTranslation } from "react-i18next";
import Styled from "./edit_rate_type_page.styled";
import { Button } from "@mui/material";
import { useCallback, useEffect } from "react";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import { useNavigate, useParams } from "react-router-dom";
import Selector from "@/src/ui/components/selector/selector";
import useCreateEditRateTypeForm from "@/src/ui/pages/rate_type/controllers/create_edit_rate_type_controller";
import type { CreateRateTypeModel } from "@/src/core/rate_type/domain/models/create_rate_type_model";
import { InputFormik } from "@/src/ui/components/input/input";
import { LightRateTypeGrid } from "@/src/ui/pages/rate_type/components/rate_types_forms/ligth_rate_type_form/light_rate_type_form";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useMutationRateTypeProvider } from "@/src/ui/pages/rate_type/provider/mutation_rate_type.provider";
import { energyTypeOptions } from "@/src/ui/utils/selector_options";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";

export default function EditRateTypePage() {
  const { t } = useTranslation(["rate_type", "common"]);
  const { rateTypeId } = useParams();
  const navigate = useNavigate();
  const { getById: getRateTypeById, item: rateType, edit: editRateType } = useMutationRateTypeProvider((state) => state);
  const { showToast } = useShowToast();

  const onSubmitForm = async (input: CreateRateTypeModel) => {
    await editRateType(input, Number(rateTypeId));
    navigate(paths.rateType.index);
    showToast({ message: t("rate_type:actions.edited") });
  };

  const { formSchema, isFormEmpty } = useCreateEditRateTypeForm({
    onSubmitForm,
    initialValues: rateType ? rateType : undefined,
    id: Number(rateTypeId)
  });
  const { showModal, onCloseModal, onCancel, cancelAction } = useCancelButton({ condition: isFormEmpty });

  const getRateType = useCallback(async () => {
    if (rateTypeId) {
      const id = Number(rateTypeId);
      const response = await getRateTypeById(id);
      if (!response) {
        navigate(paths.rateType.index);
      }
    }
  }, [getRateTypeById, rateTypeId, navigate]);

  useEffect(() => {
    getRateType();
  }, [getRateType]);

  return (
    <>
      <DetailPageHeader
        Icon={DeviceHub}
        headerText={rateType ? rateType.name : ""}
        actions={cancelAction}
        showModal={showModal}
        modalPrimaryButtonText={t("common:keepEditing")}
        modalDescription={t("common:cancelDescription")}
        onSecondaryButtonClick={onCancel}
        onPrimaryButtonClick={onCloseModal}
      />
      <Styled.Header>
        <h2>{t("rate_type:actions.edit")}</h2>
        <p>{t("common:editDescription")}</p>
      </Styled.Header>
      <FormikProvider value={formSchema}>
        <Form>
          <Styled.RateTypeForm>
            <InputFormik label={t("rate_type:columns.name")} id="name" name="name" disabled />
            <Selector label={t("rate_type:columns.energyType")} name="type" options={energyTypeOptions} value={rateType?.energyType} disabled />
            {rateType?.energyType === EnergyTypes.LIGHT ? <LightRateTypeGrid /> : null}
          </Styled.RateTypeForm>
          <Styled.Button>
            <Button type="submit" variant="contained" disabled={isFormEmpty || !formSchema.dirty}>
              {t("common:actions.save")}
            </Button>
          </Styled.Button>
        </Form>
      </FormikProvider>
    </>
  );
}
