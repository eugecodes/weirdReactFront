import type { Optional } from "@/src/common/utils/types";
import type { DetailContactModel } from "@/src/core/contact/domain/models/detail_contact_model";
import FakeInput from "@/src/ui/components/fake_input/fake_input";
import LinkAsButton from "@/src/ui/components/LinkAsButton/link_as_button";
import paths from "@/src/ui/router/paths";
import { useTranslation } from "react-i18next";
import Styled from "./detail_contact.styled";
import { getBooleanTranslation } from "@/src/ui/i18n/utils";

interface Props {
  contact: Optional<DetailContactModel>;
}

export default function DetailContact({ contact }: Props) {
  const { t } = useTranslation(["contact", "common", "address"]);

  return (
    <>
      <div>
        <Styled.ContactData>
          <h2>{t("contact:data")}</h2>
          <div>
            <FakeInput label={t("contact:columns.name")} value={contact?.name} />
            <FakeInput label={t("contact:columns.email")} value={contact?.email} />
            <FakeInput label={t("contact:columns.phone")} value={contact?.phone} />
            <FakeInput label={t("contact:columns.isMainContact")} value={getBooleanTranslation(contact?.isMainContact as boolean)} />
          </div>
        </Styled.ContactData>
      </div>
      <LinkAsButton to={paths.contact.index + paths.contact.edit + contact?.id}>{t("common:actions.edit")}</LinkAsButton>
    </>
  );
}
