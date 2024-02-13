import type { Optional } from "@/src/common/utils/types";
import type { DetailClientModel } from "@/src/core/client/domain/models/detail_client_model";
import FakeInput from "@/src/ui/components/fake_input/fake_input";
import LinkAsButton from "@/src/ui/components/LinkAsButton/link_as_button";
import paths from "@/src/ui/router/paths";
import { useTranslation } from "react-i18next";
import Styled from "./detail_client.styled";

interface Props {
  client: Optional<DetailClientModel>;
}

export default function DetailClient({ client }: Props) {
  const { t } = useTranslation(["client", "common", "address"]);

  return (
    <>
      <div>
        <Styled.ClientData>
          <h2>{t("client:data")}</h2>
          <div>
            <FakeInput label={t("client:columns.alias")} value={client?.alias} />
            <FakeInput label={t("client:columns.fiscalName")} value={client?.fiscalName} />
            <FakeInput label={t("client:columns.cif")} value={client?.cif} />
            <FakeInput label={t("client:columns.clientType")} value={client?.clientType} />
          </div>
        </Styled.ClientData>
      </div>
      <div>
        <Styled.ClientData>
          <h2>{t("client:form.titles.notification")}</h2>
          <div>
            <FakeInput label={t("client:columns.invoiceNotificationType")} value={client?.invoiceNotificationType} />
            <FakeInput label={t("client:columns.invoiceEmail")} value={client?.invoiceEmail} />
            <FakeInput label={t("client:columns.invoicePostal")} value={client?.invoicePostal} />
          </div>
        </Styled.ClientData>
      </div>
      <div>
        <Styled.ClientData>
          <h2>{t("client:form.titles.invoicing")}</h2>
          <div>
            <FakeInput label={t("client:columns.bankAccountHolder")} value={client?.bankAccountHolder} />
            <FakeInput label={t("client:columns.bankAccountNumber")} value={client?.bankAccountNumber} />
            <FakeInput label={t("client:columns.fiscalAddress")} value={client?.fiscalAddress} />
          </div>
        </Styled.ClientData>
      </div>
      <div>
        <Styled.ClientData>
          <h2>{t("client:form.titles.others")}</h2>
          <div>
            <FakeInput label={t("client:columns.isRenewable")} value={client?.isRenewable === true ? t("common:yes") : t("common:no")} />
          </div>
        </Styled.ClientData>
      </div>
      <LinkAsButton to={paths.client.index + paths.client.edit + client?.id}>{t("common:actions.edit")}</LinkAsButton>
    </>
  );
}
