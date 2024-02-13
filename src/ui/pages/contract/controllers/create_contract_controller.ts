import type { CreateContractModel } from "@/src/core/contract/domain/models/create_contract_model";
import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import useFormController from "@/src/ui/hooks/useFormController";
import type { Id } from "@/src/common/utils/types";
import { removeNullishValuesFromAnObject } from "@/src/common/utils";
import type { ObjectShape } from "yup/lib/object";
import {
  yupPositiveNumber,
  yupPositiveNumberWithMaxDecimals,
  yupRequiredEmailField,
  yupRequiredField,
  yupRequiredPhoneField
  // yupString
} from "@/src/ui/utils/yup";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";

export interface FormCreateContractValues {
  id?: Id;
  energyType?: EnergyTypes;
  supplyPointId?: Id;
  clientId?: Id;
  rateId?: Id;
  rateTypeId?: Id;
  power1?: number;
  power2?: number;
  power3?: number;
  power4?: number;
  power5?: number;
  power6?: number;
  preferredStartDate: string;
  period?: number;
  signatureFirstName: string;
  signatureLastName: string;
  signatureDni: string;
  signatureEmail: string;
  signaturePhone: string;
}

const formValues: FormCreateContractValues = {
  id: undefined,
  energyType: undefined,
  supplyPointId: undefined,
  clientId: undefined,
  rateId: undefined,
  rateTypeId: undefined,
  power1: undefined,
  power2: undefined,
  power3: undefined,
  power4: undefined,
  power5: undefined,
  power6: undefined,
  // startDate: "",
  // endDate: "",
  preferredStartDate: "",
  period: undefined,
  signatureFirstName: "",
  signatureLastName: "",
  signatureDni: "",
  signatureEmail: "",
  signaturePhone: ""
};

const required = yupRequiredField();
const power = yupPositiveNumberWithMaxDecimals(4);
// const date = yupString();
const dateRequired = yupRequiredField();
const period = yupPositiveNumber();
const signatureFirstNameRequired = yupRequiredField();
const signatureLastNameRequired = yupRequiredField();
const signatureDNIRequired = yupRequiredField();
const signatureEmailRequired = yupRequiredEmailField();
const signaturePhoneRequired = yupRequiredPhoneField();

interface Props {
  onSubmitForm: (input: CreateContractModel) => Promise<void>;
  initialValues?: FormCreateContractValues;
  id?: Id;
  enableReinitialize?: boolean;
}

export default function useCreateContractForm({ onSubmitForm, initialValues = formValues, id, enableReinitialize = false }: Props) {
  const [firstSubmit] = useState(false);

  const validationSchema = useMemo(() => {
    const requiredValues: ObjectShape = {
      supplyPointId: required,
      rateId: required,
      power1: power,
      power2: power,
      power3: power,
      power4: power,
      power5: power,
      power6: power,
      // startDate: date,
      // endDate: date,
      preferredStartDate: dateRequired,
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
    onSubmit: async (values: FormCreateContractValues, { setSubmitting }: FormikHelpers<FormCreateContractValues>) => {
      setSubmitting(false);
      console.log(values);
      onSubmitForm(removeNullishValuesFromAnObject(values) as CreateContractModel);
    }
  });

  const { isFormEmpty } = useFormController({ formik, id, initialValues });

  return { formSchema: formik, isFormEmpty };
}
