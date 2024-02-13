import type { CreateClientModel } from "@/src/core/client/domain/models/create_client_model";
import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import useFormController from "@/src/ui/hooks/useFormController";
import type { Id } from "@/src/common/utils/types";
import { ClientType } from "@/src/core/app/enums/client_type";
import { isEnumType, removeNullishValuesFromAnObject } from "@/src/common/utils";
import type { ObjectShape } from "yup/lib/object";
import { yupEmailField, yupRequiredBoolean, yupRequiredEmailField, yupRequiredField, yupRequiredIbanField, yupString } from "@/src/ui/utils/yup";
import i18n from "@/src/ui/i18n";
import { InvoiceNotificationType } from "@/src/core/app/enums/invoice_notification_type";

export interface FormCreateContactValues {
  name: string;
  email: string;
  phone: string;
}

export interface FormCreateClientValues {
  id?: Id;
  alias: string;
  clientType?: ClientType;
  fiscalName?: string;
  cif?: string;
  invoiceEmail?: string;
  invoicePostal?: string;
  bankAccountHolder?: string;
  bankAccountNumber?: string;
  fiscalAddress?: string;
  isRenewable?: boolean;
  invoiceNotificationType?: InvoiceNotificationType;
  mainContact?: FormCreateContactValues;
}

const formValues: FormCreateClientValues = {
  id: undefined,
  alias: "",
  clientType: undefined,
  fiscalName: "",
  cif: "",
  invoiceEmail: "",
  invoicePostal: "",
  bankAccountHolder: "",
  bankAccountNumber: "",
  fiscalAddress: "",
  isRenewable: false,
  invoiceNotificationType: undefined,
  mainContact: {
    name: "",
    email: "",
    phone: ""
  }
};

const alias = yupString();
const fiscalNameRequired = yupRequiredField();
const cifRequired = yupRequiredField();
const invoiceEmail = yupEmailField();
const invoicePostal = yupString();
const bankAccountHolderRequired = yupRequiredField();
const bankAccountNumberRequired = yupRequiredIbanField();
const fiscalAddressRequired = yupRequiredField();
const isRenewableRequired = yupRequiredBoolean();
const mainContactNameRequired = yupRequiredField();
const mainContactEmailRequired = yupRequiredEmailField();
const mainContactPhoneRequired = yupRequiredField();

interface Props {
  onSubmitForm: (input: CreateClientModel) => Promise<void>;
  initialValues?: FormCreateClientValues;
  id?: Id;
  enableReinitialize?: boolean;
}

export default function useCreateClientForm({ onSubmitForm, initialValues = formValues, id, enableReinitialize = false }: Props) {
  const [firstSubmit] = useState(false);

  const validationSchema = useMemo(() => {
    const requiredValues: ObjectShape = {
      alias: alias,
      clientType: yup
        .string()
        .test("rate.isValidClientType", i18n.t("form.errors.clientType", { ns: "client" }), (value) => isEnumType(value, ClientType)),
      fiscalName: fiscalNameRequired,
      cif: cifRequired,
      bankAccountHolder: bankAccountHolderRequired,
      bankAccountNumber: bankAccountNumberRequired,
      fiscalAddress: fiscalAddressRequired,
      isRenewable: isRenewableRequired,
      invoiceNotificationType: yup
        .string()
        .test("client.isValidInvoiceNotificationType", i18n.t("form.errors.invoiceNotificationType", { ns: "client" }), (value) =>
          isEnumType(value, InvoiceNotificationType)
        ),
      invoiceEmail,
      invoicePostal,
      mainContact: yup.object().shape({
        name: mainContactNameRequired,
        email: mainContactEmailRequired,
        phone: mainContactPhoneRequired
      })
    };

    return yup.object().shape(requiredValues);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    enableReinitialize,
    onSubmit: async (values: FormCreateClientValues, { setSubmitting }: FormikHelpers<FormCreateClientValues>) => {
      setSubmitting(false);
      onSubmitForm(removeNullishValuesFromAnObject(values) as CreateClientModel);
    }
  });

  const { isFormEmpty } = useFormController({ formik, id, initialValues });

  return { formSchema: formik, isFormEmpty };
}
