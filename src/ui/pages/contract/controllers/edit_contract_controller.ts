import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import useFormController from "@/src/ui/hooks/useFormController";
import type { Id, Option } from "@/src/common/utils/types";
import { removeNullishValuesFromAnObject } from "@/src/common/utils";
import type { ObjectShape } from "yup/lib/object";
import {
  yupEmailField,
  yupPositiveNumber,
  yupPositiveNumberWithMaxDecimals,
  yupRequiredField,
  yupRequiredPhoneField,
  yupString
} from "@/src/ui/utils/yup";
import type { EditContractModel } from "@/src/core/contract/domain/models/edit_contract_model";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";

export interface FormEditContractValues {
  id?: Id;
  energyType?: EnergyTypes;
  rateId?: Id;
  rateType?: Option;
  marketer?: Option;
  rate?: Option;
  power1?: number;
  power2?: number;
  power3?: number;
  power4?: number;
  power5?: number;
  power6?: number;
  startDate?: string;
  endDate?: string;
  preferredStartDate: string;
  expectedEndDate: string;
  period?: number;
  signatureFirstName: string;
  signatureLastName: string;
  signatureDni: string;
  signatureEmail: string;
  signaturePhone: string;
}

const formValues: FormEditContractValues = {
  id: undefined,
  energyType: undefined,
  rateId: undefined,
  rateType: undefined,
  marketer: undefined,
  rate: undefined,
  power1: undefined,
  power2: undefined,
  power3: undefined,
  power4: undefined,
  power5: undefined,
  power6: undefined,
  startDate: "",
  endDate: "",
  preferredStartDate: "",
  expectedEndDate: "",
  period: undefined,
  signatureFirstName: "",
  signatureLastName: "",
  signatureDni: "",
  signatureEmail: "",
  signaturePhone: ""
};

const required = yupRequiredField();
const power = yupPositiveNumberWithMaxDecimals(4);
const date = yupString();
const dateRequired = yupRequiredField();
const period = yupPositiveNumber();
const signatureFirstNameRequired = yupRequiredField();
const signatureLastNameRequired = yupRequiredField();
const signatureDNIRequired = yupRequiredField();
const signatureEmailRequired = yupEmailField();
const signaturePhoneRequired = yupRequiredPhoneField();

interface Props {
  onSubmitForm: (input: EditContractModel) => Promise<void>;
  initialValues?: FormEditContractValues;
  id?: Id;
  enableReinitialize?: boolean;
}

export default function useEditContractForm({ onSubmitForm, initialValues = formValues, id, enableReinitialize = false }: Props) {
  const [firstSubmit] = useState(false);

  const validationSchema = useMemo(() => {
    const requiredValues: ObjectShape = {
      rateId: required,
      power1: power,
      power2: power,
      power3: power,
      power4: power,
      power5: power,
      power6: power,
      startDate: date,
      endDate: date,
      preferredStartDate: dateRequired,
      expectedEndDate: dateRequired,
      period: period,
      signatureFirstName: signatureFirstNameRequired,
      signatureLastName: signatureLastNameRequired,
      signatureDni: signatureDNIRequired,
      signatureEmail: signatureEmailRequired,
      signaturePhone: signaturePhoneRequired
    };

    return yup.object().shape(requiredValues);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    enableReinitialize,
    onSubmit: async (values: FormEditContractValues, { setSubmitting }: FormikHelpers<FormEditContractValues>) => {
      setSubmitting(false);
      await onSubmitForm(removeNullishValuesFromAnObject(values) as EditContractModel);
    }
  });

  const { isFormEmpty } = useFormController({ formik, id, initialValues });

  return { formSchema: formik, isFormEmpty };
}
