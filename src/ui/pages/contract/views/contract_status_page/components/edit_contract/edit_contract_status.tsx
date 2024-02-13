import { Form, FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Styled from "./edit_contract_status.styled";
import { Button } from "@mui/material";
import { useMemo } from "react";
import type { Optional } from "@/src/common/utils/types";
import type { ContractModel } from "@/src/core/contract/domain/models/contract_model";
import { ContractStatusOptions } from "@/src/ui/utils/selector_options";
import Selector from "@/src/ui/components/selector/selector";
import useEditStatusContractForm from "@/src/ui/pages/contract/controllers/edit_status_contract_controller";
import type { PatchContractModel } from "@/src/core/contract/domain/models/patch_contract_model";
import { InputFormik } from "@/src/ui/components/input/input";

interface Props {
  onSubmitForm: (input: PatchContractModel) => Promise<void>;
  contract: Optional<ContractModel>;
}

export default function EditContractStatus({ onSubmitForm, contract }: Props) {
  const { t } = useTranslation(["contract", "common"]);

  const initialValues = useMemo(() => {
    return contract
      ? {
          ...contract
        }
      : undefined;
  }, [contract]);

  const { formSchema, isFormEmpty } = useEditStatusContractForm({
    onSubmitForm,
    initialValues
  });

  return (
    <>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <Styled.ContractData>
            <Selector
              name="status"
              options={ContractStatusOptions}
              value={formSchema.values.status}
              onChange={(newValue) => {
                formSchema.setFieldValue("status", newValue);
              }}
            />
          </Styled.ContractData>
          <Styled.ContractData>
            <InputFormik name="statusMessage" label={t("contract:columns.statusMessage")} id="statusMessage" />
          </Styled.ContractData>

          <Styled.Button>
            <Button type="submit" variant="contained" disabled={isFormEmpty}>
              {t("common:actions.save")}
            </Button>
          </Styled.Button>
        </Form>
      </FormikProvider>
    </>
  );
}
