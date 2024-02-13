import type { CreateSupplyPointModel } from "@/src/core/supply_point/domain/models/create_supply_point_model";
import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import useFormController from "@/src/ui/hooks/useFormController";
import type { Id, Option } from "@/src/common/utils/types";
import { isEnumType, removeNullishValuesFromAnObject } from "@/src/common/utils";
import type { ObjectShape } from "yup/lib/object";
import { yupRequiredBoolean, yupRequiredField, yupString } from "@/src/ui/utils/yup";
import i18n from "@/src/ui/i18n";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { CounterTypes } from "@/src/core/app/enums/counter_types";
import type { OwnerTypes } from "@/src/core/app/enums/owner_types";
import { useSearchParams } from "react-router-dom";

export interface FormCreateSupplyPointValues {
  id?: Id;
  energyType?: EnergyTypes;
  alias?: string;
  cups: string;
  supplyAddress: string;
  supplyPostalCode: string;
  supplyCity: string;
  supplyProvince: string;
  bankAccountHolder?: string;
  bankAccountNumber?: string;
  fiscalAddress?: string;
  isRenewable?: boolean;
  maxAvailablePower?: number;
  voltage?: number;
  counterType?: CounterTypes;
  counterProperty?: OwnerTypes;
  counterPrice?: number;
  client?: Option;
  clientId?: Id;
}

const formValues: FormCreateSupplyPointValues = {
  id: undefined,
  energyType: undefined,
  alias: "",
  cups: "",
  supplyAddress: "",
  supplyPostalCode: "",
  supplyCity: "",
  supplyProvince: "",
  bankAccountHolder: "",
  bankAccountNumber: "",
  fiscalAddress: "",
  isRenewable: false,
  maxAvailablePower: undefined,
  voltage: undefined,
  counterType: undefined,
  counterProperty: undefined,
  counterPrice: undefined,
  client: undefined,
  clientId: undefined
};

const alias = yupString();
const supplyAddressRequired = yupRequiredField();
const supplyPostalCodeRequired = yupRequiredField();
const supplyCityRequired = yupRequiredField();
const supplyProvinceRequired = yupRequiredField();
const cupsRequired = yupRequiredField();
const bankAccountHolderRequired = yupRequiredField();
const bankAccountNumberRequired = yupRequiredField();
const fiscalAddressRequired = yupRequiredField();
const isRenewableRequired = yupRequiredBoolean();

interface Props {
  onSubmitForm: (input: CreateSupplyPointModel) => Promise<void>;
  initialValues?: FormCreateSupplyPointValues;
  id?: Id;
  enableReinitialize?: boolean;
}

export default function useCreateEditSupplyPointForm({ onSubmitForm, initialValues = formValues, id, enableReinitialize = false }: Props) {
  const [firstSubmit] = useState(false);
  const [searchParams] = useSearchParams();
  const clientId = useMemo(() => Number(searchParams.get("clientId")), [searchParams]);

  const validationSchema = useMemo(() => {
    const requiredValues: ObjectShape = {
      alias: alias,
      energyType: yup
        .string()
        .test("rate.isValidEnergyType", i18n.t("form.errors.energyType", { ns: "supply_point" }), (value) => isEnumType(value, EnergyTypes)),
      cups: cupsRequired,
      supplyAddress: supplyAddressRequired,
      supplyPostalCode: supplyPostalCodeRequired,
      supplyCity: supplyCityRequired,
      supplyProvince: supplyProvinceRequired,
      bankAccountHolder: bankAccountHolderRequired,
      bankAccountNumber: bankAccountNumberRequired,
      fiscalAddress: fiscalAddressRequired,
      isRenewable: isRenewableRequired
    };

    return yup.object().shape(requiredValues);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    enableReinitialize,
    onSubmit: async (values: FormCreateSupplyPointValues, { setSubmitting }: FormikHelpers<FormCreateSupplyPointValues>) => {
      if (values.client?.id) {
        values.clientId = values.client?.id;
      }
      if (!values.clientId) {
        values.clientId = clientId;
      }
      setSubmitting(false);
      await onSubmitForm(removeNullishValuesFromAnObject(values) as CreateSupplyPointModel);
    }
  });

  const { isFormEmpty } = useFormController({ formik, id, initialValues });

  return { formSchema: formik, isFormEmpty };
}
