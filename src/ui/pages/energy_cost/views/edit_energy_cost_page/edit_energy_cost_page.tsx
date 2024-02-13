import { Form, FormikProvider } from "formik";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import { Payments } from "@/src/ui/assets/icons";
import { useTranslation } from "react-i18next";
import Styled from "./edit_energy_cost_page.styled";
import { Button } from "@mui/material";
import { useCallback, useEffect } from "react";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import { useNavigate, useParams } from "react-router-dom";
import useCreateEditEnergyCostForm from "../../controllers/create_edit_energy_cost_controller";
import type { CreateEnergyCostModel } from "@/src/core/energy_cost/domain/models/create_energy_cost_model";
import { CreateEditEnergyCostFormGrid } from "../../components/energy_cost_form/create_edit_energy_cost_form/create_edit_energy_cost_form";
import paths from "@/src/ui/router/paths";
import { useMutationEnergyCostProvider } from "../../provider/mutatiton_energy_cost.provider";

export default function EditEnergyCostPage() {
  const { t } = useTranslation(["energy_cost", "common"]);
  const { energyCostId } = useParams();
  const navigate = useNavigate();
  const { item: energyCost, getById: getEnergyCostById, edit: editEnergyCost } = useMutationEnergyCostProvider((state) => state);
  const onSubmitForm = async (input: CreateEnergyCostModel) => {
    await editEnergyCost(input, Number(energyCostId));
    navigate(paths.energyCost.index);
  };

  const { formSchema, isFormEmpty } = useCreateEditEnergyCostForm({
    onSubmitForm,
    initialValues: energyCost ? { concept: energyCost.concept, amount: energyCost.amount, id: energyCost.id } : undefined,
    id: Number(energyCostId)
  });
  const { showModal, onCloseModal, onCancel, cancelAction } = useCancelButton({ condition: isFormEmpty });

  const getEnergyCost = useCallback(async () => {
    if (energyCostId) {
      const id = Number(energyCostId);
      const response = await getEnergyCostById(id);
      if (!response) {
        navigate(paths.energyCost.index);
      }
    }
  }, [getEnergyCostById, energyCostId, navigate]);

  useEffect(() => {
    getEnergyCost();
  }, [getEnergyCost]);

  return (
    <>
      <DetailPageHeader
        Icon={Payments}
        headerText={energyCost ? energyCost.concept : ""}
        actions={cancelAction}
        showModal={showModal}
        modalPrimaryButtonText={t("common:keepEditing")}
        modalDescription={t("common:cancelDescription")}
        onSecondaryButtonClick={onCancel}
        onPrimaryButtonClick={onCloseModal}
      />
      <Styled.Header>
        <h2>{t("energy_cost:actions.edit")}</h2>
        <p>{t("common:editDescription")}</p>
      </Styled.Header>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <Styled.EnergyCostForm>
            <CreateEditEnergyCostFormGrid isProtected={energyCost?.isProtected} />
          </Styled.EnergyCostForm>
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
